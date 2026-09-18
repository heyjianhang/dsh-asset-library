> 自动同步的官方参考原文。来源：[apps/web/tests/expected/reference-composer/menu.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/reference-composer/menu.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- listbox "Trigger suggestions":
  - text: Files & folders
  - option "folderx/ Browse folder" [selected]:
    - text: folderx/
    - button "Browse folder":
      - img
  - option "reference.txt"
  - text: Sessions
  - option "reference-order-target-session {{cwd}} · {{age}}"
  - option "reference-source-session {{cwd}} · {{age}}"
