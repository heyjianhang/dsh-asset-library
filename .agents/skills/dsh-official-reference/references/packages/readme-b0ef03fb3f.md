> 自动同步的官方参考原文。来源：[packages/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The workflow group map: model-authored orchestration scripts that fan out subagents, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/workflow

English | [中文](readme.zh-01a77e6fc4.md)

## Summary

The workflow group lets an agent run orchestration scripts that delegate work to subagents and return a final value. The `workflow` tool supports scripted fan-out; the opt-in `ralph` tool runs a fixed sequence of fresh agents. Scripts use the shared PTC Node process runtime under the calling Session's file policy. Workflow hooks and child lifecycle remain owned by the workflow engine.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`workflow`](readme-b4eb4366bd.md) | Runs a model-written orchestration script that fans out subagents | `ctx.workflowEngine` |
| [`workflow-ptc`](readme-9d03cc37f5.md) | Runs workflow scripts through the shared sandboxed PTC Node process runtime | registers on `ctx.workflowEngine` |
| [`tool-workflow`](readme-ca3f3a7fa8.md) | Gives the model the `workflow` tool for scripted multi-agent orchestration | registers on `ctx.tools` |
| [`tool-ralph`](readme-f8a9fce942.md) | Gives the model the `ralph` tool for fresh-agent iterative loops | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Workflow subsystem](../subsystems/workflow-3a8a1be2c2.md) — the seam's types, start request, and `workflow/*` events.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-workflow) — the `workflow` tool schema the model receives.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-ralph) — the `ralph` tool schema the model receives.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-workflow-ptc) — every accepted engine config field.
- [Dynamic workflows Agent Note](../history/2026-07-05-dynamic-workflows-e3d7781276.md) — the seam design and its decisions.
- [Harness-level goal-based execution Agent Note](../history/2026-07-16-harness-level-loop-df83ffd10a.md) — the fixed fresh-agent loop design and deferred work.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
