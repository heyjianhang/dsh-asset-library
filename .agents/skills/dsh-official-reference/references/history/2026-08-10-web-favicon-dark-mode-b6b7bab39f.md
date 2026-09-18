> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-08-10-web-favicon-dark-mode.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-08-10-web-favicon-dark-mode.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Web favicon follows the color scheme

Status: implemented
Archived: 2026-08-10

English | [中文](2026-08-10-web-favicon-dark-mode.zh-2d1f63f2eb.md)

## Problem

`apps/web/public/favicon.svg` paints the DeepSeek mark solid black (`fill="#000"`), and `index.html` declares only that single SVG icon. Under an OS or browser dark color scheme the tab strip is dark too, so the black mark is effectively invisible. Safari versions before 26 do not render SVG favicons, so their users get no tab icon in any scheme.

## Decision

The favicon stays one file and adapts through the browser's own color-scheme signal: `favicon.svg` embeds `@media (prefers-color-scheme: dark) { path { fill: #fff } }`, switching the mark to white under a dark scheme while the light scheme keeps black. `index.html` and `manifest.webmanifest` also declare a 32×32 PNG fallback (`favicon-32x32.png`, DeepSeek brand blue `#4D6BFE`) that Safari versions before 26 render and that stays visible on both light and dark tab strips, extending the [web-install-manifest decision](2026-08-06-web-install-manifest-c9da477a51.md).

The theme signal is the OS/browser scheme, not the GUI's in-app `dsh.theme` toggle: the favicon lives in browser chrome, whose background follows the browser scheme, so `prefers-color-scheme` is the correct semantic and needs no JavaScript. Known browser quirks — Chromium may not repaint the tab icon until reload after a scheme switch, and Safari versions before 26 ignore the SVG variant — are accepted and the PNG fallback covers the older-Safari case.

## Alternatives considered

- **A second `<link rel="icon" media="(prefers-color-scheme: dark)">` pointing at a separate dark SVG.** Rejected: the same scheme semantics with two files to keep in sync, and no benefit over the in-file media query.
- **A theme-presenter that swaps the icon href on `theme/change`.** Rejected: it would follow the in-app toggle rather than the browser scheme that actually colors the tab strip, and it adds client code and a presenter for a chrome asset.
- **No PNG fallback.** Rejected: Safari versions before 26 never render SVG favicons, so the fallback is the only way those versions get a tab icon at all.

## Consequences

Light scheme still shows the black mark, dark scheme shows white, and Safari versions before 26 show the blue PNG in both. `apps/web/tests/pwa-manifest.e2e.ts` pins the PNG link and its order before the SVG, both manifest icons, the shipped PNG's format and dimensions, and the dark media query inside the shipped SVG. The Chromium repaint quirk remains a browser behavior the app cannot fix.
