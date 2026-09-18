> 自动同步的官方参考原文。来源：[packages/llm/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "LLM（大语言模型）能力包组：一个提供方无关的模型调用服务、DeepSeek 与 pi-ai 提供方适配器、请求重试执行，以及具备回放感知的 token 计量。"
kind: "package-group"
---

# llm/ — LLM 能力家族

[English](readme-23daf3e3e5.md) | 中文

## 概述

llm 组提供 harness 的模型调用能力：一个提供方无关的服务，任何组合都可以通过它向模型提供方发起流式请求，外加适配器、提供方专用请求元数据、重试执行与计量。核心 `llm` 包定义所有插件与会话日志使用的消息、内容块与流式分片词汇；提供方适配器把某个提供方的协议格式（wire format）翻译为该词汇；DeepSeek 请求扩展插件在模型输入之外贡献具有生命周期归属的元数据；`llm-retry` 在持久化的 agent（智能体）步骤边界上重跑失败的请求；`token-meter` 从持久化日志测量请求与上下文压力。本页列出该包组的组成；每个包 README 负责各自的包级约定。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

| 包 | 职责 | ctx key |
|---|---|---|
| [`llm/`](readme.zh-74f2bab8fc.md) | 通过已注册的提供方适配器流式发起一次模型调用，并共享 harness 的消息、块与分片词汇 | `ctx.llm` |
| [`llm-deepseek/`](readme.zh-dc7dfd1106.md) | 以 DeepSeek chat-completions 直连、thinking 与图片输入服务 `deepseek-official` 路由 | 注册到 `ctx.llm` |
| [`llm-pi-ai/`](readme.zh-a9a03068c6.md) | 通过 pi-ai 目录与协议格式服务配置的提供方路由，包括手工声明的网关 | 注册到 `ctx.llm` |
| [`deepseek-llm-api-extensions/`](readme.zh-d41e389856.md) | 在官方 DeepSeek 请求上注册具有生命周期归属的顶层字段 | `ctx.deepseekLlmApiExtensions` |
| [`plugin-package-inventory-deepseek/`](readme.zh-4eb58a7168.md) | 为官方 DeepSeek 请求贡献当前启用的 Loader 包清单 | 贡献 `dsh_plugin_packages` |
| [`llm-retry/`](readme.zh-8253c32d1c.md) | 在持久 agent 步骤边界上按各提供方策略重试失败的模型请求 | 监听 `agent/request-error` |
| [`token-meter/`](readme.zh-b2a41a5ef9.md) | 用固定启发式规则从持久会话日志测量请求与上下文压力 | `ctx.tokenMeter` |

-----

<a id="related-documentation"></a>
## 相关文档

- [LLM 流式子系统](../subsystems/llm-streaming.zh-114dc2b3ac.md)——消息与块类型、组装后的模型请求、`StreamChunk` 协议与适配器约定（adapter contract）。
- [Token 计量子系统](../subsystems/token-meter.zh-371718c7db.md)——`ctx.tokenMeter` 背后的测量语义。
- [孪生 LLM 适配器](../history/2026-06-13-twin-llm-adapters.zh-5c4204285d.md)——为什么 DeepSeek 路由交付两个结构不同的适配器。
- [按路由的模型上下文](../history/2026-07-20-routed-model-context-and-compaction-policy.zh-a13675576e.md)——loop 如何路由模型请求并压缩上下文。

<a id="dev-note"></a>
## 开发备注

无。
