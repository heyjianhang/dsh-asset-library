> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-15-desktop-profile-core-cleanup.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-15-desktop-profile-core-cleanup.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Clean application-owned packages before Desktop production boot

Status: implemented

English | [中文](2026-09-15-desktop-profile-core-cleanup.zh-2fc07531a1.md)

## Problem

Old Desktop profiles contain installed core packages and local tarball dependency declarations. Local package precedence can combine an old Web frontend with new plugins even when the application carries a consistent release. Development fallback links also remain when users switch to an installed application.

## Decision

Production Desktop cleans profile copies of packages named in the verified runtime descriptor or the old Desktop package-set record before starting the Host, under the existing profile lock. Cleanup removes matching dependency declarations and pnpm overrides, invalidates the lockfile when package state changes, and unlinks fallback links without deleting their targets. Other plugins, bundle selections, configuration, and session data remain. Development skips cleanup.

The implementation and its temporary enable constant live in `apps/desktop/src/profile-core-cleanup.ts`, with one call in profile preparation. Cleanup runs on every production startup because development or package operations can recreate residue. This qualifies package retention in the [bundled runtime decision](2026-09-08-desktop-bundled-runtime-and-external-plugins-4046ea823c.md); direct writes and failure recovery remain unchanged.

## Alternatives considered

**Installer-only cleanup** misses other user profiles and packages recreated after installation; both platforms use startup cleanup.

**Deleting every organization-prefixed package** can remove optional official plugins. Explicit current and historical package inventories determine ownership.

**Deleting package directories alone** lets pnpm reinstall the same old packages from retained declarations and overrides.

## Consequences

Production loses profile-local overrides of application-owned packages. A changed profile loses its lockfile and the next pnpm operation resolves remaining plugin dependencies again. Cleanup does not run pnpm or create rollback state; failures stop preparation and can be retried. Redirected package-parent directories fail before deletion. Focused tests cover retained plugins, declarations, repeated cleanup, development exclusion, retired packages, invalid records, and link targets.
