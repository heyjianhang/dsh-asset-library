import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { githubSource, rewriteLinks, selectDocuments, skillName, syncOfficial, validateConfig } from './sync-official-skill.mjs';
import { checkBase } from './check-base.mjs';
import { verifyLocal } from '../.agents/skills/dsh-official-reference/scripts/verify-local.mjs';

const commitA = 'a'.repeat(40);
const commitB = 'b'.repeat(40);
const config = {
  repository: 'example/docs', preferredLanguage: 'zh', licensePath: 'LICENSE',
  groups: [{ id: 'guide', title: 'Guide', when: 'Read on demand.', prefixes: ['docs/'], required: ['docs/start.md'] }],
};
const original = {
  'docs/start.md': '# English\n',
  'docs/start.zh.md': '# 中文入门\n\n[更多](extra.md#part) [源码](../src/main.ts) [`代码标签`](../src/code.ts)\n[ref]: extra.md\n<a href="extra.md">more</a>\n![figure](../images/demo.png)\n\n```md\n[示例](untouched.md)\n```\n`[inline](also-untouched.md)`\n',
  'docs/extra.md': '# Extra\n\n[返回](start.md)\n',
  'LICENSE': 'MIT License\nCopyright Example\n',
};

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'dsh-sync-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'scripts'));
  await writeFile(path.join(root, 'scripts/dsh-docs.sources.json'), JSON.stringify(config));
  await writeFile(path.join(root, 'AGENTS.md'), '# Local rules\n');
  await writeFile(path.join(root, 'README.md'), '# Project\n');
  const output = path.join(root, '.agents/skills', skillName);
  return { root, output };
}

function fakeSource(files = original, commit = commitA) {
  const reads = [];
  return {
    reads,
    async resolve(ref) { return { commit, requestedRef: ref || 'main' }; },
    async tree(actual) {
      assert.equal(actual, commit);
      return Object.keys(files).map(file => ({ path: file, type: 'blob', mode: '100644' }));
    },
    async read(actual, file) { assert.equal(actual, commit); reads.push(file); return Buffer.from(files[file]); },
  };
}

async function snapshot(root, prefix = '') {
  const result = {};
  for (const entry of await readdir(path.join(root, prefix), { withFileTypes: true })) {
    const file = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) Object.assign(result, await snapshot(root, file));
    else result[file] = createHash('sha256').update(await readFile(path.join(root, file))).digest('hex');
  }
  return result;
}

test('discovers new documents, prefers a single language, and rejects missing critical sources', () => {
  const tree = Object.keys(original).map(file => ({ path: file, type: 'blob', mode: '100644' }));
  assert.equal(selectDocuments(config, tree).documents.length, 2);
  const english = selectDocuments({ ...config, preferredLanguage: 'en' }, tree);
  assert.ok(english.documents.some(doc => doc.path === 'docs/start.md'));
  assert.ok(!english.documents.some(doc => doc.path.endsWith('.zh.md')));
  assert.throws(() => selectDocuments(config, []), /必需来源缺失/);
  assert.throws(() => validateConfig({ ...config, licensePath: '../outside' }), /无效/);
});

test('generates standalone reference links, intact code examples, provenance and license', async t => {
  const { root, output } = await fixture(t);
  const source = fakeSource();
  const result = await syncOfficial({ root, source, now: () => '2026-09-18T00:00:00.000Z' });
  assert.equal(result.status, 'updated');
  const manifest = JSON.parse(await readFile(path.join(output, 'upstream.json')));
  assert.equal(manifest.commit, commitA);
  assert.equal(manifest.documents.length, 2);
  assert.equal(manifest.generatedAt, '2026-09-18T00:00:00.000Z');
  const start = manifest.documents.find(doc => doc.path.endsWith('start.zh.md'));
  const extra = manifest.documents.find(doc => doc.path.endsWith('extra.md'));
  const rendered = await readFile(path.join(output, start.output), 'utf8');
  assert.ok(rendered.includes(`(${path.basename(extra.output)}#part)`));
  assert.ok(rendered.includes(`[ref]: ${path.basename(extra.output)}`));
  assert.ok(rendered.includes(`href="${path.basename(extra.output)}"`));
  assert.ok(rendered.includes(`/blob/${commitA}/src/main.ts`));
  assert.ok(rendered.includes('[`代码标签`](https://github.com/example/docs/blob/' + commitA + '/src/code.ts)'));
  assert.ok(rendered.includes(`/example/docs/${commitA}/images/demo.png`));
  assert.ok(rendered.includes('```md\n[示例](untouched.md)\n```'));
  assert.ok(rendered.includes('`[inline](also-untouched.md)`'));
  assert.equal(start.sourceSha256, createHash('sha256').update(original[start.path]).digest('hex'));
  assert.equal(await readFile(path.join(output, 'LICENSE.upstream'), 'utf8'), original.LICENSE);
  assert.equal((await checkBase(root)).ok, true);
  assert.equal(await readFile(path.join(root, 'AGENTS.md'), 'utf8'), '# Local rules\n');
});

