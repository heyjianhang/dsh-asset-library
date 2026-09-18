> 自动同步的官方参考原文。来源：[.agents/notes/implemented/architecture/2026-06-11-microkernel-event-taxonomy.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/architecture/2026-06-11-microkernel-event-taxonomy.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Microkernel — extension via Cordis event taxonomy, one concrete loop

Status: implemented

English | [中文](2026-06-11-microkernel-event-taxonomy.zh-f0332efd64.md)

## Problem

The product principle is "everything is a plugin": hooks, /goal, /loop, dynamic workflows, compaction, sandboxing, permissions, UI, persistence, MCP, skills must all be writable as plugins without modifying the core.

## Decision

Pure Cordis event taxonomy. The loop's extension points are typed events with deliberate dispatch modes:

- **waterfall** (around-middleware) where plugins transform, short-circuit, recover, or wrap: `agent/pre-step`, `agent/request`, `agent/request-error`, `tools/pre-execute`, `tools/execute`, `tools/post-execute`, `llm/stream`, `system-prompt/assemble`.
- **serial** (awaited in listener order) for ordered checkpoints such as `agent/turn-stopping`.
- **parallel** (awaited fan-out) where every listener must get an independent chance: the `session/flush` durability checkpoint.
- **emit** (synchronous fire-and-forget) for notifications: inbox transitions, lifecycle, errors, and the contained immutable `tools/result` observation. Durable session events own turn and step boundaries.

The event vocabulary lives in contract packages (`dsh-agent` declares the `agent/*` events); `@deepseek-ai/dsh-agent-loop` is the only concrete loop plugin and is itself swappable — nothing outside it may depend on it.

## Alternatives considered

**A purpose-built middleware stack (koa-compose style)** and **an explicit phase state machine plugins insert into** — both would re-implement dispatch, disposal, and reload semantics that Cordis's native event system already provides; as Cordis effects, listeners get HMR and disposal for free.

## Consequences

- Every MVP feature maps to a listener (the [feature → mechanism map](../practice/extension-cookbook-45ab5e329f.md#the-feature--mechanism-map) is the proof obligation, kept current).
- HMR and disposal come free: listeners and registrations are Cordis effects.
- Waterfall semantics (call `next()` or short-circuit) are non-obvious and must be taught — documented in AGENTS.md and covered by composition tests.
- The loop must be defensive: plugin exceptions are contained at turn level, steering from any extension point is never stranded (regression-tested).
