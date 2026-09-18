> 自动同步的官方参考原文。来源：[.agents/notes/implemented/architecture/2026-09-09-desktop-immediate-window-and-direct-start.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/architecture/2026-09-09-desktop-immediate-window-and-direct-start.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Show the Desktop window before starting the Host

Status: implemented

English | [中文](2026-09-09-desktop-immediate-window-and-direct-start.zh-afcccfcb32.md)

Plugin management and native recovery follow the [shared Web wrapper decision](2026-09-10-desktop-web-wrapper-c2b30327ef.md).

## Problem

Waiting for backend readiness leaves users without a window during profile preparation and module loading. A complete staged health-check process repeats backend startup before the application starts its serving process, while plugin startup can still fail in the serving process.

## Decision

Electron creates the main window with the packaged Web loading page before profile reconciliation or Host startup. The Web entry draws its boot page before awaiting Host readiness. The owned preload delivers structured boot injections, and the existing document activates its client plugins after they are applied; startup failures display diagnostics and available recovery actions. Closing during loading cancels further startup work and waits for the pending child to exit.

Fatal presentation follows [native Desktop recovery](2026-09-15-desktop-native-fatal-recovery-249da51343.md). Window timing, direct Host startup, and shutdown ownership remain governed here.

Desktop starts the actual Host through the [shared Web runner](2026-09-10-desktop-web-wrapper-c2b30327ef.md) after preparing the profile in place. Readiness supplies the authenticated Host URL and boot injections. The shell exchanges the URL for a Host cookie, forwards application HTTP requests, and authenticates direct WebSocket requests only for the owned application origin. This carrier adaptation preserves Web route and stream semantics while allowing static HTML to appear before the Host.

This partially supersedes staged backend probes and waiting to create the main window in the [packaging decision](2026-08-25-electron-desktop-packaging-and-updates-598174deb5.md) and [bundled-runtime decision](2026-09-08-desktop-bundled-runtime-and-external-plugins-4046ea823c.md). Those notes retain release, signing, transport, and resource ownership rationale. Full runtime file verification remains a packaging operation.

## Alternatives considered

**Keep a complete staged health check.** It can reject some startup failures before activation, but executes plugin initialization twice and cannot guarantee that the serving process will start. The actual Host result provides the diagnostic needed for explicit recovery.

**Keep the main window hidden until readiness.** This avoids presenting a loading page but gives users no visible progress or interaction while the backend loads. A shell-owned page can remain available when Host startup fails.

## Consequences

Users can see startup progress and recover from failures before the product UI is available. A responsive window does not imply that the backend is ready, and startup latency still requires installed-artifact measurement. Profile changes remain in place after activation fails.

Verification covers a delayed Host with a visible loading page, one serving startup for a fresh profile, failure and retry in the same window, native recovery, and closing while a child is starting. Installed GUI evidence complements lifecycle tests.
