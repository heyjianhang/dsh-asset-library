> 自动同步的官方参考原文。来源：[packages/mcp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The MCP package group: connect external Model Context Protocol servers, call their tools, and read their resources."
kind: "package-group"
---

# MCP — Model Context Protocol

English | [中文](readme.zh-3d79e9c986.md)

## Summary

The `mcp/` group lets the model call external Model Context Protocol (MCP) tools and read server resources. Configure only `mcp-client` entries; shipped profiles already mount `mcp-resources` once. MCP tools and prompt text appear only for callers with a configured server in scope. Connections also supply server instructions. Package READMEs own configuration and limitations.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

The client owns each configured connection; the shared resource package supplies resource tools across those connections.

| Package | What it provides |
|---|---|
| [`mcp-client/`](readme-5818767e82.md) | Connect one MCP server, expose its tools and instructions, and provide its resource operations |
| [`mcp-resources/`](readme-b8415119b9.md) | Discover and read resources through shared tools with explicit server selection |

-----

<a id="related-documentation"></a>
## Related documentation

Try the worked example configurations to see the plugin in action, then read the Agent Note for the behavior decisions behind it.

- [MCP client plugin Agent Note](../history/2026-07-07-mcp-client-plugin-f2a07ce236.md) — the bridge's design: server-qualified naming, discovery, execution, and environment scrubbing.
- [Resources and instructions Agent Note](../history/2026-09-12-mcp-resources-and-instructions-df236edff4.md) — on-demand resource access and scoped server guidance.
- [Third-party memory MCP guide](../architecture/mcp-memory-35b77a83db.md) — runnable overlay rows and setup instructions.
- [Tools subsystem reference](../subsystems/tools-82b9070d05.md) — the `ToolRuntime` that receives the registered tools.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
