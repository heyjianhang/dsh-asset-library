> 自动同步的官方参考原文。来源：[.agents/notes/archived/feature/2026-07-23-tui-status-prompt-tools.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/feature/2026-07-23-tui-status-prompt-tools.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: TUI status inspects model request inputs

Status: implemented
Archived: 2026-08-04

English | [中文](2026-07-23-tui-status-prompt-tools.zh-2878f77c31.md)

## Problem

Session counters describe activity but do not reveal the instructions and capabilities that the next model request receives. Diagnosing scoped prompt contributions and tool restrictions otherwise requires leaving the TUI or inferring configuration from files.

## Decision

`/status` assembles the current agent's system prompt through `ctx.systemPrompt` and renders it with the same renderer used by the agent loop. After the bordered diagnostics card, separate unbordered `System prompt` and `Registered tools` sections show the rendered prompt and the assembly's ordered tool names, which are the schemas exposed to the model for that agent and presentation mode.

Assembly uses the command's cancellation signal and current agent scope, so scoped sections, variables, tool restrictions, and assembly listeners match a request made at that point. Prompt and tool values are escaped through the TUI's terminal-control sanitizer before rendering. Empty prompt text and an empty tool list render as `(empty)` and `(none)`.

## Alternatives considered

**Read prompt sections and the tool registry independently.** Rejected: that bypasses prompt assembly waterfalls, tool ordering, presentation modes, and per-agent restrictions, so the diagnostics could disagree with the next request.

**Show complete tool schemas.** Rejected: names answer which capabilities are registered without making the status card dominated by parameter JSON; schema details remain available in the generated tool catalog and source definitions.

## Consequences

The command can run prompt providers and assembly listeners, just like request preparation, and reports their failures through the existing command-error notice. The snapshot is point-in-time: a later registration, restriction, mode change, or dynamic provider can alter the next request.

## Testing

Package behavior tests pin scoped assembly output, ordered tool names, empty labels, and terminal-control escaping. The package semantic snapshots exercise `/status` at normal and narrow widths; a deployment shipping the TUI owns its assembled process acceptance.
