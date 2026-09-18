> 自动同步的官方参考原文。来源：[.agents/notes/implemented/architecture/2026-09-14-sidebar-layout-provider-recovery.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/architecture/2026-09-14-sidebar-layout-provider-recovery.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Sidebar layout persistence and provider recovery

Status: implemented

English | [中文](2026-09-14-sidebar-layout-provider-recovery.zh-ea62ef44ac.md)

## Problem

Reloading the browser loses open files, pane placement and selection. Recovering retained terminals by opening new tabs cannot reproduce that arrangement and can reopen a collapsed sidebar.

## Decision

The sidebar persists a validated current-layout snapshot and identity counter per Session, while the Client store keeps undo history in memory. Invalid saved types or layout references clear only that Session snapshot. Undo history resets on reload so persisted data does not grow with past interactions. It restores layout and tab identities before rendering bodies, including resource pins. Providers restore their own content; the sidebar has no terminal-specific state or reconnection logic. Transient navigation parameters and resource contents remain outside the layout snapshot.

The terminal provider reads the adopted Session's tab records and restores terminal models before querying Host terminals that have no view. Its Client controller saves globally unique content-to-terminal identities as independent records before allocation, reuses them after reload, and removes them after recording explicit close intent. Layout-local tab ids identify separate live views but cannot identify persisted processes across windows; per-record writes and deletes avoid overwriting unrelated bindings. A restored identity never authorizes creating a replacement process. The Host owns process liveness, titles and screen contents; the saved association is only a recovery target. A saved association without a restored tab does not suppress Host discovery.

OpenCode's `packages/app/src/context/layout.tsx` saves Session tabs, while `context/terminal.tsx` separately saves terminal identities. DSH uses its existing Session-scoped store and provider services for the same separation, retaining Session ownership for terminals.

This partially supersedes the persistence exclusion in the [Web terminal decision](2026-09-09-web-sidebar-terminal-af5e0d394d.md). That note remains active because process ownership, cleanup, streaming and input-control decisions still apply.

## Alternatives considered

**Recover every retained terminal as a new tab.** Host discovery cannot recover tab placement, selection or a collapsed layout and duplicates restored tabs.

**Put terminal recovery into the sidebar.** That would make the layout owner depend on a specific content provider. A generic read of committed tab records lets each provider restore its own state.

**Persist process metadata and terminal output.** These values become stale independently of browser layout. Reattaching to the Host supplies current metadata and a consistent screen.

## Consequences

Layout survives reload within the same browser origin, with independent Session storage keys. Windows share the last saved layout for each Session; active windows retain their own layout until reload. Storage failure leaves memory state usable. Browser reload does not restart missing or exited processes; Host restart still cannot restore a shell. Provider state requires provider-owned recovery support, and transient file navigation parameters are not restored.

Store tests cover layout round trips, bounded persisted state, invalid records, Session isolation and resource adoption. Terminal tests cover identity reuse, missing targets, inactive closes and discovery without a restored tab. Assembled-browser tests exercise file preview, split panes, selection, fullscreen and collapsed reload with real terminal process identities.

The [two-hour unattended-terminal reclamation](2026-09-14-unattended-browser-terminal-reclamation-60506a852a.md) extends provider recovery with window-held terminal lifetimes while retaining this layout/content ownership split.
