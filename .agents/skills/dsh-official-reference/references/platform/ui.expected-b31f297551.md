> 自动同步的官方参考原文。来源：[apps/web/tests/expected/access-confirmation/ui.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/access-confirmation/ui.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- dialog "确认启用完全权限？":
  - heading "确认启用完全权限？" [level=2]
  - button "关闭":
    - img
  - img
  - paragraph: 启用完全权限后，智能体将减少确认步骤，并且可以直接执行更多操作，包括敏感操作、文件修改或外部命令。仅建议在你信任当前任务时使用。
  - checkbox "我已了解风险，并愿意继续"
  - text: 我已了解风险，并愿意继续
  - button "取消"
  - button "启用完全权限" [disabled]
