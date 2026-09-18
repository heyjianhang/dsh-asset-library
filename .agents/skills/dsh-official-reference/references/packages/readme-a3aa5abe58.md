> 自动同步的官方参考原文。来源：[packages/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The goal group map: one durable completion objective per session, with model tools, a human command, and automatic continuation, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/goal

English | [中文](readme.zh-e827a98d04.md)

## Summary

The goal group lets one agent session pursue a durable completion objective across restarts, resumes, and forks. Agents can create and update the objective, while people can inspect or control it directly with `/goal` without spending a model turn. An optional continuation package can keep active work moving through sequential Rounds. Each session has only one current goal, and that goal records completion state rather than scheduling work; automatic continuation must therefore be enabled separately.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`goal`](readme-f5e08765e5.md) | One durable goal per session: create, edit, pause, resume, complete, block, and clear | `ctx.goals` |
| [`tool-goal`](readme-4db95a1580.md) | Model tools `get_goal`, `create_goal`, `update_goal` | registers on `ctx.tools` |
| [`command-goal`](readme-9fd31d35d8.md) | Human `/goal` command in UI command planes | registers on `ctx.commands` |
| [`goal-round-driver`](readme-0bd3280272.md) | Automatic continuation: turns an active goal into sequential Rounds | no service key |

-----

<a id="related-documentation"></a>
## Related documentation

- [Goal subsystem](../subsystems/goal-c08402a6f9.md) — goal types, durable `goal/change` events, and the generated service API.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-goal) — the three goal-tool schemas the model receives.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-goal) — every accepted config field of the goal service.
- [Goal domain Agent Note](../history/2026-07-19-persisted-same-session-goal-domain-156bec1746.md) — the domain design and its decisions.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
