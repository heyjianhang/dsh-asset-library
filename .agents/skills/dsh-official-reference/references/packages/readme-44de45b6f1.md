> 自动同步的官方参考原文。来源：[packages/browser-use/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Browser-use capability packages for selecting and registering one browser backend."
kind: "package-group"
---

# packages/browser-use

English | [中文](readme.zh-edbd1cf803.md)

## Summary

Browser-use providers let models inspect and operate web pages. This group owns exclusive provider registration. Experimental providers supply browser tools and manage each Session's browser resources.

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
| [`browser-use`](readme-2549842f5d.md) | Exclusive named provider registration | `ctx.browserUse` |

<a id="related-documentation"></a>
## Related documentation

- [Browser use](../subsystems/browser-use-a714a20501.md) — capability ownership and provider choices.
- [Experimental packages](readme-ceea8c28e8.md) — Playwright MCP, Chrome DevTools MCP, and Stagehand providers.

<a id="dev-note"></a>
## Dev Note

None.
