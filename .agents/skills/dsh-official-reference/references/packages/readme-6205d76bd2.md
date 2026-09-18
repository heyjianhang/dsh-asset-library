> 自动同步的官方参考原文。来源：[packages/computer-use/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Computer-use capability packages for selecting and registering one desktop provider."
kind: "package-group"
---

# packages/computer-use

English | [中文](readme.zh-4e94b02bd7.md)

## Summary

Computer-use providers let models observe and operate a desktop. This group owns exclusive provider registration. Each provider owns its operations, tools, and platform requirements; the experimental Cua Driver providers live in the experimental group.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Choose one provider and mount the shared registration service.

| Package | Role | ctx key |
|---|---|---|
| [`computer-use`](readme-00b3c1edb5.md) | Exclusive named provider registration | `ctx.computerUse` |

<a id="related-documentation"></a>
## Related documentation

- [Computer use](../subsystems/computer-use-e036039168.md) — capability ownership and provider choices.
- [Experimental packages](readme-ceea8c28e8.md) — Cua Driver MCP and native providers.

<a id="dev-note"></a>
## Dev Note

None.
