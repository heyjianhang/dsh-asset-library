> 自动同步的官方参考原文。来源：[packages/context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The context group map: request-context plugins that add durable, model-visible context without defining tools, for users and maintainers navigating the group."
kind: "package-group"
---

# context/ — Request-context plugins

English | [中文](readme.zh-603fd10911.md)

## Summary

The context group provides plugins that add model-visible context to each request without defining any tool: workspace instruction files become guidance, `@file` mentions offer path completion, other sessions can be referenced as bounded snapshots, and the model can see the current time and the agent's tmux location. All of them are opt-in except `agent-instructions`, which `dsh-base` includes by default and a profile patch can disable. Context is durable: injected instructions and references enter session history as user-role messages, so they persist, replay, and compact like other conversation content. This page maps the group; each package README owns the per-package contract.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`agent-instructions/`](readme-abf023eaf8.md) | Loads `AGENTS.md`/`CLAUDE.md` workspace instructions into context and refreshes them after file edits | — |
| [`session-reference/`](readme-f32aad6e82.md) | References other sessions: mention one and its bounded read-only snapshot becomes context | `ctx.sessionReferenceResolver` |
| [`file-reference/`](readme-70081adff0.md) | `@file` mention discovery and the shared mention grammar for host-backed UIs | `ctx.fileReferences` |
| [`file-reference-local/`](readme-8a83d04a2e.md) | Local-workspace completion provider for `@file` mentions | — |
| [`time-context/`](readme-b54be1a2e1.md) | Current time, browser zone, and elapsed time per step | — |
| [`tmux-context/`](readme-c529b22ca7.md) | The agent's tmux session, window, and pane location | — |

-----

<a id="related-documentation"></a>
## Related documentation

- [Session-reference subsystem](../subsystems/session-reference-beed05a9d8.md) — canonical mention URIs, snapshot semantics, and the stable error taxonomy.
- [Workspace-context decision record](../history/2026-06-24-workspace-context-ade9892dcb.md) — why instruction context is per-agent/per-session and durably logged.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md) — every config field the group's packages accept.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
