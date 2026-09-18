> 自动同步的官方参考原文。来源：[python/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/python/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# DeepSeek Harness Python SDK

[English](readme-217ed82f87.md) | 中文

用于以子进程方式驱动 DeepSeek Harness 的 Python 包。客户端 SDK 通过 stdio 使用按行分隔的 JSON-RPC 与内置运行时通信。

## 包

| 目录 | 分发名／模块 | 职责 |
|---|---|---|
| [sdk](readme.zh-1350edb41a.md) | `deepseek-harness-sdk` / `deepseek_harness` | 高层轮次 API 与低层 JSON-RPC 客户端 |
| [sdk-runtime](readme.zh-81c4138cd3.md) | `deepseek-harness-runtime-bin` / `deepseek_harness_runtime` | 内置 `dsh` CLI（命令行界面）可执行程序与原生伴随文件 |

## 行为

除非调用方选择另一个 `dsh` 可执行程序或 profile，否则 SDK 会启动匹配的内置 `dsh --profile sdk` 运行时。可运行的极简示例选择随附的独立 `sdk-minimal` profile；同一运行时还会打包 `dsh web` 及其前端产物，供单独通过 CLI 使用。每次启动都要求显式选择 Harness home；Python 绝不会静默读取 `~/.dsh`。[SDK 参考](readme.zh-1350edb41a.md) 和 [运行时载体参考](readme.zh-81c4138cd3.md) 定义运行时选择、profile、patch 与外部插件管理约定。

## 贡献者工作流

[Python 贡献者工作流](development.zh-a1fdc4ab1b.md)介绍运行时产物构建、包验证、源码模式开发和分发。
