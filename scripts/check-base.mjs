import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep the check about development materials, not a business source layout.
const ignored = new Set([
  '.git', 'node_modules', '.venv', '__pycache__', '.local', '.runtime', '.dsh',
  'dist', 'lib', 'build', 'coverage',
]);

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink() || ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(target));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(target);
  }
  return files.sort();
}

import { markdownLinks } from '../.agents/skills/dsh-official-reference/scripts/markdown-links.mjs';
export { markdownLinks };

export async function checkBase(root) {
  const issues = [];
  const files = await markdownFiles(root);
  const known = new Set(files.map(file => path.relative(root, file)));
  for (const required of ['AGENTS.md', 'README.md']) {
    if (!known.has(required)) issues.push({ file: required, message: '缺少 base 开发入口' });
  }
  let localLinks = 0;
  let skills = 0;
  for (const file of files) {
    const relative = path.relative(root, file);
    const portable = relative.split(path.sep).join('/');
    const content = await readFile(file, 'utf8');
    if (/^\.agents\/skills\/[^/]+\/SKILL\.md$/.test(portable)) {
      skills++;
      const header = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      if (!header || !/^name:\s*\S.+$/m.test(header) || !/^description:\s*\S.+$/m.test(header)) {
        issues.push({ file: relative, message: 'Skill 缺少 frontmatter 或 name/description 发现字段；完整 YAML 另行验证' });
      }
    }
    for (const { target, line } of markdownLinks(content)) {
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) continue;
        let destination;
        try {
          destination = decodeURIComponent(target.split(/[?#]/)[0]);
        } catch {
          issues.push({ file: relative, line, message: `链接编码无效：${target}` });
          continue;
        }
        if (!destination) continue;
        localLinks++;
        // Absolute machine paths would stop working after cloning the base.
        if (path.isAbsolute(destination)) {
          issues.push({ file: relative, line, message: `使用相对文件链接：${target}` });
          continue;
        }
        try {
          await stat(path.resolve(path.dirname(file), destination));
        } catch (error) {
          issues.push({ file: relative, line, message: `文件链接不可访问：${target} (${error.code ?? 'error'})` });
        }
    }
  }
  if (!skills) issues.push({ file: '.agents/skills', message: '没有可发现的项目 Skill' });
  return { ok: issues.length === 0, markdownFiles: files.length, localLinks, skills, issues };
}

const invoked = process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url));
if (invoked) {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--json')) {
    console.error('用法：node scripts/check-base.mjs [--json]');
    process.exitCode = 2;
  } else {
    try {
      const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
      const result = await checkBase(root);
      if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
      else {
        console.log(`${result.ok ? '通过' : '失败'}：${result.markdownFiles} 个 Markdown，${result.localLinks} 个本地链接，${result.skills} 个 Skill。`);
        for (const issue of result.issues) console.error(`${issue.file}${issue.line ? `:${issue.line}` : ''} ${issue.message}`);
        console.log('仅检查开发资料；未验证 DSH 运行时、界面或 Agent 行为。');
      }
      if (!result.ok) process.exitCode = 1;
    } catch (error) {
      const result = { ok: false, issues: [{ message: error.message }] };
      if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
      else console.error(`检查失败：${error.message}`);
      process.exitCode = 1;
    }
  }
}
