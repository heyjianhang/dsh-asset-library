> 自动同步的官方参考原文。来源：[.agents/notes/implemented/process/2026-09-08-package-index-link-discovery.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/process/2026-09-08-package-index-link-discovery.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Include package indexes in Markdown link discovery

Status: implemented

English | [中文](2026-09-08-package-index-link-discovery.zh-cc46d1d463.md)

## Problem

In `verify-md-links`, nested group and package globs cannot match `packages/README.md` or its Chinese counterpart. A broken link in either index escapes validation unless the check also discovers those sources.

## Decision

[`verify-md-links`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/verify-md-links.ts) includes `packages/*.md` in its existing source discovery. The command and its tests share that discovery function. Symlink deduplication and frozen Agent Note exclusion remain owned by [`repo-files`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/repo-files.ts).

## Alternatives considered

**Repair individual links only.** This leaves the source-discovery omission in place, so a later broken index link can pass the same check.

**Add a separate package-inventory checker.** Index completeness is a different requirement from link validity. It needs to support the current table formats and bilingual link targets; it does not replace checking links in every discovered source.

## Consequences

Broken relative links in both package indexes fail the existing documentation command. Discovery tests exercise those failures, preserve package-instruction and nested-document coverage, and exclude frozen notes. This check validates links; it does not require indexes to enumerate every package or define the source sets of other documentation checks.
