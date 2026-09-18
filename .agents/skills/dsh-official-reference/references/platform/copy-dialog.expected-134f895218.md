> 自动同步的官方参考原文。来源：[apps/web/tests/expected/agent-preset-authoring/copy-dialog.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/agent-preset-authoring/copy-dialog.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- dialog "复制预设 · 复制自 极简模式":
  - heading "复制预设 · 复制自 极简模式" [level=2]
  - button "关闭":
    - img
  - paragraph: 整个预设会在本机复制一份。标识符将成为目录名，事后无法更改；其余内容之后直接在预设自己的文件里编辑。
  - text: 标识符
  - textbox "标识符":
    - /placeholder: my-agent
  - text: 名称
  - textbox "名称":
    - /placeholder: 选择器中显示的名字，缺省用标识符
  - alert: 请填写标识符。
  - button "取消"
  - button "创建" [disabled]
