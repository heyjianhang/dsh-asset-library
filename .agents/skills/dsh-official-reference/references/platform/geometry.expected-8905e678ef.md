> 自动同步的官方参考原文。来源：[apps/web/tests/expected/markdown-wide-table/geometry.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/markdown-wide-table/geometry.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Markdown wide-table relations

| viewport | table | fills the column | scrolls | breaks out past the column |
| --- | --- | --- | --- | --- |
| 1680px | fill | true | false | false |
| 1680px | wide | false | true | true |
| 1680px | long-cell | true | false | false |
| 1100px | fill | true | false | false |
| 1100px | wide | false | true | true |
| 1100px | long-cell | true | false | false |
| 640px | fill | true | false | false |
| 640px | wide | false | true | false |
| 640px | long-cell | true | false | false |

Wrap-first engagement (taller at the narrowest stop than at the widest):

- fill: true
- long-cell: true
