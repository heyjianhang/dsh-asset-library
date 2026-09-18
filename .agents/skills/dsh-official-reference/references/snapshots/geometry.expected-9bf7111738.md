> 自动同步的官方参考原文。来源：[snapshots/web/sidebar-scrollbar/geometry.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/sidebar-scrollbar/geometry.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Sidebar session list scrollbar

## Light palette

- --dsh-scrollbar-thumb, pointer outside the sidebar: rgba(0, 0, 0, 0)
- scrollbar-gutter: stable
- ::-webkit-scrollbar width: 8px
- ::-webkit-scrollbar-track background: rgba(0, 0, 0, 0)
- scrollbar-width: auto
- scrollbar-color: auto
- ::-webkit-scrollbar-thumb:hover declarations: var(--dsh-scrollbar-thumb-hover)
- --dsh-scrollbar-thumb, pointer over the list: rgb(229, 229, 229)
- --dsh-scrollbar-thumb-hover, pointer over the list: rgb(212, 212, 212)
- list overflows: true
- reserved band: 8px
- scrollbar inset from the sidebar edge: 2px
- row background inset from the sidebar edge: 12px
- relative time covered by the bar: 0px
- relative time ends inside the content area: true
- content area ends before the border box: true

## Dark palette

- --dsh-scrollbar-thumb, pointer outside the sidebar: rgba(0, 0, 0, 0)
- scrollbar-gutter: stable
- ::-webkit-scrollbar width: 8px
- ::-webkit-scrollbar-track background: rgba(0, 0, 0, 0)
- scrollbar-width: auto
- scrollbar-color: auto
- ::-webkit-scrollbar-thumb:hover declarations: var(--dsh-scrollbar-thumb-hover)
- --dsh-scrollbar-thumb, pointer over the list: rgb(84, 85, 87)
- --dsh-scrollbar-thumb-hover, pointer over the list: rgb(101, 103, 107)
- list overflows: true
- reserved band: 8px
- scrollbar inset from the sidebar edge: 2px
- row background inset from the sidebar edge: 12px
- relative time covered by the bar: 0px
- relative time ends inside the content area: true
- content area ends before the border box: true
