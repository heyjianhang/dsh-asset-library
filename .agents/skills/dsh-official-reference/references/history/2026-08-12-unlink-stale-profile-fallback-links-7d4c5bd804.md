> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-08-12-unlink-stale-profile-fallback-links.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-08-12-unlink-stale-profile-fallback-links.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Unlink stale profile fallback links instead of rmSync

Status: implemented
Archived: 2026-09-04

English | [中文](2026-08-12-unlink-stale-profile-fallback-links.zh-3bcbb17442.md)

## Problem

`healProfilesModuleFallback` re-points `$DSH_HOME/profiles/node_modules` entries when an installation moves, and Windows hosts keep those entries as junctions. `ensureSymlink` deleted a stale entry with `rmSync(link)`, but Node treats a junction as a directory for removal: without `recursive`, `rmSync` throws `ERR_FS_EISDIR`, so every launch from a moved installation or a second worktree crashed before booting. The `replaces a wrong symlink` unit test reproduces that crash on Windows at the exact removal call.

## Decision

`ensureSymlink` removes a stale link with `unlinkSync(link)`. `unlink` deletes the reparse point or symlink itself on every platform and never descends into the target, which preserves the function's fail-loud guarantee that a real directory is never deleted. The [profile-plugin-bundles decision](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/architecture/2026-08-05-profile-plugin-bundles.md) keeps owning the fallback's two-anchor resolution; this note owns only the removal primitive.

## Alternatives considered

**`rmSync(link, { recursive: true })`.** On Node 24 this deletes the junction without following its target, but `recursive` would silently delete a real directory that replaced the link between the `lstat` guard and the removal, weakening the fail-loud contract that motivates the guard.

**`rmdirSync(link)`.** Removes a junction on Windows as well, but it reads as directory removal for a link, and `unlinkSync` is the repository's existing junction-cleanup idiom.

**Delete and recreate every entry unconditionally.** Correct but churns unchanged links on every launch and widens the concurrent-heal race window.

## Consequences

Windows launches heal moved or second-checkout installations instead of crashing with `ERR_FS_EISDIR`; POSIX behavior is unchanged because `unlinkSync` also unlinks plain symlinks. The existing `replaces a wrong symlink` test now passes on Windows where it previously reproduced the crash. Two concurrent healers deleting the same stale link still surface the second deletion as `ENOENT`, unchanged from the previous `rmSync` implementation.
