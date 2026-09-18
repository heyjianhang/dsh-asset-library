> 自动同步的官方参考原文。来源：[.agents/notes/implemented/testing/2026-09-12-connection-and-compaction-fixture-preconditions.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/testing/2026-09-12-connection-and-compaction-fixture-preconditions.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Connection and compaction fixture preconditions

Status: implemented

English | [中文](2026-09-12-connection-and-compaction-fixture-preconditions.zh-4cea9992fb.md)

## Problem

A reconnect label can appear while its hover color is still transitioning. Compaction pressure can select an initial instruction that is smaller than the required checkpoint framing. Neither observation alone establishes the state its test needs to assert.

## Decision

The [connection recovery test](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/lifecycle-chrome.e2e.ts) reads the warning color tokens from an independent element, then polls the indicator's computed foreground and background until both equal those tokens. Browser CSS transitions use a different clock from the mocked JavaScript retry timers. This follows the [fixture completion decision](2026-09-08-ci-completion-observations-b68c90fd6c.md): an intermediate visual state cannot satisfy the final assertion.

The [compaction smoke](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/cli/tests/profiles/headless/tests/compaction.e2e.ts) completes each file-reading turn before submitting the next. Each file contains 200 repetitions of its numbered sentence (4,600 characters). The 8,000-token synthetic context window triggers compaction at 50% usage, leaving a 4,000-token pressure threshold. In a fixture measurement, one completed read used 2,738 request tokens, including 1,274 tokens outside the conversation surface. A failing calibration run selected about 60 tokens of initial instruction but produced a 475-token framed checkpoint; the runtime correctly rejected that larger replacement. Separate completed turns prevent all four reads from becoming one retained tool group. Failure output includes the recorded compaction errors, while the test still requires a summary, replaced history, and a final answer.

## Alternatives considered

**Sleep or disable browser transitions.** A fixed delay does not observe completion; disabling transitions removes the production behavior involved in the failure.

**Raise timeouts or accept a nonshrinking checkpoint.** More time cannot make a short instruction larger than checkpoint framing. The runtime's nonshrinking rejection remains required.

**Only enlarge the synthetic context window.** A model can still batch the reads into one retained tool group, leaving no substantial older group to summarize.

## Consequences

Product behavior, CSS, compaction acceptance rules, recorded snapshots, retries, and test deadlines remain unchanged. The live-provider smoke uses additional explicit turns to establish older history; the browser fixture observes animation completion through the same exact color assertions.
