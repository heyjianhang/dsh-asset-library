> 自动同步的官方参考原文。来源：[packages/web/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "web 访问能力家族的包映射：搜索与抓取服务、其提供方后端，以及消费它们的面向模型工具。"
kind: "package-group"
---

# web/：web 访问能力家族

[English](readme-95e2a4ab7d.md) | 中文

## 概述

`web/` 包让模型通过 `web_search` 与 `web_fetch` 工具搜索公共 web 和抓取 HTTP(S) 页面。部署可为搜索选择 Exa、Perplexity 或 DeepSeek，并通过匿名 HTTP(S) 访问抓取页面；可用性与资源上限取决于配置的提供方。该家族用于搜索和页面检索，不用于交互式浏览、内容提取或逐 URL 策略执行。提供方变化时，模型仍能获得一致的工具行为、取消与错误报告。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

六个包分别承担 web 角色；完整词汇与约定以子系统参考文档为准。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`web/`](readme.zh-3b8946684c.md) | 搜索与抓取服务：通过可互换的后端搜索与抓取 URL，统一选择与错误策略 | `ctx.web` |
| [`web-search-exa/`](readme.zh-2704525b81.md) | 通过 Exa 搜索 web | 注册到 `ctx.web` |
| [`web-search-perplexity/`](readme.zh-817794e0db.md) | 通过 Perplexity 搜索 web | 注册到 `ctx.web` |
| [`web-search-deepseek/`](readme.zh-f5153e40e7.md) | 通过 DeepSeek 原生搜索搜索 web | 注册到 `ctx.web` |
| [`web-fetch-http/`](readme.zh-5e778fef89.md) | 匿名抓取公共 HTTP(S) 页面 | 注册到 `ctx.web` |
| [`tool-web/`](readme.zh-100cca6750.md) | 向模型公开 `web_search` 与 `web_fetch` | 注册到 `ctx.tools` |

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考文档了解共享词汇，再看单一提供方选择服务背后的设计决策。

- [web 子系统](../subsystems/web.zh-0359c43742.md)——搜索与抓取的请求和结果、提供方可用性、`WebError` 与公开地址强制规则。
- [web 能力 seam 决策](../history/2026-06-24-web-capability-seam.zh-162f47200e.md)——搜索与抓取为何共用一项提供方选择服务。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
