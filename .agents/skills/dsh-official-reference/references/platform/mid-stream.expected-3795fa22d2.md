> 自动同步的官方参考原文。来源：[apps/web/tests/snapshots/streaming-fence-highlight/mid-stream.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/snapshots/streaming-fence-highlight/mid-stream.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- banner:
  - navigation "Session hierarchy":
    - button "Stream one TypeScript fence for" [disabled]
  - img
  - text: Standard mode
  - button "More actions":
    - img
  - button "Open right sidebar":
    - img
  - tablist:
    - tab "Chat" [selected]
    - tab "Trajectory"
- button "System prompt":
  - img
  - img
  - text: System prompt
- text: Stream one TypeScript fence for the highlighting snapshot. {{clock}}
- button "Copy":
  - img
- button "Context injection @deepseek-ai/dsh-system-prompt":
  - img
  - img
  - text: Context injection @deepseek-ai/dsh-system-prompt
- text: ts
- button "Copy"
- code: "const first: number = 1 const second = \"two\" let tail"
- status: Deep diving...
- textbox "Message or run a task, / commands, @ files or sessions"
- button "Add files or run commands":
  - img
- 'button "Access mode, current: Workspace Write"': Workspace Write
- button "Select model, current streaming-fence-highlight-test/streaming-fence":
  - text: streaming-fence-highlight-test/streaming-fence
  - img
- button "Stop generating"

---

{
  "language": "ts",
  "pre": {
    "className": "shiki css-variables",
    "style": "background-color: var(--shiki-background); color: var(--shiki-foreground);",
    "tabIndex": "0"
  },
  "lines": [
    [
      {
        "text": "const",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " first",
        "style": "color: var(--shiki-token-constant);"
      },
      {
        "text": ":",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " number",
        "style": "color: var(--shiki-token-constant);"
      },
      {
        "text": " =",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " 1",
        "style": "color: var(--shiki-token-constant);"
      }
    ],
    [
      {
        "text": "const",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " second",
        "style": "color: var(--shiki-token-constant);"
      },
      {
        "text": " =",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " \"two\"",
        "style": "color: var(--shiki-token-string-expression);"
      }
    ],
    [
      {
        "text": "let",
        "style": "color: var(--shiki-token-keyword);"
      },
      {
        "text": " tail",
        "style": "color: var(--shiki-foreground);"
      }
    ]
  ]
}
