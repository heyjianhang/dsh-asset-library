import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { checkBase } from './check-base.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'dsh-base-check-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, '.agents', 'skills', 'sample'), { recursive: true });
  await writeFile(path.join(root, 'AGENTS.md'), '# Entry\n');
  await writeFile(path.join(root, 'README.md'), '[entry](AGENTS.md)\n');
  await writeFile(path.join(root, '.agents', 'skills', 'sample', 'SKILL.md'), '---\nname: sample\ndescription: A usable fixture\n---\n# Skill\n');
  return root;
}

test('checks nested relative links and encoded spaces without imposing source folders', async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, 'notes'));
  await writeFile(path.join(root, 'notes', '页面 说明.md'), '[home](../README.md)\n');
  await writeFile(path.join(root, 'README.md'), '[entry](AGENTS.md)\n[details](notes/%E9%A1%B5%E9%9D%A2%20%E8%AF%B4%E6%98%8E.md)\n');
  const result = await checkBase(root);
  assert.equal(result.ok, true);
  assert.equal(result.localLinks, 3);
  assert.equal(result.skills, 1);
});

test('reports a real broken link while ignoring examples, URLs and anchors', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'README.md'), [
    '[missing](missing.md)', '```md', '[example](example.md)', '```',
    '`[inline example](not-a-file.md)`', '[web](https://example.invalid)', '[anchor](#example)',
  ].join('\n'));
  await mkdir(path.join(root, 'node_modules'));
  await writeFile(path.join(root, 'node_modules', 'vendor.md'), '[bad](missing.md)');
  const result = await checkBase(root);
  assert.equal(result.ok, false);
  assert.equal(result.issues.length, 1);
  assert.equal(result.issues[0].file, 'README.md');
  assert.equal(result.issues[0].line, 1);
});

test('missing entry and undiscoverable skill are failures', async t => {
  const root = await fixture(t);
  await rm(path.join(root, 'AGENTS.md'));
  await writeFile(path.join(root, '.agents', 'skills', 'sample', 'SKILL.md'), '# No discovery fields\n');
  const result = await checkBase(root);
  assert.equal(result.ok, false);
  assert.ok(result.issues.some(issue => issue.file === 'AGENTS.md'));
  assert.ok(result.issues.some(issue => issue.file.endsWith('SKILL.md')));
});

test('checks code-label links, reference definitions and HTML links', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'README.md'), '[`entry`](AGENTS.md)\n[missing]: absent.md\n<a href="absent-too.md">missing</a>\n');
  const result = await checkBase(root);
  assert.equal(result.localLinks, 3);
  assert.deepEqual(result.issues.map(issue => issue.line), [2, 3]);
});

test('CLI locates its own checkout and exposes failures in JSON and exit status', async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, 'scripts'));
  const cli = path.join(root, 'scripts', 'check-base.mjs');
  await cp(fileURLToPath(new URL('./check-base.mjs', import.meta.url)), cli);
  const helper = path.join(root, '.agents/skills/dsh-official-reference/scripts');
  await mkdir(helper, { recursive: true });
  await cp(fileURLToPath(new URL('../.agents/skills/dsh-official-reference/scripts/markdown-links.mjs', import.meta.url)), path.join(helper, 'markdown-links.mjs'));
  const options = { cwd: os.tmpdir(), encoding: 'utf8', timeout: 10000 };
  const success = spawnSync(process.execPath, [cli, '--json'], options);
  assert.equal(success.status, 0, success.stderr);
  assert.equal(JSON.parse(success.stdout).ok, true);
  await writeFile(path.join(root, 'README.md'), '[missing](missing.md)');
  const failure = spawnSync(process.execPath, [cli, '--json'], options);
  assert.equal(failure.status, 1, failure.stderr);
  assert.equal(JSON.parse(failure.stdout).ok, false);
});
