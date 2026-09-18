> 自动同步的官方参考原文。来源：[packages/storage/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The storage group map: durable non-session data through named backends and the typed domain data form, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/storage

English | [中文](readme.zh-6d16c4f61a.md)

## Summary

The storage group keeps non-session application data across restarts, including workspace records and session sidecars. Choose `storage-json` for human-readable files or `storage-sqlite` for point updates in one database; `storage-domain` adds schema-validated typed records and change notifications, while `storage` selects the configured backend. These packages are optional and host-side: they do not expose tools, prompt content, or session events to the model. Use the group when application state must outlive a process, and omit it when the composition has no such data.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`storage`](readme-aeef44b03b.md) | Connects registered backends with mounted data-form facilities | `ctx.storage` |
| [`storage-json`](readme-435dd42f7b.md) | Stores each unit as one human-readable JSON file | registers backend `json` |
| [`storage-sqlite`](readme-9ecc653969.md) | Stores units as JSON documents in one SQLite database | registers backend `sqlite` |
| [`storage-domain`](readme-675df15b19.md) | Provides schema-validated, change-emitting KV domains over routed backends | `ctx.storageDomain` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Storage subsystem](../subsystems/storage-5396e0be0a.md) — the authoritative contract: the backend contract, domain declaration, change events, and generated API.
- [domain KV storage Agent Note](../history/2026-07-24-domain-kv-storage-and-workspace-cc9cd689e9.md) — the design behind the family, the workspace consumer, and the deferred session-backend migration.
- [Workspace subsystem](../subsystems/workspace-d8d44a8d59.md) — the first consumer of the domain data form.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The design Agent Note is still marked proposed while the family ships; its out-of-scope table is the deferred-work list for the migration phase (the `log` facet, session-backend reuse, cross-process change push). Promote decisions into implemented notes as they land.

</details>
