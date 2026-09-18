import { createHash, randomUUID } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, mkdtemp, open, readFile, readdir, realpath, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdownLinks } from './markdown-links.mjs';

const exec = promisify(execFile);
const scriptPath = fileURLToPath(import.meta.url);
export const skillName = 'dsh-official-reference';
const generatorId = 'dsh-official-docs-v1';
const digest = value => createHash('sha256').update(value).digest('hex');
const encodePath = value => value.split('/').map(encodeURIComponent).join('/');
const sourceUrl = (repo, commit, file) => `https://github.com/${repo}/blob/${commit}/${encodePath(file)}`;

function checkPath(value) {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.includes('\\') || value.split('/').some(part => part === '..' || part === '.')) {
    throw new Error(`无效的来源路径：${value}`);
  }
}

export function validateConfig(config) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(config.repository ?? '')) throw new Error('来源 repository 必须是 owner/repo');
  if (!['zh', 'en', 'all'].includes(config.preferredLanguage)) throw new Error('preferredLanguage 必须是 zh、en 或 all');
  if (config.coverage && config.coverage !== 'all-repository-markdown') throw new Error('未知覆盖模式');
  if (config.coverage && config.preferredLanguage !== 'all') throw new Error('全量模式必须保留所有语言');
  for (const file of config.required ?? []) checkPath(file);
  checkPath(config.licensePath);
  if (!Array.isArray(config.groups) || !config.groups.length) throw new Error('至少配置一个主题');
  const ids = new Set();
  for (const group of config.groups) {
    if (!/^[a-z][a-z0-9-]*$/.test(group.id ?? '') || ids.has(group.id)) throw new Error(`主题标识重复或无效：${group.id}`);
    ids.add(group.id);
    if (!group.title || !group.when) throw new Error(`主题缺少 title/when：${group.id}`);
    for (const key of ['files', 'prefixes', 'required', 'excludePrefixes']) {
      if (group[key] !== undefined && !Array.isArray(group[key])) throw new Error(`${group.id}.${key} 必须是数组`);
      for (const item of group[key] ?? []) checkPath(item);
    }
    if (!(group.catchAll || group.files?.length || group.prefixes?.length)) throw new Error(`主题没有来源：${group.id}`);
  }
  return config;
}

