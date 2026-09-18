> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-09-09-content-sized-diagram-previews.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-09-09-content-sized-diagram-previews.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Content-sized diagram previews

Status: implemented
Archived: 2026-09-10

English | [中文](2026-09-09-content-sized-diagram-previews.zh-eda2b0d0d3.md)

## Problem

Short Graphviz and SVG images leave large empty regions when displayed inside 400px frames. A 59px Graphviz diagram occupies a 400px preview even though its rendered dimensions are already available to the browser.

## Decision

Mermaid, Graphviz, and SVG share the inert image canvas in `SourcePreview`. The browser derives its height from the image, preserves aspect ratio when shrinking to the available width, and adds 16px padding. Source switching retains the image and copying reads the original code. Theme changes regenerate Graphviz colors without introducing a separate sizing observer.

This replaces the diagram-frame choice in [Static Markdown fence previews](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/feature/2026-09-09-markdown-static-previews.md); that note continues to own HTML isolation, rendering lifecycle, and license obligations. HTML retains its opaque, script-free, 400px frame. SVG image mode disables scripts, link interaction, and external resource loading without inserting source-controlled markup into the application document.

## Alternatives considered

**Set iframe height to auto.** An iframe does not derive its outer height from its inner document. This still reserves an unrelated viewport.

**Add a frame measurement script or same-origin access.** A diagram already has image dimensions. Extra execution or origin permissions and resize messaging are unnecessary for that content.

## Consequences

Short diagrams occupy only their rendered height and canvas padding. The browser geometry regression compares image and container height in light and dark modes, then verifies proportional scaling in a narrow viewport. Browser security checks include SVG scripts, event handlers, nested HTML, and external images; copy and source toggling remain covered. HTML automatic height remains outside this change because arbitrary document layout has different measurement and isolation requirements.
