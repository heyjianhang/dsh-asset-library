> 自动同步的官方参考原文。来源：[packages/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "DeepSeek Harness 包工作区：packages/ 下的 npm 包如何分组、每个组负责什么，以及约束它们的约定。"
kind: "package-group"
---

# 包

[English](readme-1206c4b8d1.md) | 中文

## 概述

harness 由 `packages/` 下的 npm 包组装而成，按能力系列分组：会话与 agent loop（智能体循环）、面向模型的工具、shell 与文件系统执行、Web 访问、subagent 等等。把本页当作顶层地图使用：先找到拥有某能力的组，再打开其 README 查看包列表。每个包都以 `@deepseek-ai/dsh-*` 为作用域、只属于一个组；每个组的 README 都是该能力系列的权威包映射。

## 目录

- [包分组](#package-groups)
- [发布预期](#release-expectations)
- [依赖](#dependencies)
- [包 README 约定](#package-readme-contracts)
- [开发备注](#dev-note)

-----

<a id="package-groups"></a>
## 包分组

每个包只属于一个组；新包加入现有组，新组则更新其自身 README 与本表。

| 组 | 职责 |
|---|---|
| [`core/`](readme.zh-96fe8d5f21.md) | 产品 API 主干：会话、提示词、工具、agent 服务与具体循环 |
| [`api/`](readme.zh-a0579dc627.md) | Remote BFF 装配与 Typert RPC 网关 |
| [`typert/`](readme.zh-7911063925.md) | 类型图生成、产物加载与运行时注册表 |
| [`goal/`](readme.zh-e827a98d04.md) | 同会话 goal 的持久化与生命周期 |
| [`schedule/`](readme.zh-e86a0de4aa.md) | 仅限会话内的定时后续操作 |
| [`feedback/`](readme.zh-a6d095b3b6.md) | 人类反馈的采集与命令 |
| [`identity/`](readme.zh-eb5733a9ca.md) | 共享匿名身份 |
| [`llm/`](readme.zh-a490f2c37c.md) | LLM（大语言模型）能力系列：抽象服务 + 提供方适配器 |
| [`subprocess/`](readme.zh-c7251d2f16.md) | 子进程能力系列：Service Definition + 本地进程树提供方 |
| [`ssh/`](readme.zh-c613bc6e10.md) | POSIX 远端连接及配套文件系统、子进程与沙箱提供方 |
| [`shell/`](readme.zh-bfa63a0e83.md) | Bash 能力系列：执行器 seam、本地实现、面向模型的工具 |
| [`terminal/`](readme.zh-ad5f0bf12e.md) | 持久 PTY 能力系列：限定所有者范围的会话、本地实现、面向模型的工具 |
| [`ptc-runtime/`](readme.zh-837a1e6d45.md) | PTC 执行能力族：Service Definition + 沙箱 Node 提供方 + PTC mode Consumer |
| [`computer-use/`](readme.zh-4e94b02bd7.md) | 按名称独占注册桌面提供方 |
| [`browser-use/`](readme.zh-edbd1cf803.md) | 按名称独占注册浏览器提供方 |
| [`sandbox/`](readme.zh-b9ab60db41.md) | 进程限制 seam；bwrap、Landlock、Seatbelt 后端 |
| [`deliverables/`](readme.zh-34b569b35b.md) | 轮次交付物：显式文件交付与记录的工作区改动 |
| [`fs/`](readme.zh-02e3ae039f.md) | 文件系统能力系列：seam、本地实现、面向模型的文件工具、发现工具 |
| [`lsp/`](readme.zh-d819ce4515.md) | LSP 能力系列：seam、通用 stdio 提供方和 `lsp` 工具 |
| [`skill/`](readme.zh-c6b3de9935.md) | skill（技能）能力系列：提供方注册表、本地提供方、面向模型的目录／loader |
| [`compaction/`](readme.zh-79f694283b.md) | 压缩（compaction）能力系列：Service Definition + 基础提供方 + 命令 Consumer |
| [`context/`](readme.zh-603fd10911.md) | 模型可见请求上下文：workspace 指令、时间上下文、引用 |
| [`subagent/`](readme.zh-e11772fe86.md) | subagent 能力系列：提供方注册表约定和面向模型的委托工具 |
| [`jobs/`](readme.zh-ae760f0dd7.md) | 通用后台任务运行时和面向模型的作业控制工具 |
| [`experimental/`](readme.zh-e943e54f17.md) | 预稳定原型，包含显式私有例外 |
| [`workflow/`](readme.zh-01a77e6fc4.md) | 工作流 seam、PTC 进程引擎、面向模型的 `workflow`／`ralph` 工具 |
| [`webhook/`](readme.zh-fcdd74494d.md) | 已验证外部事件、受信规则与即发即弃 Workspace 会话 |
| [`web/`](readme.zh-70b9da2370.md) | Web 能力系列：seam、搜索／获取提供方、面向模型的 Web 工具 |
| [`document/`](readme.zh-543e8d6a27.md) | 共享宿主 Office 到 PDF 转换 |
| [`attachment/`](readme.zh-95c429b1f8.md) | 持久附件标识、校验、本地内容寻址存储 |
| [`spill/`](readme.zh-3e187c4b6f.md) | spill 能力系列：存储 seam、本地实现、工具结果 spill 策略 |
| [`todo/`](readme.zh-24f5b458e0.md) | 面向模型的 `todo_write` 工具 |
| [`plan/`](readme.zh-8e02bba072.md) | Plan 协作状态，提供直接进入命令与经评审的退出 |
| [`preset/`](../agents/readme.zh-8531750abb.md) | 由 preset `cordis.yml` 按会话组装 agent |
| [`guard/`](readme.zh-3554872c1b.md) | 循环卫生守卫：建议性重复调用提醒 + `tools/execute` 截止时间强制执行器 |
| [`bundle/`](readme.zh-945d4d5766.md) | 可安装的 `dsh --profile` 补丁层 |
| [`extensions/`](readme.zh-8209b2dad0.md) | agent 运行时自修改：实时插件／服务检查与模型所写挂载／卸载 |
| [`mcp/`](readme.zh-3d79e9c986.md) | 将外部 Model Context Protocol 服务器的工具接入为原生工具 |
| [`hooks/`](readme.zh-e91ab0677d.md) | 钩子桥接 + 共享的 Claude Code／Codex 线协议库 |
| [`session/`](readme.zh-a35a4b8d25.md) | 持久会话数据平面：持久化 seam + 后端、投影 seam、基于日志的标题、会话上报 |
| [`session-query/`](readme.zh-d89de75718.md) | 会话检索系列：逻辑语料库、有界读取、血缘、语义过滤、SQLite 全文搜索 |
| [`settings/`](readme.zh-a4388a720c.md) | 用户设置 seam + 基于文件的提供方 |
| [`credentials/`](readme.zh-c48c081d5c.md) | 凭据引用与凭据记录 seam + 环境变量优先于 `.env` 的提供方 + 需要向人询问的授权流程 |
| [`storage/`](readme.zh-6d16c4f61a.md) | 非会话存储中枢 + 后端 + 领域形式 |
| [`workspace/`](readme.zh-c387dcb600.md) | Workspace 实体 |
| [`sdk/`](readme.zh-4e9f74f55b.md) | 进程外 SDK：JSON-RPC 协议与 TypeScript 客户端／服务器 |
| [`acp/`](readme.zh-854d9bd82b.md) | 仅面向自动化的 ACP（Agent Client Protocol）服务器 |
| [`interaction/`](readme.zh-2d121a6318.md) | 人机协作平面：批准／交互 seam、权限预设、命令、询问用户的工具 |
| [`boot/`](readme.zh-704d5162a7.md) | 共享的 app bin 启动粘合层 |
| [`host/`](readme.zh-19768ae54a.md) | web GUI 宿主半侧：API 网关 + HTTP 路由服务器 |
| [`client/`](../client/readme.zh-f964eba3da.md) | web GUI 浏览器半侧：shell、协议层、对象服务、slot、`ui-*` 插件 |
| [`test-support/`](readme.zh-550b94a2ad.md) | 测试基础设施（testkit、回放、Loader 冒烟测试） |
| [`runtime-diagnostics/`](readme.zh-606e85eec2.md) | 运行时诊断：按包归属的运行时不变式检查与报告 |
| [`util/`](readme.zh-db57419c19.md) | 组间共享的低层零依赖工具（`Branded<B>`、home／路径辅助函数、超时、留存） |

-----

<a id="release-expectations"></a>
## 发布预期

大多数组属于产品组，提供稳定 API。例外：`experimental/` 发布时不提供稳定性或支持承诺，`test-support/`、`runtime-diagnostics/` 与 `util/` 是兼容性预期较低的支持组。

-----

<a id="dependencies"></a>
## 依赖

依赖图由工具生成：[docs/module-graph.md](../architecture/module-graph.zh-e74c052650.md)（`pnpm run gen-module-graph`，CI 中有新鲜度门禁）。

**扩展插件依赖 Service Definition，绝不依赖具体提供方。** `dsh-agent-loop` 可替换；UI、钩子和工具插件使用 `dsh-agent`。组合包可以依赖主干插件。能力在需要独立演进时分离 Service Definition／Service Provider／Consumer 角色；详见[能力 seam](../history/2026-06-13-capability-seams.zh-f066d915d3.md)。

-----

<a id="package-readme-contracts"></a>
## 包 README 约定

每个包 README 都覆盖用途、配置、扩展点与[模型体验](../practice/adding-a-package.zh-3816991694.md#4-write-the-package-readme)，列入模型无关[省略允许清单](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/verify-package-readme-model-experience.ts)的包除外。它还要包含 `## Known Limitations and Deferred Work`，或列入其[允许清单](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/verify-package-readme-limitations.ts)。包约定——导出、服务访问、不变式、测试——见 [packages/AGENTS.md](agents-0c2589e647.md)。

-----

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
