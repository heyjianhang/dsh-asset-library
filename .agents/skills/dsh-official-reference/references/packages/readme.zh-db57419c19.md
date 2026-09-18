> 自动同步的官方参考原文。来源：[packages/util/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "共享工具家族的包映射：原子文件写入、品牌化 id、双端队列、JSON 值、harness 主目录路径、启动环境、原生命令、输出保留、时区与超时。"
kind: "package-group"
---

# util/：共享工具

[English](readme-c24fab808a.md) | 中文

## 概述

`util/` 组为能力包提供共享的机制原语，避免重复实现。它涵盖原子写入、品牌化 id、双端队列、无损 JSON 值、UUID、Harness home 路径、启动环境、出站代理策略、原生命令、输出保留、时区规范化和超时处理。这里的每个根入口都是库：它不注册产品服务或事件，业务语义仍由消费它的能力负责。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

每个包提供一个原语；打开对应包页面了解如何使用。

| 包 | 职责 |
|---|---|
| [`brand/`](readme.zh-1f5d47d872.md) | 提供名义字符串类型及其无状态构造函数 |
| [`package-manifest/`](readme.zh-33e1184d2e.md) | 包 manifest（元数据清单）的共享 TypeScript 声明 |
| [`crypto/`](readme.zh-7bee8cf6bc.md) | 基于跨运行时 `crypto.getRandomValues` 原语生成 RFC 9562 v4 UUID |
| [`deque/`](readme.zh-02e06fdc29.md) | 提供摊销常数时间的队列操作和有界空闲存储 |
| [`chunked-list/`](readme.zh-7fbe0d2c63.md) | 通过有界追加复制和检查点校验保留不可变列表版本 |
| [`values/`](readme.zh-28167d9ba5.md) | 校验、创建快照、比较和冻结无损 JSON 兼容值 |
| [`home-paths/`](readme.zh-829870fe76.md) | 解析统一的 Harness 主目录并拼接共享的用户数据路径 |
| [`http-proxy/`](readme.zh-dfbdb24a86.md) | 解析出唯一的出站代理策略，并为 `fetch`、SDK agent（智能体）与 spawn 的子进程安装它 |
| [`launch-environment/`](readme.zh-449e7c4654.md) | 冻结的启动环境，记住每个值来自哪一层 |
| [`atomic-write/`](readme.zh-24e4831ecc.md) | 原子文件替换与跨进程写锁 |
| [`lazy-require/`](readme.zh-3fb6ff45e0.md) | 在首次使用时按调用方位置加载兼容 CommonJS 的 Host 依赖 |
| [`native-command/`](readme.zh-d2685769ac.md) | 直接运行宿主原生命令，绝不拼 shell 字符串 |
| [`workspace-path/`](readme.zh-2f7869351b.md) | 提供浏览器安全的 Workspace 路径与显示辅助函数 |
| [`output-retention/`](readme.zh-47621f426f.md) | 限制面向模型的输出并报告精确的省略元数据 |
| [`time/`](readme.zh-dfea3072a4.md) | 校验并规范化调用方所报的 IANA 时区 |
| [`timeout/`](readme.zh-c4ac54f4e4.md) | 截止时间运算、信号融合与超时和取消分类 |

-----

<a id="related-documentation"></a>
## 相关文档

- [根包映射](readme.zh-4e1114dc44.md)——`util/` 在所有包组中的位置。
- [生成配置目录](../architecture/config-catalog.zh-a03f895d4f.md)——本组所属的库包索引。
- [添加包实操手册](../practice/adding-a-package.zh-3816991694.md)——新的共享原语如何落入本组。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
