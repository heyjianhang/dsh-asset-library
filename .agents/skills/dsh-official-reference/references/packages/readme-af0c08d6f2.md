> 自动同步的官方参考原文。来源：[packages/core/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The core group map: the session log, system-prompt assembly, tool registry, agent vocabulary, and default loop that form the product API spine."
kind: "package-group"
---

# packages/core

English | [中文](readme.zh-96fe8d5f21.md)

## Summary

Use the core packages to build or extend an agent that records durable session history, assembles system prompts, exposes tools, selects a default model, and runs model turns. These packages define the shared APIs used by every composition, while executable product assemblies live under [`packages/bundle`](readme-168d963b7d.md). Choose this group when developing agent behavior or replacing one of those capabilities; start with [`dsh-base`](readme-4bfcd706bd.md) when you need the default runnable composition.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`scope/`](readme-f60c072f2f.md) | Scoped registration and event routing that isolate one agent's contributions | library — no ctx key |
| [`session/`](readme-ab821f2168.md) | The append-only session event log every agent's history derives from | `ctx.sessions` |
| [`system-prompt/`](readme-cfc72783e3.md) | System-prompt assembly from ordered sections, tool schemas, and variables | `ctx.systemPrompt` |
| [`tools/`](readme-20b02646bc.md) | The tool registry and guarded execution pipeline the loop dispatches through | `ctx.tools` |
| [`agent-tool-presentation/`](readme-cbf1455cdb.md) | Per-agent tool-presentation selector for presets | no ctx key |
| [`agent/`](readme-e2be891e5a.md) | The `Agent` handle plugins program against, plus its live registry and events | `ctx.agents` |
| [`agent-default-model/`](readme-40d5579141.md) | The deployment default model selection entry points apply to fresh agents | `ctx.agentDefaultModel` |
| [`agent-loop/`](readme-ca7695c214.md) | The default agent driver: creates agents and runs the turn and step lifecycle | `ctx.agentLoop` |

`scope` supplies the shared scoping primitive; `agent` owns the public `Agent` contract, while `agent-loop` is its default implementation, so extension plugins depend on `agent` and the driver stays swappable. `agent-default-model` owns the deployment selection an entry point applies when a session has none of its own. Runnable compositions live under [`packages/bundle`](readme-168d963b7d.md); this group owns only the swappable spine pieces.

-----

<a id="related-documentation"></a>
## Related documentation

- [Core subsystem](../subsystems/core-eb12d29a85.md) — the package-by-package loop map and the `Agent` handle contracts.
- [Session subsystem](../subsystems/session-b1806dce9a.md) — the session event vocabulary and derived history.
- [System-prompt subsystem](../subsystems/system-prompt-7410483c3d.md) — prompt section, dynamic context, and tool-schema types.
- [Tools subsystem](../subsystems/tools-82b9070d05.md) — the tool execution pipeline and presentation vocabulary.
- [Scoped registration subsystem](../subsystems/scope-af50cbbcde.md) — the scoped-layer primitive these registries build on.
- [Architecture](../architecture/architecture-140eef3ba4.md) — the turn flow and where new behavior goes.
- [Base bundle](readme-4bfcd706bd.md) — the default product composition.
- [SDK minimal bundle](readme-c7f65198a8.md) — a complete standalone composition with a deliberately smaller feature set.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
