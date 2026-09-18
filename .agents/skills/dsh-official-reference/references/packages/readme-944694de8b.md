> 自动同步的官方参考原文。来源：[packages/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/schedule/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The schedule group map: session-local durable reminders over the session log, for users and maintainers navigating the group."
kind: "package-group"
---

# schedule/ — Session-local reminders

English | [中文](readme.zh-e86a0de4aa.md)

## Summary

The schedule group lets an agent create, list, and cancel reminders for the current conversation. Reminders can run after a delay, at an absolute time, or on a fixed interval; when due, they arrive as ordinary messages in that conversation. They survive restarts, but never leave the session or send email, SMS, or push notifications. The group's package provides reminder management and delivery. Optional browser packages show the current reminder catalog and mark conversations with known active reminders; those indicators reflect cached state and may lag the running session.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`schedule/`](readme-a61113b7f8.md) | Session-local reminders: schedule, list, and cancel active records; publish an optional read-only projection for the header catalog and list-row marker; deliver due reminders as conversation messages | — (tools only, in the exact agent scope) |

-----

<a id="related-documentation"></a>
## Related documentation

- [Session-local Schedule subsystem](../subsystems/schedule-dd3d32d4e0.md) — durable record, transition, view, and delivery contracts.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-schedule) — the `schedule_create`/`schedule_list`/`schedule_delete` schemas the model receives.
- [Schedule user guide](../architecture/schedule-8cecb9a9ca.md) — the official configuration path for mounting the package.
- [Web Schedule catalog](../client/readme-fb16058f3d.md) — the optional read-only browser presentation of active records.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
