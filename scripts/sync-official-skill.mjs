// Compatibility entrypoint; all implementation and inputs travel with the Skill.
export * from '../.agents/skills/dsh-official-reference/scripts/sync-official-skill.mjs';
import { main } from '../.agents/skills/dsh-official-reference/scripts/sync-official-skill.mjs';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
if (process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url))) {
  try { await main(); } catch (error) {
    if (process.argv.includes('--json')) console.log(JSON.stringify({ status: 'error', error: error.message }));
    else console.error(`同步失败：${error.message}`);
    process.exitCode = 1;
  }
}
