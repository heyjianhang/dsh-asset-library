> 自动同步的官方参考原文。来源：[packages/ssh/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "POSIX SSH 提供方家族：共享连接、远端文件系统、托管子进程及文件效果沙箱。"
kind: "package-group"
---

# ssh/ — POSIX 远端执行提供方

[English](readme-cfa341a5f5.md) | 中文

## 概述

本家族将文件、普通进程、终端及沙箱执行放在同一台 POSIX SSH 主机上，Harness 保留在本地。共享 OpenSSH 连接与已安装辅助程序支持现有文件系统、子进程及沙箱接口。适用于消费方遵守提供方路径语义的 headless 或自定义配置组合。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

<a id="packages"></a>
## 包

| 包 | 职责 | 服务 |
|---|---|---|
| [`ssh`](readme.zh-bac8a509e2.md) | 连接、辅助程序身份及传输生命周期 | `ctx.ssh` |
| [`fs-ssh`](readme.zh-8100976663.md) | 远端文件身份、读取及带保护的原子修改 | `ctx.fs` |
| [`subprocess-ssh`](readme.zh-b60e3f10bd.md) | 可执行文件查找、进程、控制流及终端 | `ctx.subprocess` |
| [`sandbox-ssh`](readme.zh-818f5d0bae.md) | 远端文件效果限制及执行信息 | `ctx.sandbox` |

<a id="related-documentation"></a>
## 相关文档

- [SSH 子系统](../subsystems/ssh.zh-75c8790040.md) — 共享执行坐标及传输归属。
- [POSIX SSH 决策](../history/2026-09-11-posix-ssh-runtime.zh-2b7549aff4.md) — 替代方案、影响及验证要求。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者工作上下文 — 点击展开</summary>

远端能力实现保留共享异步终端及取消接口。绝不能从远端路径字符串推断本地路径访问能力。

</details>
