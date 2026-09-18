> 自动同步的官方参考原文。来源：[packages/hooks/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The hooks group map: run existing Claude Code and Codex shell-hook configs during agent runs, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/hooks

English | [中文](readme.zh-e91ab0677d.md)

## Summary

The hooks group lets agent runs reuse shell hooks written for Claude Code or Codex. Point the matching integration at an existing `hooks.json` to run supported command hooks when sessions start, prompts arrive, tools run, or runs stop. These hooks can block prompts or tool calls with model-visible messages, add conversation context, or require the run to continue. Choose this group to preserve existing hook configurations; each integration supports only the command-hook subset documented by its source tool.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | Shape |
|---|---|---|
| [`hook-protocol`](readme-fd2878f013.md) | Shared hook engine both bridges use; never configured directly | library |
| [`hooks-claude-code`](readme-a2a947a9ed.md) | Run your existing Claude Code `hooks.json` hooks during agent runs | plugin |
| [`hooks-codex`](readme-0f9b9b71e6.md) | Run your existing Codex `hooks.json` hooks during agent runs | plugin |

-----

<a id="related-documentation"></a>
## Related documentation

- [Interception extension-points Agent Note](../history/2026-06-30-interception-extension-points-28dafe4547.md) — the typed-Decision surface the bridges program against.
- [Hook bridges Agent Note](../history/2026-06-30-hook-bridges-4f70295fcb.md) — the bridge design and its decision mapping.
- [Hook protocol library Agent Note](../history/2026-06-30-hook-protocol-lib-dad3384947.md) — what the shared library owns and why.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
