> 自动同步的官方参考原文。来源：[packages/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the session retrieval capability family: searching, tracing, and reading live and durable session history, plus the Web session-log export."
kind: "package-group"
---

# session-query/ — session retrieval capability family

English | [中文](readme.zh-d89de75718.md)

## Summary

The `session-query/` group provides retrieval over live and durable session history, independent of compaction: programmatic callers query one unified service for exact logs, filtered lists, relationship traces, and full-text search; a SQLite backend powers the search; the model gets five workspace-authorized tools; and the Web UI gets an `/export` command that downloads a session ZIP. Search results agree with the conversation history the model sees. This page maps the group; each package README owns its per-package contract.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Each package README describes what you can do with its part of the family.

| Package | Role | ctx key |
|---|---|---|
| [`session-query/`](readme-c1b92584ca.md) | Unified session-history query service: exact reads, relationship traces, and filters | `ctx.sessionQuery` |
| [`session-query-sqlite/`](readme-e8e21d6aed.md) | Full-text search across session history backed by a SQLite FTS5 index | registers on `ctx.sessionQuery` |
| [`session-log-export/`](readme-841c3a5e8c.md) | Web `/export` command and browser download of a session ZIP | `ctx.sessionLogDownload` (browser) |
| [`tool-session-query/`](readme-e242c32f14.md) | Model-facing tools to search, trace, and read session history | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared query vocabulary, then the design records behind tracing and search.

- [Session Query subsystem reference](../subsystems/session-query-8860b2381c.md) — logical records, filters, search pages, lineage, bounded reads, and event relationships.
- [Session query relationship tracing](../history/2026-07-13-session-query-tracing-4daa61868e.md) — trace semantics and the validation boundary.
- [SQLite FTS5 session search](../history/2026-07-10-sqlite-session-query-provider-c924095dd1.md) — search semantics, reconciliation, and the tokenizer decision.

<a id="dev-note"></a>
## Dev Note

None.
