> 自动同步的官方参考原文。来源：[packages/webhook/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/webhook/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for verified external events, programmatic rules, and fire-and-forget DSH Session creation."
kind: "package-group"
---

# webhook/ — verified external events to DSH Sessions

English | [中文](readme.zh-fcdd74494d.md)

## Summary

The Webhook family receives authenticated provider events and runs trusted programmatic rules. A rule can create an ordinary root Session inside a Web Workspace. Dispatch is process-local and fire-and-forget, with no delivery database, queue, retry, deduplication, or Agent-completion state.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`webhook/`](readme-3e12116a1d.md) | Rule registry, callback lifecycle, and Workspace-backed Session creation | `ctx.webhookRuntime` |
| [`webhook-github/`](readme-d8a6f61097.md) | Signed GitHub HTTP adapter | consumes `ctx.webhookRuntime` and `ctx.webServer` |

<a id="related-documentation"></a>
## Related documentation

Provider adapters authenticate and normalize deliveries. Rules own arbitrary conditions and external calls, then return `null` or one Session request. The [Webhook subsystem reference](../subsystems/webhook-458d1adbf9.md) owns the shared types and timing guarantees.

<a id="dev-note"></a>
## Dev Note

None.
