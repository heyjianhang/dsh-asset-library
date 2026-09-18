> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-03-root-marker-metadata-failures.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-03-root-marker-metadata-failures.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Root marker metadata failures

Status: implemented

English | [中文](2026-09-03-root-marker-metadata-failures.zh-671a2f8544.md)

## Problem

Project-root discovery probes each configured marker while walking upward from the session working directory. Treating every resolve or stat failure as a missing marker lets a permission, I/O, or provider failure continue into an ancestor project and load unrelated workspace instructions. The discovery result must distinguish confirmed absence from unavailable metadata.

## Decision

Root-marker discovery continues upward only when host stat reports `ENOENT` or `ENOTDIR`, or when a filesystem provider returns no stat information or reports `FS_NOT_FOUND` from resolution or stat. It rethrows every other marker error unchanged after checking cancellation. Instruction-file candidates keep their separate availability policy: resolution, stat, and read failures skip only that candidate because files can race with discovery without changing project identity.

## Alternatives considered

**Treat every marker failure as absence and continue upward.** Rejected because an inaccessible child directory could inherit instructions from an unrelated ancestor project while discovery reports success.

**Stop at the first unavailable marker and use the session working directory as the root.** Rejected because it converts an unknown project root into a different project identity and can silently omit valid broader instructions.

## Consequences

Project-root discovery favors correct project identity over availability: one non-missing metadata failure anywhere in the ancestor walk rejects baseline loading with the original error. Instruction-file candidate failures retain their existing skip behavior. A failed baseline creates no workspace-context Session event, so the keyless recorded-session harness has no durable output for this path.

## Verification

Focused unit tests cover confirmed provider absence and unavailable host and provider marker metadata. The unavailable cases also prove that ancestor instructions do not enter derived model history.
