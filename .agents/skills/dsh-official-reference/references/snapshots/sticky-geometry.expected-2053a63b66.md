> 自动同步的官方参考原文。来源：[snapshots/web/seeded-history/sticky-geometry.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/seeded-history/sticky-geometry.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Compaction marker sticky header (pinned over a code-block summary)

## Collapsed

- header is not sticky: true

## Open, pinned at the scroll container top

- header position is sticky: true
- header pins to the top edge: true
- header outranks the summary code-block banner: true
- hover fill stays fully opaque: true

## Scrolled so the summary code banner reaches its sticky offset

- container is scrolled off its top: true
- header's static position sits above the scrollport: true
- header holds at the scrollport top: true
- header owns the center point (toggle stays clickable): true
- summary code banner holds below the header band: true
- summary code banner stays clear of the header: true
- banner Copy control owns its own center: true
