> 自动同步的官方参考原文。来源：[packages/experimental/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The experimental group map: publicly installable pre-stable prototypes."
kind: "package-group"
---

# packages/experimental

English | [中文](readme.zh-e943e54f17.md)

## Summary

The experimental group contains prototype capabilities whose contracts can change and carry no support promise. All current packages publish under their `@deepseek-ai/dsh-experimental-*` names, including the opt-in Agent Teams composition, Auto review, Cua Driver providers, browser-use backends, cross-realm Inspector, CPython PTC backend, and browser-worker preview libraries. Released products outside this group must not depend on experimental packages.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`agent-team-profile`](readme-ec0315791b.md) | Published opt-in profile layer for Agent Teams | — |
| [`agent-team`](readme-57b2e1d72c.md) | Named teammates with durable messages and a shared task board | `ctx.agentTeams` |
| [`agent-team-web-profile`](readme-9458d90f3a.md) | Published opt-in Web layer for Agent Teams | — |
| [`client-ui-agent-team`](readme-fa2a682f71.md) | Team roster, task board, and teammate navigation for Web | — |
| [`auto-review`](readme-c6de0c1fec.md) | Explicit Web layer for same-model review before each native or PTC inner tool call | — |
| [`ptc-runtime-python`](readme-187ec34aef.md) | CPython subprocess backend for the PTC execution seam | `ctx.ptcRuntime` |
| [`computer-use-cua-driver-mcp`](readme-36273a0e44.md) | Use an installed Cua Driver through MCP | `ctx.computerUse` |
| [`computer-use-cua-driver-native`](readme-4efdd6e819.md) | Embed the Cua Driver native npm runtime | `ctx.computerUse` |
| [`browser-use-playwright-mcp`](readme-1c7b7aa7ba.md) | Playwright browser tools over MCP | `ctx.browserUse` |
| [`browser-use-chrome-devtools-mcp`](readme-65b3c141ad.md) | Chrome DevTools inspection and browser control over MCP | `ctx.browserUse` |
| [`browser-use-stagehand-native`](readme-f20e8cc23a.md) | Stagehand browser operations with explicitly configured native models | `ctx.browserUse` |
| [`browser-use-runtime`](readme-67b5a9a87b.md) | Session-owned browser resources shared by experimental providers | — |
| [`inspector`](readme-4ddf76ff4b.md) | Cross-realm CDP hub for Host debugging, Client Runtime inspection, network capture, and Cordis trees | `ctx.inspector` |
| [`tool-agent-team`](readme-c99a3ade05.md) | Nine tools that let the model create, message, and coordinate teammates | registers scoped tools on `ctx.tools` |
| [`webworker-packer`](readme-52f96b60b8.md) | Builds the gzip-compressed VFS image consumed by the browser worker preview | library and CLI — no ctx key |
| [`webworker-runtime`](readme-ae8dd426c6.md) | Runs the harness plugin tree inside a dedicated browser worker | library and worker entry — no ctx key |

-----

<a id="related-documentation"></a>
## Related documentation

- [Experimental publication decision](../history/2026-09-12-experimental-publication-denylist-2fb41b1a91.md) — public defaults and private exceptions.
- [Computer use](../subsystems/computer-use-e036039168.md) — desktop provider choices.
- [Browser use](../subsystems/browser-use-a714a20501.md) — browser provider choices and Session ownership.
- [Agent Teams subsystem](../subsystems/agent-team-97b7ef8c7a.md) — durable Team types and the `ctx.agentTeams` service API.
- [Experimental subtree rules](agents-e73ec70ed5.md) — what experimental status does and does not relax.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
