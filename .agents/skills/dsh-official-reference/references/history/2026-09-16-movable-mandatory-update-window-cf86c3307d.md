> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-16-movable-mandatory-update-window.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-16-movable-mandatory-update-window.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Movable mandatory-update window

Status: implemented

English | [中文](2026-09-16-movable-mandatory-update-window.zh-2b56fa11e8.md)

## Problem

The Windows mandatory-update page used a frameless modal overlay sized to the product window. The modal disabled its parent, so the parent's native title bar could not be used to move or maximize either window. Closing the overlay was intercepted, leaving no visible exit control.

## Decision

On Windows, mandatory policy uses a separate native framed modal with move, resize, and maximize controls. The parent remains disabled while policy blocks interaction. Closing the modal requests normal application shutdown; it never dismisses policy and resumes the product window. Other platforms retain the existing overlay presentation. The [mandatory-update decision](2026-09-11-desktop-mandatory-update-client-c5cd0f205c.md) still owns policy and installation authorization.

## Alternatives considered

**Keep the full-content overlay and add a drag region.** A drag region would move the disabled parent indirectly and would not restore native maximize or close controls.

**Let close dismiss the policy page.** That would expose the blocked product window without a fresh no-force policy response.

## Consequences

Windows users can place or maximize the update window and exit the application from its close button. Modal blocking and the second installation approval remain intact. Installer-owned quit disposes the modal before Electron closes windows, so its close guard cannot block installation. The native frame replaces the dimmed full-content overlay on Windows; the ordinary update dialog keeps its existing overlay.
