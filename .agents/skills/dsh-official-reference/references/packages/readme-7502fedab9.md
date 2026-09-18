> 自动同步的官方参考原文。来源：[packages/deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/deliverables/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The deliverables group map: the Host plugins that record what a turn hands to the user, explicit file deliveries and observed workspace changes, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/deliverables

English | [中文](readme.zh-34b569b35b.md)

## Summary

The deliverables family records what a turn hands to the user as durable Session events that only clients read: the `present` tool declares final files the model delivered, and the workspace-changes recorder captures the files a turn changed with their line counts from git snapshots and whole-file captures, and serves each file's comparison. The Web [deliverables plugin](../client/readme-a3586cfd97.md) renders both at the end of a turn. Choose this family for a product that shows delivered files and per-turn changes; `present` needs `ctx.tools` and `ctx.fs`, the recorder needs `ctx.subprocess` and a git executable.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`tool-present`](readme-b257410c1c.md) | Declares existing files as final deliverables through the `present` tool | registers on `ctx.tools` |
| [`workspace-changes`](readme-7ead72f8ac.md) | Summarizes each top-level turn's changed files from git working-tree snapshots and whole-file captures, and serves their comparisons | provides `ctx.workspaceChanges`; listens to `session/event`, appends `workspace/changes` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Deliverables subsystem](../subsystems/deliverables-c8b91afeb4.md) — the `PresentedFile` and `WorkspaceChangesSummary` vocabulary, the two durable events, and the summary service.
- [Web deliverables](../client/readme-a3586cfd97.md) — the turn-tail cards and file mentions that render these events.
- [Present declares workspace source files](../history/2026-09-08-present-workspace-source-files-2e48c53158.md) — the delivery decision.
- [Turn changed-files card](../history/2026-09-11-turn-changed-files-card-6fa986fbbe.md) — the snapshot design and coverage rules.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
