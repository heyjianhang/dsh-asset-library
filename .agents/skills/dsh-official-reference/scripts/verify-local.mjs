import { createHash } from 'node:crypto';
import { readFile, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const digest = value => createHash('sha256').update(value).digest('hex');
async function listFiles(root, prefix = '') {
  const files = [];
  for (const entry of await readdir(path.join(root, prefix), { withFileTypes: true })) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Skill 中出现符号链接：${name}`);
    if (entry.isDirectory()) files.push(...await listFiles(root, name));
    else files.push(name);
  }
  return files;
}

export async function verifyLocal(root) {
  const manifest = JSON.parse(await readFile(path.join(root, 'upstream.json'), 'utf8'));
  const coverage = JSON.parse(await readFile(path.join(root, 'coverage.json'), 'utf8'));
  const issues = [];
  for (const [file, hash] of Object.entries(manifest.outputHashes)) {
    try {
      if (digest(await readFile(path.join(root, file))) !== hash) issues.push(`文件已改变：${file}`);
    } catch { issues.push(`文件缺失：${file}`); }
  }
  const expected = new Set([...Object.keys(manifest.outputHashes), 'upstream.json']);
  for (const file of await listFiles(root)) if (!expected.has(file)) issues.push(`未登记文件：${file}`);
  const documents = new Set(manifest.documents.map(doc => doc.path));
  const inventory = new Set(coverage.inventory.map(item => item.path));
  if (documents.size !== manifest.documents.length || inventory.size !== coverage.inventory.length) issues.push('清单中出现重复路径');
  if (coverage.commit !== manifest.commit) issues.push('覆盖清单与来源提交不一致');
  if (coverage.includedCount !== documents.size || coverage.inventoryCount !== inventory.size) issues.push('覆盖计数不一致');
  if (coverage.mode === 'all-repository-markdown') {
    if (coverage.missing.length || documents.size !== inventory.size) issues.push('全量文档覆盖不完整');
    for (const item of coverage.inventory) if (!item.included || !documents.has(item.path)) issues.push(`遗漏官方文档：${item.path}`);
  }
  for (const doc of manifest.documents) {
    try {
      if (digest(await readFile(path.join(root, doc.original))) !== doc.sourceSha256) issues.push(`原文不完整：${doc.path}`);
    } catch { issues.push(`原文缺失：${doc.path}`); }
  }
  return { ok: issues.length === 0, commit: manifest.commit, documents: documents.size, inventory: inventory.size, missing: coverage.missing.length, issues };
}

if (process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url))) {
  try {
    if (process.argv.slice(2).some(arg => arg !== '--json')) throw new Error('用法：node scripts/verify-local.mjs [--json]');
    const result = await verifyLocal(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
    console.log(process.argv.includes('--json') ? JSON.stringify(result, null, 2) : `${result.ok ? '通过' : '失败'}：${result.documents}/${result.inventory} 份文档，遗漏 ${result.missing}；${result.issues.join('；')}`);
    if (!result.ok) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
