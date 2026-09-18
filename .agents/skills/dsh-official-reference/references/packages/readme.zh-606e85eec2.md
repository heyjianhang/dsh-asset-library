> 自动同步的官方参考原文。来源：[packages/runtime-diagnostics/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "runtime-diagnostics 组地图：针对运行中组合的包自有运行时不变式检查，供浏览本组的用户与维护者参考。"
kind: "package-group"
---

# packages/runtime-diagnostics

[English](readme-439fa3150d.md) | 中文

## 概述

runtime-diagnostics 组为 DeepSeek Harness 组合提供运行时自检：一个包 `invariants` 在组合运行期间运行包自有检查，验证每个包的持久化事件与数据关系。违规会以归因到拥有该关系的包的错误呈现；全局开关与包名过滤器控制运行哪些检查。当组合需要在正常运行中验证自身运行时约定时，请使用本组的包。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`invariants`](readme.zh-cf7c101261.md) | 运行包自有运行时检查，并按所属包报告每次失败 | 注册到 `ctx.invariants` |

-----

<a id="related-documentation"></a>
## 相关文档

- [运行时不变式子系统](../subsystems/invariants.zh-37a0887ae7.md)——生成的服务参考：选择、installer 与配套入口约定。
- [不变式运行时约定 Agent Note](../history/2026-07-19-package-invariant-runtime-contracts.zh-80320f9d7a.md)——运行时不变式可以断言什么，以及强制配套入口接线的机械门禁。
- [包约定](agents-0c2589e647.md)——每个包都必须遵循的 `./invariant` 配套入口规则。

-----

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
