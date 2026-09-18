> 自动同步的官方参考原文。来源：[.agents/notes/archived/feature/2026-07-27-assistant-timing-header-trailing.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/feature/2026-07-27-assistant-timing-header-trailing.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Assistant timing line renders after the message body

Status: implemented
Archived: 2026-08-04

English | [中文](2026-07-27-assistant-timing-header-trailing.zh-eca782e6d4.md)

## Problem

The TUI assistant message opened with a single header line joining the `Assistant` label and the step-timing string (`Assistant · Model wait 0.0s · Completed …`). Placing the timing before the body pushed the durations away from the answer they describe and, once completed, buried the reply's first line under a metadata line the reader scans past.

## Decision

**Split the label from the timing; render the timing as the message's trailing line.**

`AssistantMessageComponent` (packages/ui/tui/src/index.ts) now emits the bold `Assistant` label as the first line and appends the dim timing string (already assembled by `StreamingAssistantComponent.rebuild()` as `header`, including the `· Completed …` suffix when settled) as the last child, after reasoning and text. The timing content, bucket-hiding, and completion-time behavior are unchanged — only its position moved from the top to the bottom of the message.

## Alternatives considered

**Move the whole header line (label included) to the end.** Rejected: the `Assistant` label orients the reader to who is speaking and belongs at the top like the `You` label; only the timing metadata benefits from trailing placement.

**Keep the timing inline but below the label as a second top line.** Rejected: that still separates the durations from the completed answer and keeps two metadata lines between the prompt and the reply.

## Consequences

Each assistant message reads label → reasoning → answer → timing, so completed timing sits next to the reply it measures. The keyless TUI snapshot suite was refreshed to pin the new layout across every fixture; four `tui.spec.ts` assertions that matched the old inline `Assistant · Model wait …` string now assert the label and timing separately, since the two no longer render contiguously.
