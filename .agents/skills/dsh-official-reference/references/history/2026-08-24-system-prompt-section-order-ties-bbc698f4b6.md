> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-08-24-system-prompt-section-order-ties.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-08-24-system-prompt-section-order-ties.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Equal-order system-prompt sections render in activation order

Status: implemented
Archived: 2026-08-25

English | [中文](2026-08-24-system-prompt-section-order-ties.zh-d5d0836d79.md)

## Problem

`SystemPromptRegistry` sorts sections by `order` with a stable sort, so equal orders render in plugin-activation order. `tool:cordis` and `tool:workflow` both declared `order: 115`, while their activation order varies between clean platform compositions. ACP and SDK snapshot replays could therefore assemble the same sections in a different order from their committed `system-prompt.expected.md` files.

## Decision

Give the affected sequence distinct values without changing its established relative order: `tool:cordis` stays at 115, `tool:workflow` uses 115.5, `tool:ralph` stays at 116, continuable subagent guidance stays at 116.5, and child-report guidance stays at 117. Prompt text and tool schemas remain unchanged.

## Alternatives considered

**Normalize section order in the snapshot harness.** Rejected because the runtime, request header, and model prompt would remain sensitive to activation timing while only the fixture comparison hid the difference.

**Tie-break equal orders by section name in the registry.** Rejected because it would silently reorder every existing tie. Explicit orders keep each model-visible placement local to the contributing plugin.

## Consequences

The Cordis and workflow guidance has a platform-independent order while Ralph remains before continuable subagent and child-report guidance. Prompt-section placements that require a stable relative position need distinct `order` values; other equal-order sections retain activation-order semantics and are outside this decision.

## Testing

The keyless ACP and SDK snapshot replays pin Cordis before workflow and preserve the workflow, Ralph, continuable-subagent, and child-report sequence. The full snapshot suite verifies the refreshed fixtures.
