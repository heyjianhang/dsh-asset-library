> 自动同步的官方参考原文。来源：[packages/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the durable session data plane: the persistence seam and its backends, checkpoint policy, projections, log-backed titles, and outbound session telemetry."
kind: "package-group"
---

# session/ — durable session data plane

English | [中文](readme.zh-a35a4b8d25.md)

## Summary

The session group keeps conversations durable, restores released log formats, and makes committed history available after restart. Its storage and checkpoint packages protect requests, tool side effects, and completed steps; projection packages derive client-ready values; title packages name sessions; telemetry packages report activity. Start with the shipped JSONL storage, then add checkpointing and only the projections, title policy, or telemetry your deployment needs. Each package README owns its guarantees and configuration, while a sibling query group provides independent read and tool access.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

The group splits into four families: durable storage (persistence seam, backends, checkpoint policy), projections, titles, and telemetry. Each package README owns its contract and configuration.

### Persistence

| Package | Role | ctx key |
|---|---|---|
| [`session-format/`](readme-073e30cade.md) | Pure adjacent-format chain and artifact validation library | library — no ctx key |
| [`session-format-v0-to-v1/`](readme-f610a72b21.md) | Frozen released-v0 decoder and identity migration into released v1 | library — no ctx key |
| [`session-format-v1-to-v2/`](readme-e046cd11ea.md) | Frozen released-v1 decoder and cardinality-changing Assistant-stream migration into released v2 | library — no ctx key |
| [`session-format-catalog/`](readme-8e83e55f12.md) | Generated static catalog of shipped adjacent migrations | library — no ctx key |
| [`session-persistence/`](readme-2a9e570bf0.md) | Defines the durable session-storage service and the shared write coordination every backend composes | `ctx.sessionPersistence` |
| [`session-persistence-jsonl/`](readme-3b6e113184.md) | Shipped backend: immutable canonical generation filenames per Session with exclusive successor publication, optionally Zstandard-compressed | registers on `ctx.sessionPersistence` |
| [`session-checkpoint-policy/`](readme-0d5cd09962.md) | Makes model requests, top-level tool side effects, and completed steps durable before the next action | wraps `ctx.llm` and `ctx.tools` |
| [`session-log-deepseek/`](readme-7984a79b78.md) | Uploads the incremental canonical log as optional official DeepSeek request metadata | contributes `dsh_session_log` |

### Projection

| Package | Role | ctx key |
|---|---|---|
| [`session-projection/`](readme-e730c85a52.md) | Defines and drives projection units that fold committed events into whole current values | `ctx.sessionProjections` |
| [`session-projection-cache/`](readme-cdb9338140.md) | Persists projection checkpoints so cold reads skip full log loads | `ctx.sessionProjectionCache` |
| [`session-stats/`](readme-30f425f07b.md) | Serves whole-log conversation counts and wall times through the `sessionStats` unit | registers on `ctx.sessionProjections` |
| [`session-turn-outline/`](readme-7f1e839dc1.md) | Serves the whole-log turn outline (turn, `turn/start` seq, prompt preview) through the `turnOutline` unit | registers on `ctx.sessionProjections` |

### Titles

| Package | Role | ctx key |
|---|---|---|
| [`session-title/`](readme-c443f6454c.md) | Log-backed session titles with a deterministic fallback and one optional provider | `ctx.sessionTitle` |
| [`session-title-llm/`](readme-707ffd6dea.md) | Shared model-backed title-generation policy for the provider packages | library — no ctx key |
| [`session-title-first-prompt-llm/`](readme-6698368cbb.md) | Titles a session from its first eligible human message | registers on `ctx.sessionTitle` |
| [`session-title-all-prompts-llm/`](readme-7547fb9b15.md) | Titles a session from all eligible human messages | registers on `ctx.sessionTitle` |

### Telemetry

| Package | Role | ctx key |
|---|---|---|
| [`session-telemetry/`](readme-303a8ff432.md) | Captures session activity and hands records to a configured reporting backend | `ctx.sessionTelemetry` |
| [`session-telemetry-otel/`](readme-0c182af65b.md) | Delivers telemetry through OpenTelemetry logs in `FEEDBACK_ONLY` or `DISABLED` mode | registers on `ctx.sessionTelemetry` |

Only one title provider may register at a time; without one, the title service keeps its deterministic fallback. The subsystem pages below are the backend-neutral references for each family.

-----

<a id="related-documentation"></a>
## Related documentation

- [Session persistence subsystem](../subsystems/persistence-63e745c683.md) — backend-neutral service semantics, the flush checkpoint, and crash recovery.
- [Session projections subsystem](../subsystems/session-projection-c047f7f301.md) — the projection unit contract and drive semantics.
- [Session titles subsystem](../subsystems/session-title-41d2179d94.md) — title eligibility, fallback, and provider flow.
- [Session telemetry subsystem](../subsystems/session-telemetry-15cbcab55b.md) — capture, redaction, and delivery modes.
- [Session subsystem](../subsystems/session-b1806dce9a.md) — the live event log every package in this group persists or derives from.

<a id="dev-note"></a>
## Dev Note

None.
