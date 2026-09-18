> 自动同步的官方参考原文。来源：[packages/todo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/todo/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The todo group map: the model-facing todo_write tool over the session log, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/todo

English | [中文](readme.zh-24f5b458e0.md)

## Summary

The todo group gives agents a session-level task list to plan with: add tasks, mark them in progress, and check them off, with the same list persisting across turns and reopened sessions. It is one product package that provides the `todo_write` tool; the list belongs to the agent session that created it, and each update replaces the whole list. Interactive hosts show the standing plan from the list, while the group itself ships no UI.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`tool-todo`](readme-361edf8133.md) | Lets the agent maintain a session task list: plan tasks, update status, and track progress | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Todo subsystem](../subsystems/todo-f4e162d037.md) — the `todo/write` event payload, ownership rules, and `TodoItem`.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-todo) — the `todo_write` schema the model receives.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-tool-todo) — every accepted config field.
- [todo_write tool Agent Note](../history/2026-06-29-todo-write-tool-1bfdac643c.md) — the original design and its alternatives.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
