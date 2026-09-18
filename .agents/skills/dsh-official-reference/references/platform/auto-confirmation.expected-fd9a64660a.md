> 自动同步的官方参考原文。来源：[apps/web/tests/expected/access-confirmation/auto-confirmation.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/access-confirmation/auto-confirmation.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- dialog "确认启用 Auto review（实验）？":
  - heading "确认启用 Auto review（实验）？" [level=2]
  - button "关闭":
    - img
  - img
  - paragraph: Auto review 不使用沙箱。每次原生工具调用和 PTC 内层调用前，都会由与当前 agent 相同的模型进行审查。此功能仍属实验性，可能误放行或误拒绝，并会消耗额外 token。
  - checkbox "我已了解这些风险，并愿意继续"
  - text: 我已了解这些风险，并愿意继续
  - button "取消"
  - button "启用 Auto review" [disabled]
