> 自动同步的官方参考原文。来源：[apps/web/tests/expected/composer-tab-geometry/geometry.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/composer-tab-geometry/geometry.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Input card position across the Chat and Trajectory tabs

## Wide viewport (1680px, card at its cap)

- Chat: scrollbar-gutter stable, overflow auto/auto
- Chat scroller scrolls: true
- Chat reserved band: 8px
- Trajectory: scrollbar-gutter auto, overflow hidden/auto
- Trajectory scroller scrolls: false
- Trajectory reserved band: 0px
- input card left edge moves between tabs: 0px
- input card right edge moves between tabs: 0px
- input card width changes between tabs: 0px

## Narrow viewport (800px, card shrinking with the column)

- Chat: scrollbar-gutter stable, overflow auto/auto
- Chat scroller scrolls: true
- Chat reserved band: 8px
- Trajectory: scrollbar-gutter auto, overflow hidden/auto
- Trajectory scroller scrolls: false
- Trajectory reserved band: 0px
- input card left edge moves between tabs: 0px
- input card right edge moves between tabs: 0px
- input card width changes between tabs: 0px

## Wide viewport, seat compensation removed in the page (control)

- Chat: scrollbar-gutter stable, overflow auto/auto
- Chat scroller scrolls: true
- Chat reserved band: 8px
- Trajectory: scrollbar-gutter auto, overflow hidden/auto
- Trajectory scroller scrolls: false
- Trajectory reserved band: 0px
- input card left edge moves between tabs: 4px
- input card right edge moves between tabs: 4px
- input card width changes between tabs: 0px
