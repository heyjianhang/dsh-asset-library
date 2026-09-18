> 自动同步的官方参考原文。来源：[packages/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The LLM capability group: a provider-neutral model-call service, the DeepSeek and pi-ai provider adapters, request-retry execution, and replay-aware token measurement."
kind: "package-group"
---

# llm/ — LLM capability family

English | [中文](readme.zh-a490f2c37c.md)

## Summary

The llm group provides the harness's model-call capability: one provider-neutral service through which any composition streams requests to a model provider, plus adapters, provider-specific request metadata, retry execution, and measurement. The core `llm` package defines the message, content-block, and stream-chunk vocabulary every plugin and the session log use; provider adapters translate a provider's wire format into that vocabulary; DeepSeek request-extension plugins contribute lifecycle-owned metadata outside model input; `llm-retry` re-runs failed requests at durable agent-step boundaries; and `token-meter` measures request and context pressure from the durable log. This page maps the group; each package README owns its per-package contract.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`llm/`](readme-72b051e752.md) | Streams one model call through a registered provider adapter and shares the harness message, block, and chunk vocabulary | `ctx.llm` |
| [`llm-deepseek/`](readme-733e0ac01e.md) | Serves the `deepseek-official` route with direct DeepSeek chat-completions, thinking, and image input | registers on `ctx.llm` |
| [`llm-pi-ai/`](readme-2441b9b5f2.md) | Serves configured provider routes through pi-ai catalogs and wire protocols, including hand-declared gateways | registers on `ctx.llm` |
| [`deepseek-llm-api-extensions/`](readme-c08ecaec33.md) | Registers lifecycle-owned top-level fields on official DeepSeek requests | `ctx.deepseekLlmApiExtensions` |
| [`plugin-package-inventory-deepseek/`](readme-bdaaceb25d.md) | Contributes the active Loader package inventory to official DeepSeek requests | contributes `dsh_plugin_packages` |
| [`llm-retry/`](readme-6d9e843c8c.md) | Retries failed model requests under each provider's policy at durable agent-step boundaries | listens to `agent/request-error` |
| [`token-meter/`](readme-395af00d87.md) | Measures request and context pressure from the durable session log with a fixed heuristic | `ctx.tokenMeter` |

-----

<a id="related-documentation"></a>
## Related documentation

- [LLM streaming subsystem](../subsystems/llm-streaming-7a1c63fe96.md) — the message and block types, the assembled model request, the `StreamChunk` protocol, and the adapter contract.
- [Token meter subsystem](../subsystems/token-meter-d138842e41.md) — the measurement semantics behind `ctx.tokenMeter`.
- [Twin LLM adapters](../history/2026-06-13-twin-llm-adapters-3bd698908a.md) — why the DeepSeek route ships two structurally different adapters.
- [Routed model context](../history/2026-07-20-routed-model-context-and-compaction-policy-7645f618f2.md) — how the loop routes model requests and compacts context.

<a id="dev-note"></a>
## Dev Note

None.
