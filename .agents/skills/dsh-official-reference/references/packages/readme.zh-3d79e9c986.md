> 自动同步的官方参考原文。来源：[packages/mcp/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "MCP 包组：连接外部 Model Context Protocol 服务器，调用其工具并读取其资源。"
kind: "package-group"
---

# MCP — 模型上下文协议

[English](readme-ba5dea79fe.md) | 中文

## 概述

`mcp/` 组让模型调用外部 Model Context Protocol（MCP）工具并读取服务器资源。只需配置 `mcp-client` 条目；随附 profile 已统一挂载 `mcp-resources` 一次。只有作用域中存在已配置服务器的调用方才会看到 MCP 工具与提示词文本。连接还会提供服务器指令。配置与限制由各包的 README 说明。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

客户端拥有每个已配置连接；共享资源包为这些连接提供资源工具。

| 包 | 提供的能力 |
|---|---|
| [`mcp-client/`](readme.zh-428de8cd62.md) | 连接一台 MCP 服务器，暴露其工具与指令，并提供其资源操作 |
| [`mcp-resources/`](readme.zh-a9d34ca722.md) | 通过显式选择服务器的共享工具发现和读取资源 |

-----

<a id="related-documentation"></a>
## 相关文档

先用可运行的示例配置体验插件，再阅读 Agent Note 了解其背后的行为决策。

- [MCP 客户端插件 Agent Note](../history/2026-07-07-mcp-client-plugin.zh-d516235bf0.md)——桥接的设计：服务器限定命名、发现、执行与环境清洗。
- [资源与指令 Agent Note](../history/2026-09-12-mcp-resources-and-instructions.zh-4da6fbcf22.md)——按需资源访问与作用域服务器指引。
- [第三方记忆 MCP 指南](../architecture/mcp-memory.zh-3e8417e4d2.md)——可运行的 overlay 配置行与设置说明。
- [工具子系统参考](../subsystems/tools.zh-9dedaa7736.md)——接收已注册工具的 `ToolRuntime`。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
