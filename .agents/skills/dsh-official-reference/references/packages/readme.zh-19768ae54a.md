> 自动同步的官方参考原文。来源：[packages/host/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Web GUI Host 侧的包映射：HTTP 与 SPA 服务器、工作区目录选择实现、open-in-app 启动路由和插件清单投影。"
kind: "package-group"
---

# host/ — Web GUI 宿主侧

[English](readme-62629169d0.md) | 中文

## 概述

`host/` 组提供 Web GUI 的普通 HTTP 服务器、服务已构建 Web 壳的 SPA dist 服务器、带原生／浏览／自适应组合包的工作区目录选择 seam、open-in-app 的应用探测与启动路由，以及只读的插件清单投影。这八个包都是产品包；浏览器传输位于 [`client/`](../client/readme.zh-f964eba3da.md)，组合应用是 [`apps/cli`](../platform/readme.zh-493af0e1d2.md)，它启动 [`dsh-base` 组合包](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/base/cordis.patch.yml) 来提供 `apps/web/` 下的 Web 应用。选择器后端可在共享 seam 后互相替换。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

八个包分别承担 Host 角色；各包的 README 拥有自己的约定与配置。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`webserver/`](readme.zh-15f79a2b2e.md) | 浏览器 HTTP 服务器：具名路由、upgrade、index 转换与回退席位 | `ctx.webServer` |
| [`frontend-static/`](readme.zh-05425f5714.md) | 占据 webserver 回退席位的 SPA dist 服务器 | 消费 `ctx.webServer` |
| [`directory-picker/`](readme.zh-8f9b129274.md) | 工作区目录选择 seam：能力约定与错误词汇 | `ctx.directoryPicker` |
| [`directory-picker-native/`](readme.zh-852cafc994.md) | 面向宿主屏幕前操作者的原生 OS 选择器后端 | 注册 `ctx.directoryPicker` |
| [`directory-picker-browse/`](readme.zh-583c48e73b.md) | 应用内目录浏览器后端，也服务于远程客户端 | 注册 `ctx.directoryPicker` |
| [`directory-picker-auto/`](readme.zh-0405972fec.md) | 在启动时挂载匹配后端的宿主自适应选择器 | 挂载一个后端 |
| [`open-in-app/`](readme.zh-3dffacc138.md) | 在已安装应用中打开 workspace 目录的应用探测、图标与启动路由 | 消费 `ctx.webServer` |
| [`plugin-inventory/`](readme.zh-7d804d27df.md) | 当前 Loader 条目的只读投影 | Remote `pluginInventory/list` |

-----

<a id="related-documentation"></a>
## 相关文档

先从传输与工作区记录的子系统参考读起，再看 Web Client 背后的分层决策。

- [HTTP 服务器子系统](../subsystems/web-server.zh-91b2a15a90.md)——webserver 的路由、匹配顺序与配置。
- [工作区子系统](../subsystems/workspace.zh-37c2fcc327.md)——目录选择器所喂给的工作区记录。
- [Web 配置树启动与传输分层](../history/2026-07-24-web-config-tree-boot-and-transport-layering.zh-30f3319c25.md)——Web 传输各层的所有权。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
