> 自动同步的官方参考原文。来源：[apps/web/tests/snapshots/preview-boot/source-chooser.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/snapshots/preview-boot/source-chooser.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- form "Choose Preview data":
  - heading "Choose Preview data" [level=1]
  - paragraph: Data mounts before the Worker and application start. Refresh to choose again.
  - group "Filesystem source":
    - text: Filesystem source
    - radio "Empty environment Load only the base runtime to verify first launch and workspace creation."
    - strong: Empty environment
    - text: Load only the base runtime to verify first launch and workspace creation.
    - radio "Built-in showcase Sample workspace, tool cards, subagents, and paged history." [checked]
    - strong: Built-in showcase
    - text: Sample workspace, tool cards, subagents, and paged history.
    - radio "WebFS directory Requires directory access and will be available after the WebFS provider lands." [disabled]
    - strong: WebFS directory
    - text: Requires directory access and will be available after the WebFS provider lands.
  - button "Start Preview"
