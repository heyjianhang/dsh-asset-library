> 自动同步的官方参考原文。来源：[apps/web/tests/expected/composer-draft-scroll/geometry.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/composer-draft-scroll/geometry.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Composer draft scrolling (14-line cap, one editable surface, one scrollport)

## At the start of the draft

- draft overflows the capped box: true
- visible lines: 14
- the surface holds no scroll offset of its own: true
- scroll offset: 0px
- first draft line is on screen: true
- last draft line is on screen: false

## Scrolled to the end of the draft

- offset moved: true
- the surface holds no scroll offset of its own: true
- first draft line has scrolled out above: true
- last draft line is on screen: true

## Draft ending in a newline, scrolled to the end

- the draft's own last line is on screen: true

## Right after pasting a long block at the end

- the composer scrolled to the caret it left: true
- the pasted block's last line is on screen: true
