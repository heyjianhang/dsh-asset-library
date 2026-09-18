> 自动同步的官方参考原文。来源：[packages/computer-use/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "用于选择并注册一个桌面提供方的计算机操作能力包。"
kind: "package-group"
---

# packages/computer-use

[English](readme-6205d76bd2.md) | 中文

## 概述

计算机操作提供方让模型观察并操作桌面。本组负责提供方的独占注册。各提供方拥有自己的操作、工具和平台要求；实验性 Cua Driver 提供方位于 experimental 组。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

选择一个提供方并挂载共享注册服务。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`computer-use`](readme.zh-0f0ca7c54f.md) | 按名称独占注册提供方 | `ctx.computerUse` |

<a id="related-documentation"></a>
## 相关文档

- [计算机操作](../subsystems/computer-use.zh-417e889685.md) — 能力归属和提供方选择。
- [实验性包](readme.zh-e943e54f17.md) — Cua Driver MCP 和原生提供方。

<a id="dev-note"></a>
## 开发备注

无。