export function githubSource(repository, transport = 'https', request = fetch) {
  async function api(endpoint) {
    if (transport === 'gh') {
      try {
        const { stdout } = await exec('gh', ['api', endpoint], { timeout: 45000, maxBuffer: 24 * 1024 * 1024, windowsHide: true });
        return JSON.parse(stdout);
      } catch (error) {
        throw new Error(`GitHub CLI 请求失败：${endpoint}；${error.code === 'ENOENT' ? '未安装 gh，请改用 --transport https' : '检查网络、gh 登录或 API 限额'}`);
      }
    }
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'dsh-plugin-base-doc-sync' };
    const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await request(`https://api.github.com/${endpoint}`, { headers, signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`GitHub API ${response.status}：${endpoint}；可检查网络/限额或使用 --transport gh`);
    return response.json();
  }
  return {
    async resolve(ref) {
      const requestedRef = ref || (await api(`repos/${repository}`)).default_branch;
      const record = await api(`repos/${repository}/commits/${encodeURIComponent(requestedRef)}`);
      if (!/^[a-f0-9]{40}$/.test(record.sha ?? '')) throw new Error('GitHub 未返回有效提交号');
      return { commit: record.sha, requestedRef };
    },
    async tree(commit) {
      const result = await api(`repos/${repository}/git/trees/${commit}?recursive=1`);
      if (result.truncated) throw new Error('官方文件树被截断，停止同步，旧内容保留');
      return result.tree;
    },
    async read(commit, file) {
      if (transport === 'gh') {
        const result = await api(`repos/${repository}/contents/${encodePath(file)}?ref=${commit}`);
        if (result.encoding !== 'base64' || typeof result.content !== 'string') throw new Error(`无法取得原文：${file}`);
        return Buffer.from(result.content, 'base64');
      }
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await request(`https://raw.githubusercontent.com/${repository}/${commit}/${encodePath(file)}`, { signal: AbortSignal.timeout(45000) });
          if (response.ok || ![408, 429, 500, 502, 503, 504].includes(response.status) || attempt === 2) break;
        } catch (error) { if (attempt === 2) throw error; }
        await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      }
      if (!response.ok) throw new Error(`下载失败 ${response.status}：${file}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length > 8 * 1024 * 1024) throw new Error(`单份文档超过 8 MiB：${file}`);
      return buffer;
    },
  };
}

export function selectDocuments(config, tree) {
  const entries = new Map(tree.filter(item => item.type === 'blob').map(item => [item.path, item]));
  const choose = file => {
    if (config.preferredLanguage === 'zh' && !file.endsWith('.zh.md') && entries.has(file.replace(/\.md$/, '.zh.md'))) return file.replace(/\.md$/, '.zh.md');
    if (config.preferredLanguage === 'en' && file.endsWith('.zh.md') && entries.has(file.replace(/\.zh\.md$/, '.md'))) return file.replace(/\.zh\.md$/, '.md');
    return file;
  };
  for (const file of config.required ?? []) if (!entries.has(file)) throw new Error(`必需来源缺失：${file}`);
  const selected = new Map();
  for (const group of config.groups) {
    for (const required of group.required ?? []) {
      if (!entries.has(choose(required))) throw new Error(`必需来源缺失：${required}；检查官方路径变化并更新来源配置`);
    }
    let count = 0;
    const candidates = [...new Set([...(group.files ?? []), ...entries.keys()].filter(file => group.catchAll || (group.files ?? []).includes(file) || (group.prefixes ?? []).some(prefix => file.startsWith(prefix))))].sort();
    for (const candidate of candidates) {
      if (!/\.(?:md|mdx)$/i.test(candidate) || (group.excludePrefixes ?? []).some(prefix => candidate.startsWith(prefix))) continue;
      const file = choose(candidate);
      const entry = entries.get(file);
      if (!entry) throw new Error(`配置来源不存在：${file}`);
      if (entry.mode === '120000' && !config.coverage) throw new Error(`不导入符号链接文档：${file}`);
      count++;
      if (!selected.has(file)) {
        const stem = path.posix.basename(file, '.md').toLowerCase().replace(/[^a-z0-9.-]/g, '-');
        selected.set(file, { path: file, group: group.id, output: `references/${group.id}/${stem}-${digest(file).slice(0, 10)}.md` });
      }
    }
    if (!count) throw new Error(`主题未匹配文档：${group.id}`);
  }
  const aliases = new Map([...selected].map(([file, item]) => [file, item.output]));
  for (const [file, item] of selected) {
    if (file.endsWith('.zh.md') && !aliases.has(file.replace(/\.zh\.md$/, '.md'))) aliases.set(file.replace(/\.zh\.md$/, '.md'), item.output);
  }
  if (config.coverage) {
    const missing = [...entries.keys()].filter(file => /\.(?:md|mdx)$/i.test(file) && !selected.has(file));
    if (missing.length) throw new Error(`全量覆盖失败，遗漏 ${missing.length} 份文档：${missing.join(', ')}`);
  }
  return { documents: [...selected.values()].sort((a, b) => a.path.localeCompare(b.path, 'en')), aliases };
}

export function rewriteLinks(markdown, { document, aliases, repository, commit }) {
  function destination(raw, image) {
    const wrapped = raw.startsWith('<') && raw.endsWith('>');
    const value = wrapped ? raw.slice(1, -1) : raw;
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return raw;
    const split = value.search(/[?#]/);
    let file;
    try { file = decodeURIComponent(split < 0 ? value : value.slice(0, split)); } catch { return raw; }
    const suffix = split < 0 ? '' : value.slice(split);
    const resolved = path.posix.normalize(file.startsWith('/') ? file.slice(1) : path.posix.join(path.posix.dirname(document.path), file));
    let result;
    const translated = resolved.endsWith('.md') && !resolved.endsWith('.zh.md') && aliases.has(resolved.replace(/\.md$/, '.zh.md')) && aliases.get(resolved) === aliases.get(resolved.replace(/\.md$/, '.zh.md'));
    // A translated heading may have a different anchor; preserve the source page.
    if (aliases.has(resolved) && !(translated && suffix.includes('#'))) {
      result = encodePath(path.posix.relative(path.posix.dirname(document.output), aliases.get(resolved))) + suffix;
    } else if (image) {
      result = `https://raw.githubusercontent.com/${repository}/${commit}/${encodePath(resolved)}` + suffix;
    } else result = sourceUrl(repository, commit, resolved) + suffix;
    return wrapped ? `<${result}>` : result;
  }
  let fence = null;
  return markdown.split('\n').map(line => {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      return line;
    }
    if (fence) return line;
    // Inline code and fenced examples must remain source-faithful.
    const code = [];
    const protectedLine = line.replace(/(`+)[\s\S]*?\1/g, value => { code.push(value); return `\u0000CODE${code.length - 1}\u0000`; });
    return protectedLine
        .replace(/(!?\[[^\]\n]*\]\()(<[^>\n]+>|[^\s)]+)([^)\n]*\))/g, (_, start, target, end) => start + destination(target, start.startsWith('!')) + end)
        .replace(/^(\s*\[[^\]\n]+\]:\s*)(<[^>\n]+>|\S+)/, (_, start, target) => start + destination(target, false))
        .replace(/(\b(?:href|src)=)(["'])([^"']+)\2/g, (_, start, quote, target) => start + quote + destination(target, start.startsWith('src')) + quote)
        .replace(/\u0000CODE(\d+)\u0000/g, (_, index) => code[Number(index)]);
  }).join('\n');
}

export function validateGeneratedLinks(generated) {
  for (const [file, content] of generated) {
    if (!file.endsWith('.md')) continue;
    for (const { target, line } of markdownLinks(String(content))) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) continue;
      const destination = decodeURIComponent(target.split(/[?#]/)[0]);
      if (!destination) continue;
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), destination));
      if (!generated.has(resolved)) throw new Error(`生成链接无目标：${file}:${line} → ${target}`);
    }
  }
}

async function filesBelow(root, prefix = '') {
  const result = new Map();
  for (const entry of await readdir(path.join(root, prefix), { withFileTypes: true })) {
    const file = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`生成目录出现符号链接：${file}`);
    if (entry.isDirectory()) for (const pair of await filesBelow(root, file)) result.set(...pair);
    else if (entry.isFile()) result.set(file, await readFile(path.join(root, file)));
  }
  return result;
}

const editableInputs = new Set(['scripts/sync-official-skill.mjs', 'scripts/markdown-links.mjs', 'scripts/verify-local.mjs', 'scripts/dsh-docs.sources.json']);

async function previousGeneration(output) {
  let files;
  try { files = await filesBelow(output); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  let manifest;
  try { manifest = JSON.parse(files.get('upstream.json').toString()); } catch { throw new Error('目标目录不是有效的生成目录，未覆盖'); }
  if (manifest.generator !== generatorId || !manifest.outputHashes) throw new Error('生成目录所有权记录不匹配，未覆盖');
  const expected = new Set([...Object.keys(manifest.outputHashes), 'upstream.json']);
  const changed = [...files.keys()].filter(file => !expected.has(file) && !editableInputs.has(file));
  for (const [file, hash] of Object.entries(manifest.outputHashes)) {
    if (!editableInputs.has(file) && (!files.has(file) || digest(files.get(file)) !== hash)) changed.push(file);
  }
  if (changed.length) throw new Error(`生成文件有本地修改，未覆盖：${changed.join(', ')}。请先把自定义内容移到手写规范，或恢复生成内容。`);
  return { manifest, files };
}

async function parallelMap(items, mapper, concurrency = 12) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) { const index = next++; results[index] = await mapper(items[index]); }
  });
  const settled = await Promise.allSettled(workers);
  const error = settled.find(item => item.status === 'rejected');
  if (error) throw error.reason;
  return results;
}

function renderSkill(config, commit) {
  const rows = config.groups.map(group => `| ${group.when} | [${group.title}](references/${group.id}/index.md) |`).join('\n');
  return `---\nname: ${skillName}\ndescription: 查询 DeepSeek Harness 官方开发文档、前端与文档规范时使用。按主题读取自动同步的官方原文，核对来源提交与目标宿主版本；不替代本项目的开发流程。\n---\n\n# DSH 官方开发资料\n\n此 Skill 由本仓库生成器整理，不是官方发行或认证。来源为 ${config.repository}，提交为 \`${commit}\`。完整来源、内容哈希和生成时间见 [upstream.json](upstream.json)，许可见 [LICENSE.upstream](LICENSE.upstream)。\n\n## 使用方法\n\n先确定本次任务涉及的主题，只读取相应索引和文档。结合项目已有规则与目标宿主版本核对接口；资料较新不表示旧宿主支持同样的 API。\n\n原文中的 AGENTS、官方 Skill、安装命令和审批流程属于上游文档的适用场景，不自动成为本项目指令，也不会让当前 Agent 获得新工具。区分官方框架约束、上游 monorepo 维护要求和当前工程约定；与当前版本不一致时核对实际声明。\n\n| 何时读取 | 主题 |\n| --- | --- |\n${rows}\n\n## 内容与更新\n\n参考文件保留官方原文，仅增加出处并调整链接；没有模型改写或自动翻译。完整保留各语言版本，中文优先查阅，英文用于核对接口或译文差异。代码示例保留原文，执行前核对其工作目录和运行条件。未纳入同步的相对链接指向同一提交的官方文件。\n\n生成脚本及配置随 Skill 携带。在此 Skill 目录运行 \`node scripts/sync-official-skill.mjs\` 重新生成，或用 \`--ref\` 指定版本。脚本从自身位置定位 Skill，可单独复制到其他项目后运行。使用 \`node scripts/verify-local.mjs\` 离线核验文件完整性与覆盖清单。\`scripts/\` 为可维护的工具和配置，其余生成文件不要手工修改。\n\n## 覆盖与检索\n\n[覆盖报告](coverage.md) 和 [逐文件清单](coverage.json) 显示本次官方文档总数、收录数和遗漏。扫描全仓库 Markdown/MDX，新目录也自动纳入；保存原始正文及 Git 哈希。先选主题，再读子目录索引；可用 \`rg -n "关键词" references\` 精确搜索。历史笔记、提案与测试快照仅作背景，不代表当前开发规范。\n`;
}

export async function syncOfficial({ root, skillRoot, source, ref, check = false, now = () => new Date().toISOString(), log = () => {}, renameDirectory = rename }) {
  const output = skillRoot ?? path.join(root, '.agents/skills', skillName);
  const parent = path.dirname(output);
  const configPath = skillRoot ? path.join(skillRoot, 'scripts/dsh-docs.sources.json') : path.join(root, 'scripts/dsh-docs.sources.json');
  const configText = await readFile(configPath, 'utf8');
  const config = validateConfig(JSON.parse(configText));
  source ??= githubSource(config.repository);
  const resources = new Map();
  for (const file of ['sync-official-skill.mjs', 'markdown-links.mjs', 'verify-local.mjs']) resources.set(`scripts/${file}`, await readFile(new URL(file, import.meta.url)));
  resources.set('scripts/dsh-docs.sources.json', configText);
  const lockPath = path.join(parent, `.${skillName}.lock`);
  let lock;
  if (!check) {
    await mkdir(parent, { recursive: true });
    try { lock = await open(lockPath, 'wx'); } catch (error) { if (error.code === 'EEXIST') throw new Error(`已有同步锁：${lockPath}。确认没有同步进程后再清理残留锁。`); throw error; }
  }
  try {
    if (lock) await lock.writeFile(`${process.pid}\n`);
    const previous = await previousGeneration(output);
    const resolved = await source.resolve(ref);
    if (!/^[a-f0-9]{40}$/.test(resolved.commit)) throw new Error('无效来源提交号');
    const generatorHash = digest(Buffer.concat([...resources.values()].map(value => Buffer.from(value))));
    const basis = digest(JSON.stringify({ config, commit: resolved.commit, generatorHash }));
    if (previous?.manifest.basis === basis) return { status: 'unchanged', commit: resolved.commit, documents: previous.manifest.documents.length, changes: { added: [], changed: [], removed: [] } };
    log(`官方提交：${resolved.commit}`);
    const tree = await source.tree(resolved.commit);
    if (!tree.some(entry => entry.path === config.licensePath && entry.type === 'blob' && entry.mode !== '120000')) throw new Error('未找到官方许可证原文，停止生成');
    const { documents, aliases } = selectDocuments(config, tree);
    const entries = new Map(tree.filter(item => item.type === 'blob').map(item => [item.path, item]));
    const sourceFiles = new Map();
    const cache = new Map();
    async function rawFile(file) {
      if (!cache.has(file)) cache.set(file, (async () => {
        const entry = entries.get(file);
        if (!entry) throw new Error(`来源文件不存在：${file}`);
        const data = Buffer.from(await source.read(resolved.commit, file));
        const sha = createHash('sha1').update(Buffer.from(`blob ${data.length}\0`)).update(data).digest('hex');
        if (entry.sha && sha !== entry.sha) throw new Error(`原文 Git 哈希不匹配：${file}`);
        sourceFiles.set(file, { path: file, mode: entry.mode, gitBlobSha: entry.sha ?? sha, sha256: digest(data) });
        return data;
      })());
      return cache.get(file);
    }
    async function resolveDocument(file, chain = []) {
      if (chain.includes(file) || chain.length > 16) throw new Error(`符号链接循环：${file}`);
      const raw = await rawFile(file);
      if (entries.get(file).mode !== '120000') return { raw, resolvedPath: file };
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), raw.toString('utf8')));
      checkPath(target);
      return resolveDocument(target, [...chain, file]);
    }
    let completed = 0;
    const licenses = [...new Set([config.licensePath, ...tree.filter(item => item.type === 'blob' && /^(?:licen[cs]e|copying|notice)(?:[.-].*)?$/i.test(path.posix.basename(item.path))).map(item => item.path)])];
    const contents = await parallelMap([...new Set([...documents.map(doc => doc.path), ...licenses])], async file => {
      const data = await resolveDocument(file);
      if (++completed % 100 === 0) log(`已下载 ${completed}/${documents.length + 1}`);
      return [file, data];
    });
    const resolvedContents = new Map(contents);
    const raw = new Map(contents.map(([file, data]) => [file, data.raw]));
    const generated = new Map(resources);
    for (const file of licenses) generated.set(`licenses/${file}.txt`, raw.get(file));
    for (const doc of documents) {
      const body = raw.get(doc.path).toString('utf8');
      generated.set(`originals/${doc.path}.txt`, raw.get(doc.path));
      const text = rewriteLinks(body, { document: { ...doc, path: resolvedContents.get(doc.path).resolvedPath }, aliases, repository: config.repository, commit: resolved.commit });
      generated.set(doc.output, `> 自动同步的官方参考原文。来源：[${doc.path}](${sourceUrl(config.repository, resolved.commit, doc.path)})，提交：\`${resolved.commit}\`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。\n\n${text}${text.endsWith('\n') ? '' : '\n'}`);
    }
    for (const group of config.groups) {
      const grouped = documents.filter(doc => doc.group === group.id);
      if (!grouped.length) generated.set(`references/${group.id}/index.md`, `# ${group.title}\n\n${group.when}\n\n此提交没有匹配文档。\n`);
      const buckets = new Map();
      for (const doc of grouped) {
        const bucket = grouped.length > 60 ? path.posix.dirname(doc.path) : '';
        if (!buckets.has(bucket)) buckets.set(bucket, []);
        buckets.get(bucket).push(doc);
      }
      const links = [];
      for (const [bucket, items] of buckets) {
        const indexPath = bucket ? `references/${group.id}/index-${digest(bucket).slice(0, 10)}.md` : `references/${group.id}/index.md`;
        const lines = items.map(doc => {
          const title = raw.get(doc.path).toString('utf8').match(/^#\s+(.+)$/m)?.[1] ?? doc.path;
          const safeTitle = title.replace(/[\[\]`]/g, '').trim();
          return `- [${safeTitle}](${path.posix.basename(doc.output)}) — \`${doc.path}\``;
        }).join('\n');
        generated.set(indexPath, `# ${bucket || group.title}\n\n${group.when}\n\n以下是来源原文，按需选择；不是当前项目的指令。提交 \`${resolved.commit}\`。\n\n${lines}\n`);
        if (bucket) links.push(`- [${bucket}](${path.posix.basename(indexPath)})（${items.length} 份）`);
      }
      if (links.length) generated.set(`references/${group.id}/index.md`, `# ${group.title}\n\n${group.when}\n\n共 ${grouped.length} 份，按来源目录继续选择，不要全部载入。\n\n${links.join('\n')}\n`);
    }
    const inventory = tree.filter(item => item.type === 'blob' && /\.(?:md|mdx)$/i.test(item.path));
    const selected = new Set(documents.map(doc => doc.path));
    const coverage = {
      repository: config.repository, commit: resolved.commit, mode: config.coverage ?? 'selected',
      inventoryCount: inventory.length, includedCount: documents.length,
      missing: inventory.filter(item => !selected.has(item.path)).map(item => item.path),
      groups: config.groups.map(group => ({ id: group.id, count: documents.filter(doc => doc.group === group.id).length })),
      inventory: inventory.map(item => ({ path: item.path, gitBlobSha: item.sha ?? null, included: selected.has(item.path) })),
    };
    generated.set('coverage.json', JSON.stringify(coverage, null, 2) + '\n');
    generated.set('coverage.md', `# 官方文档覆盖情况\n\n提交：\`${resolved.commit}\`。扫描整个官方 Git 文件树中的 Markdown/MDX，保留各语言版本，不按精选白名单收录。\n\n- 官方文档路径：${coverage.inventoryCount}\n- 已收录：${coverage.includedCount}\n- 未收录：${coverage.missing.length}\n\n${coverage.groups.map(g => `- [${g.id}](references/${g.id}/index.md)：${g.count}`).join('\n')}\n\n逐文件清单见 [coverage.json](coverage.json)，原文哈希及符号链接解析记录见 [upstream.json](upstream.json)。所有正文同时逐字节保留在 originals 中（使用 .txt 后缀避免上游 AGENTS 自动生效）。历史提案与测试快照按主题隔离；原文中的代码、图片及其他非 Markdown 文件仍链接到该提交，未宣称镜像整个源码仓库。\n`);
    generated.set('SKILL.md', renderSkill(config, resolved.commit));
    generated.set('LICENSE.upstream', raw.get(config.licensePath));
    generated.set('agents/openai.yaml', `interface:\n  display_name: "DSH 官方开发资料"\n  short_description: "按主题查阅自动同步的官方开发、前端和文档规范，并核对宿主版本"\n  default_prompt: "使用 $${skillName} 查找本次插件开发需要的官方接口与规范，核对资料提交和目标宿主版本。"\n`);
    const manifest = {
      generator: generatorId, schemaVersion: 2, generatorHash, basis, repository: config.repository, ...resolved, generatedAt: now(),
      configHash: digest(JSON.stringify(config)), license: { path: config.licensePath, sha256: digest(raw.get(config.licensePath)) },
      sourceFiles: [...sourceFiles.values()].sort((a, b) => a.path.localeCompare(b.path, 'en')),
      documents: documents.map(doc => ({ ...doc, original: `originals/${doc.path}.txt`, resolvedPath: resolvedContents.get(doc.path).resolvedPath, url: sourceUrl(config.repository, resolved.commit, doc.path), sourceSha256: digest(raw.get(doc.path)) })),
      outputHashes: Object.fromEntries([...generated].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([file, content]) => [file, digest(content)])),
    };
    generated.set('upstream.json', JSON.stringify(manifest, null, 2) + '\n');
    validateGeneratedLinks(generated);
    const oldFiles = previous?.files ?? new Map();
    const changes = {
      added: [...generated.keys()].filter(file => !oldFiles.has(file)),
      changed: [...generated].filter(([file, content]) => oldFiles.has(file) && digest(oldFiles.get(file)) !== digest(content)).map(([file]) => file),
      removed: [...oldFiles.keys()].filter(file => !generated.has(file)),
    };
    if (check) return { status: 'update-available', commit: resolved.commit, documents: documents.length, changes };
    const stage = await mkdtemp(path.join(parent, `.${skillName}.stage-`));
    const backup = path.join(parent, `.${skillName}.backup-${randomUUID()}`);
    let movedOld = false;
    try {
      for (const [file, content] of generated) {
        await mkdir(path.dirname(path.join(stage, file)), { recursive: true });
        await writeFile(path.join(stage, file), content);
      }
      // A user edit during download must be noticed before replacing the output.
      if (await readFile(configPath, 'utf8') !== configText) throw new Error('下载期间来源配置改变，停止替换');
      for (const file of ['sync-official-skill.mjs', 'markdown-links.mjs', 'verify-local.mjs']) if (digest(await readFile(new URL(file, import.meta.url))) !== digest(resources.get(`scripts/${file}`))) throw new Error('下载期间生成脚本改变，停止替换');
      const current = await previousGeneration(output);
      if (current?.files.get('upstream.json')?.toString() !== previous?.files.get('upstream.json')?.toString()) throw new Error('下载期间生成目录版本改变，停止替换');
      if (previous) { await renameDirectory(output, backup); movedOld = true; }
      try { await renameDirectory(stage, output); } catch (error) {
        if (movedOld) { await renameDirectory(backup, output); movedOld = false; }
        throw error;
      }
      if (movedOld) {
        try { await rm(backup, { recursive: true, force: true }); } catch { log(`新版已生成，旧备份未能清理：${backup}`); }
        movedOld = false;
      }
    } finally {
      await rm(stage, { recursive: true, force: true });
      // On an unrecoverable rollback error, retain the backup for manual recovery.
    }
    return { status: 'updated', commit: resolved.commit, documents: documents.length, changes };
  } finally {
    if (lock) { await lock.close(); await rm(lockPath, { force: true }); }
  }
}

export async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log('用法：node scripts/sync-official-skill.mjs [--ref 分支或提交] [--transport https|gh] [--check] [--json]\n默认同步官方默认分支最新提交。--check 只读，退出码 0=无变化，2=有更新，1=错误。');
    return;
  }
  let ref, transport = 'https', check = false, json = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--ref' || arg === '--transport') {
      const value = args[++index];
      if (!value || value.startsWith('--')) throw new Error(`${arg} 缺少值`);
      if (arg === '--ref') ref = value; else transport = value;
    } else if (arg === '--check') check = true;
    else if (arg === '--json') json = true;
    else throw new Error(`未知参数：${arg}`);
  }
  if (!['https', 'gh'].includes(transport)) throw new Error('--transport 必须是 https 或 gh');
  const skillRoot = path.resolve(path.dirname(scriptPath), '..');
  const config = JSON.parse(await readFile(path.join(skillRoot, 'scripts/dsh-docs.sources.json'), 'utf8'));
  const result = await syncOfficial({ skillRoot, source: githubSource(config.repository, transport), ref, check, log: value => { if (!json) console.error(value); } });
  if (json) console.log(JSON.stringify(result, null, 2));
  else console.log(`${result.status}：${result.documents} 份官方文档，提交 ${result.commit}\n新增 ${result.changes.added.length}，修改 ${result.changes.changed.length}，移除 ${result.changes.removed.length} 个生成文件。`);
  if (result.status === 'update-available') process.exitCode = 2;
}

if (process.argv[1] && await realpath(process.argv[1]) === await realpath(scriptPath)) {
  try { await main(); } catch (error) {
    if (process.argv.includes('--json')) console.log(JSON.stringify({ status: 'error', error: error.message }));
    else console.error(`同步失败：${error.message}`);
    process.exitCode = 1;
  }
}
