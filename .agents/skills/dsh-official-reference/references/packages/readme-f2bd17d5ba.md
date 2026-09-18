> 自动同步的官方参考原文。来源：[packages/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The lsp group map: language-server code navigation through the LSP seam, its stdio provider, and the model-facing lsp tool, for users and maintainers navigating the group."
kind: "package-group"
---

# lsp/ — Language-server code navigation

English | [中文](readme.zh-d819ce4515.md)

## Summary

The lsp group lets agents navigate code through configured language servers: go to definitions, find references and implementations, and read hover documentation. Use `lsp-stdio` to connect local stdio language-server commands and extension mappings, and `tool-lsp` to make those operations available to the model. The shared `lsp` package keeps provider choice and normalized results consistent, so changing servers does not change model requests. Deployments must supply and configure their language servers; this group ships none.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`lsp/`](readme-c534465a33.md) | Defines the code-navigation service: provider selection by file extension, four normalized read-only operations, and structured errors | `ctx.lsp` |
| [`lsp-stdio/`](readme-ba2991ec09.md) | Drives configured stdio language-server commands as providers over `ctx.fs` and `ctx.subprocess` | registers on `ctx.lsp` |
| [`tool-lsp/`](readme-e0bf37a505.md) | Exposes precise code navigation to the model through the `lsp` tool | registers on `ctx.tools` |

Providers register capabilities, not tools: `tool-lsp` is the only owner of the model-facing name, schema, prompt guidance, and presentation, so swapping a provider never changes how the model asks for navigation.

-----

<a id="related-documentation"></a>
## Related documentation

- [LSP navigation subsystem](../subsystems/lsp-f4bb090a5e.md) — operations, coordinates, requests and results, and `LspError` codes.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-lsp) — the `lsp` schema the model receives.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