test('same revision is a no-op and preserves generated time without redownloading', async t => {
  const { root } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  const before = await snapshot(root);
  const source = fakeSource();
  source.tree = () => { throw new Error('No refetch expected'); };
  const result = await syncOfficial({ root, source });
  assert.equal(result.status, 'unchanged');
  assert.deepEqual(await snapshot(root), before);
  assert.equal(source.reads.length, 0);
});

test('translated aliases do not redirect English heading anchors to unrelated Chinese anchors', () => {
  const aliases = new Map([['docs/other.md', 'references/guide/other-zh.md'], ['docs/other.zh.md', 'references/guide/other-zh.md']]);
  const rendered = rewriteLinks('[page](other.md) [heading](other.md#english-heading)', {
    aliases, document: { path: 'docs/start.md', output: 'references/guide/start.md' }, repository: 'example/docs', commit: commitA,
  });
  assert.ok(rendered.includes('[page](other-zh.md)'));
  assert.ok(rendered.includes(`/blob/${commitA}/docs/other.md#english-heading`));
});

test('concurrent writers cannot replace the same generation', async t => {
  const { root } = await fixture(t);
  let entered, release;
  const started = new Promise(resolve => { entered = resolve; });
  const gate = new Promise(resolve => { release = resolve; });
  const source = fakeSource();
  source.resolve = async () => { entered(); await gate; return { commit: commitA, requestedRef: 'main' }; };
  const first = syncOfficial({ root, source });
  await started;
  try { await assert.rejects(syncOfficial({ root, source: fakeSource() }), /已有同步锁/); }
  finally { release(); }
  assert.equal((await first).status, 'updated');
});

test('updates changed documents, removes stale generated files, preserves local workflow', async t => {
  const { root, output } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  const old = JSON.parse(await readFile(path.join(output, 'upstream.json')));
  const stale = old.documents.find(doc => doc.path === 'docs/extra.md').output;
  await mkdir(path.join(root, '.agents/skills/handwritten'));
  await writeFile(path.join(root, '.agents/skills/handwritten/SKILL.md'), 'Local workflow');
  const updated = { 'docs/start.md': '# Start changed\n', 'docs/new.md': '# New\n', LICENSE: original.LICENSE };
  const result = await syncOfficial({ root, source: fakeSource(updated, commitB) });
  assert.equal(result.status, 'updated');
  assert.ok(result.changes.removed.includes(stale));
  await assert.rejects(readFile(path.join(output, stale)), { code: 'ENOENT' });
  assert.equal(await readFile(path.join(root, '.agents/skills/handwritten/SKILL.md'), 'utf8'), 'Local workflow');
});

test('failed downloads leave the old generation byte-for-byte intact and release the lock', async t => {
  const { root } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  const before = await snapshot(root);
  const source = fakeSource(original, commitB);
  source.read = async () => { throw new Error('Network interrupted'); };
  await assert.rejects(syncOfficial({ root, source }), /Network interrupted/);
  assert.deepEqual(await snapshot(root), before);
});

test('invalid generated links abort before replacing the old generation', async t => {
  const { root } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  const before = await snapshot(root);
  const invalid = { ...original, 'docs/start.zh.md': '# Bad\n[invalid](bad%ZZ.md)\n' };
  await assert.rejects(syncOfficial({ root, source: fakeSource(invalid, commitB) }), /URI malformed/);
  assert.deepEqual(await snapshot(root), before);
});

test('local edits and unowned output directories are never silently replaced', async t => {
  const { root, output } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  await writeFile(path.join(output, 'SKILL.md'), 'User changed this');
  const before = await snapshot(root);
  await assert.rejects(syncOfficial({ root, source: fakeSource(original, commitB) }), /本地修改/);
  assert.deepEqual(await snapshot(root), before);
  await rm(output, { recursive: true });
  await mkdir(output);
  await writeFile(path.join(output, 'custom.md'), 'Keep me');
  await assert.rejects(syncOfficial({ root, source: fakeSource() }), /不是有效的生成目录/);
  assert.equal(await readFile(path.join(output, 'custom.md'), 'utf8'), 'Keep me');
});

