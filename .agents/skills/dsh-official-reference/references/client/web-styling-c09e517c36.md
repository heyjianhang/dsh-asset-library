> 自动同步的官方参考原文。来源：[docs/web-styling.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/web-styling.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Web UI style reference

English | [中文](web-styling.zh-02e6e78e63.md)

This reference defines styling ownership and component rules for browser client packages. The current token values live in [`packages/client/ui-theme/src/styles/`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-theme/src/styles/); this document does not duplicate that generated-by-source inventory.

## Ownership

[`ui-theme`](readme-0f0e9dec66.md) owns the `--dsw-*` static scale, semantic aliases, typography, motion, gradients, shadows, scrollbar styles, and light/dark preference. [`ui-layout`](readme-33d6fe9191.md) applies the resolved theme snapshot to the document. Feature packages consume semantic aliases and do not define another global theme.

Global style sheets belong in `ui-theme/src/styles/`. Component styles live beside their component as CSS Modules. A component may define a local custom property when its value is part of that component's layout or presentation contract; shared colors, typography, elevation, and motion belong to the theme package.

## Component rules

- Reuse the control before restyling one: the [ui-primitives component catalog](readme-33df2efed7.md#component-catalog) is the only channel that crosses feature packages, and a deliberate visual difference belongs in a prop there rather than in a second copy ([decision](../history/2026-09-05-shared-client-control-primitives-a86da78dd1.md)).
- Use CSS Modules and `clsx`; do not add a component library or Tailwind.
- Use `--dsw-alias-*` semantic tokens in feature components. Do not copy static palette values or write literal colors there.
- Keep theme selectors out of feature component CSS. Light/dark overrides belong to the theme owner.
- Pair font sizes with line heights and use the theme typography variables when an existing role matches.
- Keep source text, terminal output, and diff lines unwrapped when their component contract requires column preservation; use the shared scrollbar styles rather than component-specific scrollbar selectors.
- Put presentation in CSS. Inline React styles may pass component-local custom-property values but must not encode theme branches.
- Preserve keyboard focus visibility and reduced-motion behavior when adding transitions or hover-only controls.
- Rounded corners inherit the global superellipse smoothing from ui-theme's `corner-shape.css` on supporting engines. Pair `corner-shape: round` with every full-round `border-radius` (`50%`, `100%`, or a pill radius) so circles and capsules keep circular arcs; the ui-theme corner-shape spec enforces the pairing.
- Elevated surfaces (menus, popovers, modals, panels, floating buttons, the composer) set `border: 0` and take `box-shadow: var(--dsw-elevation-panel)`, `var(--dsw-elevation-prominent)`, or the composer's `var(--dsw-elevation-soft)` (larger blur at lower alpha): the 0.5px hairline stroke is the first shadow layer, and `--dsw-elevation-stroke-color` rebinds or suppresses it per surface or state. Never pair a `--dsw-alias-border-*` border with an lv/elevation shadow — the ui-theme elevation spec rejects the pairing; state-colored borders (warn panels) stay real borders.
- Flat borders and separators that use a neutral `--dsw-alias-border-*` token draw at `0.5px` — buttons, inputs, cards, row dividers, and separators drawn as filled boxes (menu separators, the conversation header seam, markdown `hr`, vertical rails) share the hairline weight, which Chromium paints as one device pixel. Dashed affordances and state-colored borders keep 1px; spinner ring tracks keep their width through the spec's explicit allowlist. The ui-theme elevation spec rejects wider neutral solid borders.
- Clickable artifact links (markdown anchors, prose file mentions, web source and fetch links, produced-file chips, workflow member links) color through `--dsw-alias-link` at `font-weight: 500`, with no underline at rest and a dotted 3px-offset underline on hover/focus. Compact Thinking Markdown keeps tertiary text color and a resting dotted underline ([compact presentation](../history/2026-09-17-thinking-markdown-eee8e391f2.md)). Text-leading anchors also lead with the ui-primitives `LinkIcon` category glyph riding `currentColor`, which for a well-known external host is that site's own mark instead of the globe; workflow member links and image-only anchors carry no glyph, and tool-row file links keep their grey dotted affordance ([clickable-link Agent Note](../history/2026-09-04-web-clickable-link-styles-998c2c9976.md), [known-site mark Agent Note](../history/2026-09-16-known-site-link-marks-4fbeea2a01.md)).

## Changing the system

Add or change a shared token in the owning `ui-theme` sheet, then consume its semantic alias from feature packages. Update the owning package reference when a public styling contract changes. Visual behavior follows the [testing policy](../architecture/testing-c22885d97f.md); the [styling-system Agent Note](../history/2026-07-19-web-styling-system-340a37c108.md) records framework rationale.
