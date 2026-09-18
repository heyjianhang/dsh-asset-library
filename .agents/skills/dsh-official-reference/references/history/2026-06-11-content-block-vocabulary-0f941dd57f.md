> 自动同步的官方参考原文。来源：[.agents/notes/implemented/architecture/2026-06-11-content-block-vocabulary.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/architecture/2026-06-11-content-block-vocabulary.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Provider-neutral content-block vocabulary owned by dsh-llm

Status: implemented

English | [中文](2026-06-11-content-block-vocabulary.zh-701bcbe3de.md)

## Problem

The harness needs one internal language for messages that the loop, session log, and all plugins speak.

## Decision

Own the vocabulary: messages are arrays of typed content blocks (`text`, `reasoning`, `tool-call`, `tool-result`), with the union derived from the merge-extensible `ContentBlockMap` so plugins add block types via declaration merging. The same merge-extensible-map pattern types every "stringly" field (`MessageSource`, `FinishReason`, `TurnTrigger`, `TurnEndReason`). Streaming is a raw chunk protocol; `BlockAssembler` is the single shared assembly implementation. Adapters translate to provider wire formats — mapping cost lives in adapters, where it belongs.

In-session context injection (`context/message`) and mid-turn steering originally rendered as tagged user-role envelopes (the system-reminder pattern) rather than a new role, so adapters carry zero burden. Both now project as plain user content with no wrapper; see [the injected-content-envelope Agent Note](2026-07-20-unwrap-injected-content-envelopes-175be0b8ec.md). Live-adapter validation confirms this rendering for current DeepSeek behavior; a future provider-specific mismatch belongs in that adapter rather than a new canonical role.

## Alternatives considered

- **Mirror the DeepSeek/OpenAI chat-completions shape** — zero mapping cost for the first provider, but awkward for rich content (reasoning, tool results as structured blocks).
- **Adopt Anthropic's Messages block structure verbatim** — battle-tested, but the canonical types would mirror a third-party API the harness does not target first.

## Consequences

- Reasoning has a core home without provider-specific shapes.
- Multimodal blocks return only with coordinated adapter, UI, and compaction support; see [the drop-image Agent Note](2026-07-04-drop-image-content-block-225f68a85e.md).
- Cache hints and assistant prefill remain absent until a shipping adapter can honor them; see the [producer-less variants](2026-07-04-prune-producerless-vocabulary-variants-6e7bb8bcf5.md) and [inert request knobs](2026-07-04-drop-inert-request-knobs-c854b91c30.md) Agent Notes.
- Every adapter pays a translation cost; the first real adapters have since validated the streaming protocol, and new adapters should continue proving their provider-specific mapping in adapter-local tests.
- IDs that cross package boundaries are branded (`ToolCallId`, the shared agent/session `SessionId`) — nominal typing at zero runtime cost.
