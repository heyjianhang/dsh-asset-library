> 自动同步的官方参考原文。来源：[packages/terminal/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "持久终端能力家族的包映射：限定所有者范围的 ctx.terminals 服务、启动交互式 bash 或 pwsh 的 shell 后端，以及 6 个面向模型的工具。"
kind: "package-group"
---

# terminal/：持久 PTY 能力家族

[English](readme-79cae2b77b.md) | 中文

## 概述

`terminal/` 家族让 agent（智能体）的交互式 shell 和 REPL 会话跨工具调用持续存在，包括工作目录、环境变量和运行中的子进程。使用 `terminal/` 管理所有者隔离的会话，使用 `terminal-bash/` 启动受沙箱约束的交互式 bash 或 pwsh 会话，使用 `tool-terminal/` 获得 6 个结果有界的面向模型终端操作。任务需要交互式输入或需要保留单次 bash 命令无法保存的状态时，选择这个家族。会话仅存在于一个 harness 进程中，重启后不会恢复。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

该家族包含一个会话服务、一个 shell 后端与一组面向模型的工具。完整约定由各子级 README 负责；共享词汇与生成的服务接口面由子系统参考负责。

| 包 | 角色 | ctx 键 |
|---|---|---|
| [`terminal/`](readme.zh-dafd7b2e98.md) | 会话服务：限定所有者范围的会话、不透明 id、精确到所有者的限制与等待完成的清理 | `ctx.terminals` |
| [`terminal-bash/`](readme.zh-d53243b735.md) | shell 后端：在共享沙箱策略下启动交互式 bash 或 pwsh，带就绪检测与有界输出 | 注册后端到 `ctx.terminals` |
| [`tool-terminal/`](readme.zh-68c0bc209b.md) | 6 个面向模型的工具，带所有者隔离与可选后台发送 | 注册到 `ctx.tools` |

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考了解共享类型与服务接口面，再从 Agent Note 了解设计理由与暂缓边界。

- [终端子系统参考](../subsystems/terminal.zh-727b893bd6.md)——id、后端与会话约定、发送就绪、有界读取，以及生成的 `ctx.terminals` API。
- [持久 PTY Agent Note](../history/2026-07-16-persistent-pty-sessions.zh-dacd71ce28.md)——设计决策、备选方案与延期工作。
- [能力 seam](../architecture/capability-seams.zh-3cb0148b27.md)——本家族遵循的 Service Definition / Service Provider / Consumer 拆分。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
