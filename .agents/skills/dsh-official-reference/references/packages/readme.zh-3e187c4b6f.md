> 自动同步的官方参考原文。来源：[packages/spill/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "文本 spill 能力家族的包映射：存储服务、本地后端与结果策略各自提供什么。"
kind: "package-group"
---

# spill/：文本 spill 能力家族

[English](readme-070ad4d37c.md) | 中文

## 概述

`spill/` 组在模型上下文之外保存全文，并返回定位信息与取回指引。该家族拆分为 `spill/` 中的存储服务、`spill-local/` 中的本地文件系统后端，以及 `spill-policy/` 中的工具结果策略。工具结果 spill 通过 `maxInlineBytes` 按需启用，存储失败时保留原始结果。[会话引用](readme.zh-aba7e99d77.md)也直接使用存储来保存已捕获但被截断的 transcript（文本记录），并自行提供预览和失败通知；它不需要工具结果策略。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

三个包分别承担 spill 相关角色；完整的词汇定义和约定以子系统参考文档为准。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`spill/`](readme.zh-4ee421b00a.md) | 存储服务：保存超大文本并返回定位信息与取回指引 | `ctx.spillStore` |
| [`spill-local/`](readme.zh-e0c6a8ffb3.md) | 将 spill 文本保存到本机的私有会话级文件 | 注册到 `ctx.spillStore` |
| [`spill-policy/`](readme.zh-012aa40e22.md) | 用预览和定位信息替换过大的纯文本工具结果 | 监听 `ctx.tools` |

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考文档了解共享词汇，再看设计决策。

- [spill 子系统](../subsystems/spill.zh-71c20ceaaa.md)——`SaveTextSpill`/`SpillRef` 词汇、归属与后端关系。
- [工具输出 spill 决策](../history/2026-07-08-tool-output-spill-files.zh-ae839dc4d6.md)——存储、保留与工具自有输出处理之间的能力边界。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
