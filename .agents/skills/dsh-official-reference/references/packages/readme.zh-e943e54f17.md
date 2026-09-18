> 自动同步的官方参考原文。来源：[packages/experimental/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "实验组地图：可公开安装的预稳定原型。"
kind: "package-group"
---

# packages/experimental

[English](readme-ceea8c28e8.md) | 中文

## 概述

实验组包含约定可能变更且不提供支持承诺的原型能力。所有当前包都以 `@deepseek-ai/dsh-experimental-*` 名称发布，包括显式启用的 Agent Teams 组合、Auto review、Cua Driver 提供方、浏览器操作后端、跨 realm Inspector、CPython PTC 后端与浏览器 worker 预览库。组外已发布产品不得依赖实验性包。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`agent-team-profile`](readme.zh-904c8aa315.md) | Agent Teams 的公开 opt-in profile 层 | — |
| [`agent-team`](readme.zh-dcc3565872.md) | 具名 teammate，成员之间持久消息与共享任务板 | `ctx.agentTeams` |
| [`agent-team-web-profile`](readme.zh-ffbc6a5beb.md) | Agent Teams 的公开 opt-in Web 层 | — |
| [`client-ui-agent-team`](readme.zh-b2ac78becf.md) | Web Team roster、任务板与 teammate 导航 | — |
| [`auto-review`](readme.zh-ec854aa0b6.md) | 显式 Web 层，在每个原生或 PTC inner 工具调用前使用同一模型审查 | — |
| [`ptc-runtime-python`](readme.zh-1542f36617.md) | PTC 执行 seam 的 CPython 子进程后端 | `ctx.ptcRuntime` |
| [`computer-use-cua-driver-mcp`](readme.zh-3e432dcc4e.md) | 通过 MCP 使用已安装的 Cua Driver | `ctx.computerUse` |
| [`computer-use-cua-driver-native`](readme.zh-9b4db22531.md) | 嵌入 Cua Driver 原生 npm 运行时 | `ctx.computerUse` |
| [`browser-use-playwright-mcp`](readme.zh-b94db14797.md) | 通过 MCP 提供 Playwright 浏览器工具 | `ctx.browserUse` |
| [`browser-use-chrome-devtools-mcp`](readme.zh-fc3a94607f.md) | 通过 MCP 提供 Chrome DevTools 检查与浏览器控制 | `ctx.browserUse` |
| [`browser-use-stagehand-native`](readme.zh-4c0c101cc5.md) | Stagehand 浏览器操作与显式配置的原生模型 | `ctx.browserUse` |
| [`browser-use-runtime`](readme.zh-2488c87606.md) | 实验性提供方共享的 Session 浏览器资源 | — |
| [`inspector`](readme.zh-a2534931b2.md) | 用于 Host 调试、Client Runtime 检查、网络采集与 Cordis 树的跨 realm CDP hub | `ctx.inspector` |
| [`tool-agent-team`](readme.zh-dc8d91ddeb.md) | 让模型创建、发消息与协调 teammate 的九个工具 | 按作用域注册工具到 `ctx.tools` |
| [`webworker-packer`](readme.zh-378a23611a.md) | 构建浏览器 worker 预览所消费的 gzip 压缩虚拟文件系统（VFS）镜像 | 库与 CLI（命令行界面），不使用 ctx key |
| [`webworker-runtime`](readme.zh-8ce37cae89.md) | 在专用浏览器 worker 中运行 harness 插件树 | 库与 worker 入口，不使用 ctx key |

-----

<a id="related-documentation"></a>
## 相关文档

- [实验包发布决策](../history/2026-09-12-experimental-publication-denylist.zh-47b2d6805a.md)——默认公开与私有例外。
- [计算机操作](../subsystems/computer-use.zh-417e889685.md)——桌面提供方选择。
- [浏览器操作](../subsystems/browser-use.zh-60f4629320.md)——浏览器提供方选择与 Session 所有权。
- [Agent Teams 子系统](../subsystems/agent-team.zh-021876142f.md)——持久 Team 类型与 `ctx.agentTeams` 服务 API。
- [实验子树规则](agents-e73ec70ed5.md)——实验状态放宽了什么、不放宽什么。

-----

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
