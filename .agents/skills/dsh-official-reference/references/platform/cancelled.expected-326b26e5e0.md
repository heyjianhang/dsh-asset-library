> 自动同步的官方参考原文。来源：[apps/web/tests/expected/plugin-install-cancel/cancelled.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/plugin-install-cancel/cancelled.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- dialog "添加插件":
  - heading "添加插件" [level=2]
  - button "关闭":
    - img
  - paragraph: 输入插件的包名、GitHub 仓库地址或本地目录路径。
  - text: 包名或地址
  - textbox "包名或地址":
    - /placeholder: 例如 @deepseek-ai/dsh-experimental-auto-review
    - text: slow-package
  - button "不知道该填什么？":
    - img
    - text: 不知道该填什么？
  - button "安装"
