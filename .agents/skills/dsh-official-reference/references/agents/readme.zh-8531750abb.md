> 自动同步的官方参考原文。来源：[packages/preset/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "preset 组地图：按会话从 preset 文件组装 agent，供浏览本组的用户与维护者阅读。"
kind: "package-group"
---

# packages/preset

[English](readme-900308537e.md) | 中文

## 概述

preset 组提供按会话的 agent（智能体）组装：agent preset 是一个目录，内含一份 `agent.cordis.yml`；从 preset 组装的会话会使用该 preset 的工具、提示词段落与 skill（技能），而其他会话仍各自使用自己的工具、提示词段落与 skill。`agent-presets` 拥有名单——对已配置根目录与 harness home 的发现、受防护的按 agent 挂载，以及仅通过复制创建 preset 的方式——`persona` 则提供可组装的行，让 preset 不止能改变 agent 的工具，也能改变它的身份。两者合起来让一个进程可以同时运行多个组装方式不同的 agent。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`agent-presets`](readme.zh-a81825b685.md) | preset 名单、对受信任根目录与用户根目录的发现、按 agent 组装、仅通过复制创建 preset | `ctx.agentPresets` |
| [`persona`](readme.zh-074315082a.md) | preset 挂载的可组装人设行，用于遮蔽或替换部署级人设 | — |

-----

<a id="related-documentation"></a>
## 相关文档

- [`AgentPresets` 参考](../subsystems/core.zh-6e1fe608b8.md#ctxagentpresets--agentpresets)——发现、挂载、继承与重组。
- [Scope 子系统](../subsystems/scope.zh-d19d6ba9f3.md)——scope key，以及挂载接入 agent 时所用的父链。
- [系统提示词子系统](../subsystems/system-prompt.zh-ccc9dbc365.md)——preset 提示词段落如何注册与组装。
- [按会话组装 agent preset 的 Agent Note](../history/2026-08-03-per-session-agent-presets.zh-392ca820ba.md)——设计理由与备选方案。

部署交付的 preset 位于 [`agent-presets/presets/`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets/presets)——一个 preset 一个目录，那份目录列表就是名单；在这里再列一遍只会多出一份需要同步的名单。

-----

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
