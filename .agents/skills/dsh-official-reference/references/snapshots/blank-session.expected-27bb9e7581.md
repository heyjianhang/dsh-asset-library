> 自动同步的官方参考原文。来源：[snapshots/web/details-session-lifecycle/blank-session.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/details-session-lifecycle/blank-session.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Blank Session workspace sidebar

- No selected Session: expand control absent
- Selected workspace before first message: expand control visible
- Files: before-chat.md opens as a Markdown preview
- Narrow viewport: reopened preview fills the viewport
- Terminal: writes a file in the selected workspace before any user message or turn

```json
[
  {
    "active": true,
    "tabs": [
      {
        "title": "Files",
        "selected": false
      },
      {
        "title": "before-chat.md",
        "selected": true
      }
    ]
  }
]
```