test('--check has no writes, including when a generation does not exist yet', async t => {
  const { root } = await fixture(t);
  const before = await snapshot(root);
  const result = await syncOfficial({ root, source: fakeSource(), check: true });
  assert.equal(result.status, 'update-available');
  assert.deepEqual(await snapshot(root), before);
  await syncOfficial({ root, source: fakeSource() });
  const installed = await snapshot(root);
  assert.equal((await syncOfficial({ root, source: fakeSource(), check: true })).status, 'unchanged');
  assert.deepEqual(await snapshot(root), installed);
});

test('replacement failure rolls back to the previous generation', async t => {
  const { root } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  const before = await snapshot(root);
  let renames = 0;
  const renameDirectory = async (from, to) => {
    if (++renames === 2) throw new Error('Simulated destination failure');
    return rename(from, to);
  };
  await assert.rejects(syncOfficial({ root, source: fakeSource(original, commitB), renameDirectory }), /Simulated destination failure/);
  assert.equal(renames, 3);
  assert.deepEqual(await snapshot(root), before);
});

test('HTTPS transport resolves one commit before reading content', async () => {
  const calls = [];
  const request = async url => {
    calls.push(url);
    if (url.endsWith('/repos/example/docs')) return Response.json({ default_branch: 'new-default' });
    if (url.endsWith('/commits/new-default')) return Response.json({ sha: commitA });
    if (url.includes('/git/trees/')) return Response.json({ tree: [], truncated: true });
    return new Response('contents');
  };
  const source = githubSource('example/docs', 'https', request);
  const resolved = await source.resolve();
  assert.equal(resolved.requestedRef, 'new-default');
  assert.equal(resolved.commit, commitA);
  await assert.rejects(source.tree(resolved.commit), /截断/);
  assert.equal((await source.read(resolved.commit, 'docs/start.md')).toString(), 'contents');
  assert.ok(calls.at(-1).includes(`/${commitA}/docs/start.md`));
});

test('CLI help and invalid arguments do not need network access', () => {
  const script = fileURLToPath(new URL('./sync-official-skill.mjs', import.meta.url));
  const help = spawnSync(process.execPath, [script, '--help'], { encoding: 'utf8', timeout: 10000 });
  assert.equal(help.status, 0);
  const invalid = spawnSync(process.execPath, [script, '--transport', 'invalid', '--json'], { encoding: 'utf8', timeout: 10000 });
  assert.equal(invalid.status, 1);
  assert.equal(JSON.parse(invalid.stdout).status, 'error');
});

const fullConfig = { ...config, preferredLanguage: 'all', coverage: 'all-repository-markdown', groups: [...config.groups, { id: 'other', title: 'Other', when: 'Inspect new directories.', catchAll: true }] };

test('full coverage includes all languages and new directories, and fails on omission', () => {
  const files = { ...original, 'future/sdk/API.MD': '# API', 'examples/demo.mdx': '# Demo' };
  const tree = Object.keys(files).map(path => ({ path, type: 'blob', mode: '100644' }));
  const result = selectDocuments(fullConfig, tree);
  assert.equal(result.documents.length, 5);
  assert.ok(result.documents.some(doc => doc.path === 'docs/start.md'));
  assert.ok(result.documents.some(doc => doc.path === 'docs/start.zh.md'));
  assert.notEqual(result.aliases.get('docs/start.md'), result.aliases.get('docs/start.zh.md'));
  assert.throws(() => selectDocuments({ ...fullConfig, groups: config.groups }, tree), /遗漏/);
  assert.throws(() => validateConfig({ ...fullConfig, preferredLanguage: 'zh' }), /保留所有语言/);
});

test('full generation preserves exact original bytes, resolves repository symlinks and verifies Git hashes', async t => {
  const { root, output } = await fixture(t);
  await writeFile(path.join(root, 'scripts/dsh-docs.sources.json'), JSON.stringify(fullConfig));
  const files = { ...original, 'new/CLAUDE.md': '../docs/start.md', 'docs/raw.md': '# Exact\r\n\r\n  Preserve trailing spaces  \r\n' };
  const source = fakeSource(files);
  source.tree = async () => Object.entries(files).map(([path, content]) => ({ path, type: 'blob', mode: path === 'new/CLAUDE.md' ? '120000' : '100644', sha: createHash('sha1').update(`blob ${Buffer.byteLength(content)}\0`).update(content).digest('hex') }));
  await syncOfficial({ root, source });
  const coverage = JSON.parse(await readFile(path.join(output, 'coverage.json')));
  assert.equal(coverage.inventoryCount, 5);
  assert.deepEqual(coverage.missing, []);
  const manifest = JSON.parse(await readFile(path.join(output, 'upstream.json')));
  for (const doc of manifest.documents) assert.equal(await readFile(path.join(output, doc.original), 'utf8'), files[doc.resolvedPath]);
  assert.equal((await verifyLocal(output)).ok, true);
  const before = await snapshot(root);
  const broken = { ...source, resolve: async () => ({ commit: commitB, requestedRef: 'main' }), read: async () => Buffer.from('tampered') };
  await assert.rejects(syncOfficial({ root, source: broken }), /Git 哈希/);
  assert.deepEqual(await snapshot(root), before);
});

