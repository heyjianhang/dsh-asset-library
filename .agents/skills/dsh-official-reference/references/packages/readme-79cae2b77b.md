> 自动同步的官方参考原文。来源：[packages/terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the persistent terminal capability family: the owner-scoped ctx.terminals service, the shell backend that starts interactive bash or pwsh, and the six model-facing tools."
kind: "package-group"
---

# terminal/ — persistent PTY capability family

English | [中文](readme.zh-ad5f0bf12e.md)

## Summary

The `terminal/` family lets agents keep interactive shell and REPL sessions alive across tool calls, including the working directory, environment variables, and running child processes. Use `terminal/` for owner-isolated session management, `terminal-bash/` for sandboxed interactive bash or pwsh sessions, and `tool-terminal/` for six model-facing terminal operations with bounded results. Choose this family when a task needs interactive input or state that a one-shot bash command cannot retain. Sessions remain local to one harness process and do not survive a restart.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

The family is one session service, one shell backend, and one set of model-facing tools. Each child README owns the full contract; the subsystem reference owns the shared vocabulary and the generated service surface.

| Package | Role | ctx key |
|---|---|---|
| [`terminal/`](readme-1f9493213f.md) | Session service: owner-scoped sessions with opaque ids, exact-owner fencing, and awaited cleanup | `ctx.terminals` |
| [`terminal-bash/`](readme-c392f49999.md) | Shell backend: interactive bash or pwsh under the shared sandbox policy, with readiness detection and bounded output | registers a backend on `ctx.terminals` |
| [`tool-terminal/`](readme-2636453b7d.md) | Six model-facing tools with owner isolation and optional background sends | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared types and the service surface, then the Agent Note for the design rationale and deferred boundaries.

- [Terminal subsystem reference](../subsystems/terminal-f72896adba.md) — ids, backend and session contracts, send readiness, bounded reads, and the generated `ctx.terminals` API.
- [Persistent PTY Agent Note](../history/2026-07-16-persistent-pty-sessions-8624ec2a01.md) — the design decision, alternatives, and deferred work.
- [Capability seams](../architecture/capability-seams-0f7ddb1eb9.md) — the Service Definition / Service Provider / Consumer split this family follows.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
