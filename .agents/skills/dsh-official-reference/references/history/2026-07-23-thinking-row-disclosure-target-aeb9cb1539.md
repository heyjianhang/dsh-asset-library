> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-07-23-thinking-row-disclosure-target.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-07-23-thinking-row-disclosure-target.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Thinking rows use one disclosure target

Status: implemented
Archived: 2026-07-26

English | [中文](2026-07-23-thinking-row-disclosure-target.zh-67e010b0b8.md)

## Problem

A collapsed reasoning entry presents `Think` and its one-line reasoning summary as one visual row, but an icon-only disclosure control leaves both visible labels inert. Applying title expansion to every tool row would instead break the generic tool-row contract, where the row opens details and only the leading control expands arguments.

## Decision

`ToolRow` exposes the opt-in `expandOnRowClick` policy. `ThinkRow` enables it so the title and reasoning summary form one accessible disclosure target; pointer clicks, Enter, and Space toggle the same component-local expanded state. Tool rows that do not opt in retain row-to-details selection and leading-control argument expansion.

## Verification

The component spec pins both Think click targets and the unchanged generic tool-row handoff. The keyless browser fixture loads the real sidebar and conversation bundles, opens an authored reasoning session, clicks the summary and title, and checks the disclosure state and expanded body.

## Alternatives considered

**Expand every tool row from its title.** Generic tool rows use row clicks for details selection, so sharing this behavior would conflate two controls.

**Keep icon-only disclosure.** The smallest hit target remains disconnected from the labels that describe the hidden content.

**Render separate title and summary buttons.** Two controls for one expanded state add duplicate focus stops and ambiguous semantics.

## Consequences

Thinking rows gain a larger pointer target and keyboard disclosure semantics without changing other tool interactions. The generic row component carries one optional policy because disclosure ownership differs between reasoning and tool calls.
