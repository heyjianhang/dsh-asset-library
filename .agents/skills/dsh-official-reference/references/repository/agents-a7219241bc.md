> 自动同步的官方参考原文。来源：[website/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/website/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Documentation website adapter

Follow the [root instructions](agents-a54ff182c7.md), the [documentation standard](../documentation/agents-d00743dc4e.md), and the [documentation workflow](../documentation/skill-f0730531bb.md).

## Keep documentation content out of this tree

`website/` owns only VitePress configuration, presentation assets, and the publication manifest. This file is the only maintained Markdown file in this subtree.

Keep canonical prose and generated catalogs in their owning `docs/` tier, then expose selected pages through [docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/website/docs.ts). Never add locale, route, API, or copied documentation trees such as `website/zh-CN/`, `website/en/`, or `website/api/`.

The projector writes disposable Markdown to the ignored `website/.generated/` directory. Never edit or commit `.generated/`, `.cache/`, or `.dist/`.

Production builds remove the configured output directory after VitePress resolves the site configuration and before it writes files. They reject output whose lexical path or nearest existing parent escapes the real site root, and unlink a link-shaped output instead of traversing its target. Raw-Markdown emission then treats files produced by that build as occupied and never overwrites them.

The build also emits each route's raw-Markdown twin (with a parent-level alias per index route) and a root `llms.txt` index into `.dist/`, so a page's URL, minus any trailing slash, plus `.md` serves it as plain Markdown. Both derive from the publication manifest at build time; neither is ever a file in this tree.

Run `pnpm docs:check` after changing this subtree; the gate rejects additional non-ignored Markdown under `website/`.

Content-page Markdown actions use the projector's `rawMarkdownPath` and the site base, including full `index.md` routes. Copy fetches carry `?dsh-raw=1`; development script imports still belong to Vite. Keep clipboard work within its initiating gesture and page lifetime; the [Markdown actions decision](../history/2026-09-15-docs-page-markdown-actions-adf9a7fd3d.md) owns browser limitations and verification.

The default-theme extension owns the Mermaid fullscreen viewer. Keep its enhancements separate from Markdown projection and preserve the original SVG. Route, language, theme, and rendered-SVG changes close the active view; theme disposal releases every observer, listener, and scroll lock. The [viewer decision](../history/2026-09-14-docs-mermaid-viewer-941d01dc3a.md) explains SVG isolation and verification.

Native code groups keep their radio controls in separate forms so copied search excerpts cannot clear the page's selected platform. Search excerpts and MPA builds display every command block because tab switching is unavailable; the [platform-tab decision](../history/2026-09-15-docs-platform-command-tabs-4a4643a380.md) owns the interaction and verification.
