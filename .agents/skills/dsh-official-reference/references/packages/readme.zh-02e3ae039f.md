> 自动同步的官方参考原文。来源：[packages/fs/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "文件系统包组：`ctx.fs` 提供方约定、本地与沙箱强制后端、编辑前读取策略插件，以及面向模型的文件与搜索工具。"
kind: "package-group"
---

# packages/fs

[English](readme-de79a2d16e.md) | 中文

## 概述

`fs/` 组为 agent（智能体）提供持久、受策略约束的文件访问：`fs/` 定义 `ctx.fs` 服务约定，`fs-local/` 与 `fs-sandbox/` 提供宿主文件系统与沙箱强制后端，`fs-observation-policy/` 提供编辑前读取策略，`tool-fs/`（`read`、`read_image`、`write`、`edit`）与 `tool-fs-search/`（`glob`、`grep`）提供面向模型的工具。部署挂载一个后端，加载策略以获得新鲜度防护的变更，并注册模型应看到的工具包；后端可以更换，无需改动工具或策略。文件 I/O 有意不设超时：deadline 只会杀掉操作系统仍会完成的工作，因此取消只是系统调用边界的尽力而为信号。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

七个包承担文件系统角色；子系统参考文档完整收录各项约定与错误分类体系。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`fs/`](readme.zh-2e05e976c6.md) | `ctx.fs` 服务约定：执行世界路径、有界文本 I/O，以及带可选版本防护的原子变更 | `ctx.fs` |
| [`fs-local/`](readme.zh-da8c51791c.md) | 宿主文件系统后端：读取、写入并编辑本机上的真实文件 | 注册到 `ctx.fs` |
| [`fs-sandbox/`](readme.zh-bfe3b05542.md) | 沙箱强制后端：按每次调用的沙箱模式约束写入与编辑，读取直接通过 | 注册到 `ctx.fs` |
| [`fs-observation-policy/`](readme.zh-05b2ed266a.md) | 编辑前读取策略：记录观测到的存在或缺失，并通过 `fs/*` 事件防护写入/编辑 | `fs/*` 监听器 |
| [`tool-fs/`](readme.zh-aa501a801a.md) | 面向模型的 `read`、`read_image`、`write` 与 `edit` 工具及其执行器 | 注册到 `ctx.tools` |
| [`tool-fs-search/`](readme.zh-4f238a1ef2.md) | 由打包 ripgrep 二进制支持的面向模型 `glob` 与 `grep` 发现工具 | 注册到 `ctx.tools` |
| [`tool-str-replace-editor/`](readme.zh-03474091ea.md) | 独立的 `str_replace_editor` 工具：基于 `ctx.fs` 的 `view`、`create`、`str_replace` 与 `insert` | 注册到 `ctx.tools` |

策略是插件，不是工具注入的服务：移除它会留下裸提供方的无条件变更行为，而不会破坏工具。`fs-sandbox` 的模式围栏与编辑前读取门禁可以组合。`tool-fs-search` 有意不扩展提供方约定——搜索是由进程支持的 ripgrep 工作流，因此文件系统后端无需承担通用搜索 API。

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考文档了解共享词汇与错误分类体系，再看塑造该家族的设计决策。

- [文件系统子系统](../subsystems/filesystem.zh-9ea7883892.md)——目标、结果、防护、策略事件与错误分类体系。
- [跨能力族 fs 沙箱决策](../history/2026-07-14-cross-family-fs-sandbox.zh-b2cb3ce400.md)——文件系统 seam 上共享的沙箱模式围栏。
- [可移植执行世界消费方决策](../history/2026-07-28-portable-execution-world-consumers.zh-9184f11a2b.md)——文件系统与子进程提供方为何共享一个执行世界。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
