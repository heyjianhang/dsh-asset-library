> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-09-composer-placeholder-whitespace.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-09-composer-placeholder-whitespace.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Composer placeholder emptiness

Status: implemented

English | [中文](2026-09-09-composer-placeholder-whitespace.zh-12f38293ac.md)

## Problem

Sharing the whitespace-trimmed submission check with placeholder rendering leaves guidance drawn over a draft containing spaces.

## Decision

The Composer hides its placeholder whenever the raw draft is nonempty. Submission keeps its trimmed-content check. Attachments and claimed commands retain their existing placeholder suppression.

## Alternatives considered

**Reuse the submission check.** Whitespace has no sendable message content, but it occupies the editor and moves its caret. A shared check conflates these two states.

## Consequences

All placeholder variants, including queued-message steering guidance, disappear after whitespace input and return after deletion. A whitespace-only draft without attachments remains unsendable. [Component tests](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-conversation/tests/input-bar.client.spec.tsx) cover visibility, composition, rerendering and submission; the [browser regression](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/composer-placeholder.e2e.ts) checks keyboard and clipboard gestures against built UI.
