> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-14-windows-lock-release-probe.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-14-windows-lock-release-probe.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Windows lock release before contention probing

Status: implemented

English | [中文](2026-09-14-windows-lock-release-probe.zh-6868d5a6da.md)

## Problem

Windows exclusive file creation can report `EPERM` while another writer owns the lock. The holder can remove the lock before the contender's `lstat`, so absence at that later observation does not prove the create failed for a persistent permission restriction. The profile module-fallback contention test exposed this race.

## Decision

`withFileLock` permits one unconfirmed `EPERM` retry per Windows acquisition, using the existing backoff and deadline. Confirmed contention still waits normally. A second unconfirmed permission failure is rethrown, and the protected operation runs only after exclusive creation succeeds.

## Alternatives considered

Retrying every permission error until timeout would obscure persistent permission failures. Requiring the lock to exist during the later probe rejects a valid release race. Delaying the test's holder release changes timing without repairing the writer protocol.

## Consequences

A persistent Windows permission failure can incur one backoff before failing. POSIX behavior is unchanged. The atomic-write tests force release before the probe and verify both successful acquisition and persistent permission rejection; the profile tests exercise real competing writers. Existing credential-registration notes retain ownership of write serialization and are not superseded by this acquisition rule.