test('a copied standalone Skill can check and update from an unrelated cwd without the base', async t => {
  const { root, output } = await fixture(t);
  await writeFile(path.join(root, 'scripts/dsh-docs.sources.json'), JSON.stringify(fullConfig));
  await syncOfficial({ root, source: fakeSource() });
  const isolated = await mkdtemp(path.join(os.tmpdir(), 'dsh-standalone-'));
  t.after(() => rm(isolated, { recursive: true, force: true }));
  const moved = path.join(isolated, 'renamed-skill');
  await cp(output, moved, { recursive: true });
  await rm(root, { recursive: true });
  const hook = path.join(isolated, 'network-fixture.mjs');
  await writeFile(hook, `const original = ${JSON.stringify(original)};\nconst files = process.env.TEST_NEW_REVISION ? { ...original, 'future/new.md': '# New' } : original;\nglobalThis.fetch = async url => {\n if (url.endsWith('/repos/example/docs')) return Response.json({default_branch:'main'});\n if (url.includes('/commits/')) return Response.json({sha:process.env.TEST_NEW_REVISION ? '${commitB}' : '${commitA}'});\n if (url.includes('/git/trees/')) return Response.json({truncated:false,tree:Object.keys(files).map(path=>({path,type:'blob',mode:'100644'}))});\n const name = decodeURIComponent(url.split('/').slice(6).join('/'));\n return new Response(files[name],{status:Object.hasOwn(files,name)?200:404});\n};\n`);
  const script = path.join(moved, 'scripts/sync-official-skill.mjs');
  const options = { cwd: os.tmpdir(), encoding: 'utf8', timeout: 10000 };
  const before = await snapshot(moved);
  const check = spawnSync(process.execPath, ['--import', hook, script, '--check', '--json'], options);
  assert.equal(check.status, 0, check.stdout + check.stderr);
  assert.equal(JSON.parse(check.stdout).status, 'unchanged');
  assert.deepEqual(await snapshot(moved), before);
  const update = spawnSync(process.execPath, ['--import', hook, script, '--json'], { ...options, env: { ...process.env, TEST_NEW_REVISION: '1' } });
  assert.equal(update.status, 0, update.stdout + update.stderr);
  assert.equal(JSON.parse(update.stdout).documents, 4);
  assert.equal((await verifyLocal(moved)).ok, true);
});

test('standalone source configuration is editable and offline verification detects missing originals', async t => {
  const { root, output } = await fixture(t);
  await syncOfficial({ root, source: fakeSource() });
  await writeFile(path.join(output, 'scripts/dsh-docs.sources.json'), JSON.stringify(fullConfig));
  const result = await syncOfficial({ skillRoot: output, source: fakeSource() });
  assert.equal(result.documents, 3);
  assert.equal((await verifyLocal(output)).ok, true);
  await rm(path.join(output, 'originals/docs/start.md.txt'));
  const verified = await verifyLocal(output);
  assert.equal(verified.ok, false);
  assert.ok(verified.issues.some(issue => issue.includes('原文缺失')));
});

test('cyclic or escaping upstream symlinks do not replace a valid Skill', async t => {
  const { root } = await fixture(t);
  await writeFile(path.join(root, 'scripts/dsh-docs.sources.json'), JSON.stringify(fullConfig));
  await syncOfficial({ root, source: fakeSource() });
  const before = await snapshot(root);
  const source = fakeSource({ ...original, 'cycle.md': 'cycle.md' }, commitB);
  const tree = source.tree;
  source.tree = async commit => (await tree(commit)).map(item => ({ ...item, mode: item.path === 'cycle.md' ? '120000' : item.mode }));
  await assert.rejects(syncOfficial({ root, source }), /循环/);
  assert.deepEqual(await snapshot(root), before);
});
