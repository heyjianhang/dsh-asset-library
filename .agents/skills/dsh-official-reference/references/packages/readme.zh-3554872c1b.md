> 自动同步的官方参考原文。来源：[packages/guard/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/guard/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "循环卫生 guard 家族的包映射：建议性重复工具提醒与单次工具调用超时策略，供选择或组合 guard 的用户与维护者阅读。"
kind: "package-group"
---

# guard/：循环卫生 guard 家族

[English](readme-d09119e539.md) | 中文

## 概述

`guard/` 组通过监视两种常见失败模式来保持 agent loop（智能体循环）高效。`repeat-tool-reminder` 会在模型重复完全相同的工具调用时提醒它改变方法或结束任务，让卡住的循环不再浪费时间和 token。`timeout-policy` 为声明了限时的工具调用设置时间上限，让挂起的调用向模型返回清晰的超时错误，而不是拖住整个会话。两者都在 `dsh` 基础组合包中默认启用；组合可以调优或移除它们。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

两个小插件分别覆盖两种模式；下文每个 README 都说明何时保留、调优或移除它。

| 包 | 提供什么 |
|---|---|
| [`repeat-tool-reminder/`](readme.zh-fe5d7283b6.md) | 在模型重复完全相同的工具调用时提醒它，使其改变方法或结束任务 |
| [`timeout-policy/`](readme.zh-3615a57925.md) | 为声明了限时的工具调用设置超时，让模型得到清晰错误而不是无限等待 |

-----

<a id="related-documentation"></a>
## 相关文档

先从工具子系统参考了解工具调用流水线，再看重复提醒的配置与策略背后的超时库决策。

- [工具子系统参考](../subsystems/tools.zh-9dedaa7736.md)——两个 guard 都依赖的工具调用流水线与决策。
- [生成配置目录](../architecture/config-catalog.zh-a03f895d4f.md#deepseek-aidsh-repeat-tool-reminder)——重复调用提醒的每个受支持字段。
- [超时截止时间库 Agent Note](../history/2026-07-06-timeout-deadline-library.zh-6b7e645053.md)——`timeout-policy` 所执行的时序／终止拆分。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
