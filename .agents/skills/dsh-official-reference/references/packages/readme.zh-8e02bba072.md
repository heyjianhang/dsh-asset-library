> 自动同步的官方参考原文。来源：[packages/plan/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/plan/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "plan 组的包映射：引导 agent（智能体）先探索和设计再执行的计划模式功能，供用户和维护者浏览该组。"
kind: "package-group"
---

# plan/：plan 协作状态

[English](readme-3cf887a0e3.md) | 中文

## 概述

`plan/` 组提供计划模式：激活期间，agent 先探索和设计再执行，遵循部署写入的指令，并在执行前提交完成的计划供你批准。你可以用 `/plan` 命令进入和离开计划模式，批准计划，或让 agent 回去继续规划。计划模式是引导而非限制：每个工具仍然可用，沙箱模式与审批提示等限制需另行配置。该组只包含一个包 `plan-mode`。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

一个包提供完整的计划模式功能；完整约定以子系统参考为准。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`plan-mode/`](readme.zh-4f5212eb64.md) | 提供计划模式：`/plan` 进入和离开，部署写入的指令在规划期间引导 agent，`exit_plan_mode` 把完成的计划呈交你评审 | `ctx.planMode` |

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考了解共享词汇，再阅读设计说明了解决策。

- [计划模式子系统参考](../subsystems/plan.zh-b736ec5e76.md)——计划模式如何工作、其配置与退出工具的行为。
- [plan 专用协作状态](../history/2026-07-22-plan-specific-collaboration-state.zh-f0d90c0f92.md)——计划模式背后的设计决策。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
