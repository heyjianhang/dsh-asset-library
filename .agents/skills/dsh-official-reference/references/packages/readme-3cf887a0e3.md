> 自动同步的官方参考原文。来源：[packages/plan/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/plan/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the plan group: the plan-mode feature that guides the agent to explore and design before executing, for users and maintainers navigating the group."
kind: "package-group"
---

# plan/ — plan collaboration state

English | [中文](readme.zh-8e02bba072.md)

## Summary

The `plan/` group provides plan mode: while it is active, the agent explores and designs before executing, guided by instructions the deployment writes, and presents the finished plan for your approval before carrying it out. You can enter and leave plan mode with the `/plan` command and approve the plan or send the agent back to keep planning. Plan mode guides rather than restricts: every tool stays available, and limits such as sandbox mode and approval prompts are configured separately. The group contains one package, `plan-mode`.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

One package provides the whole plan-mode feature; the subsystem reference owns the exhaustive contracts.

| Package | Role | ctx key |
|---|---|---|
| [`plan-mode/`](readme-d39f240649.md) | Provides plan mode: `/plan` enters and leaves it, deployment guidance steers the agent while planning, and `exit_plan_mode` presents the finished plan for your review | `ctx.planMode` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then read the design note for the decisions.

- [Plan mode subsystem reference](../subsystems/plan-617c8a7dda.md) — how plan mode works, its configuration, and the exit tool's behavior.
- [Plan-specific collaboration state](../history/2026-07-22-plan-specific-collaboration-state-0b1d325500.md) — the design decision behind plan mode.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
