> 自动同步的官方参考原文。来源：[packages/document/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/document/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for Host Office conversion and reusable PDF results."
kind: "package-group"
---

# document/ — Office conversion

English | [中文](readme.zh-543e8d6a27.md)

## Summary

Convert authorized Office files to reusable PDFs on the Host. The shared service converts through LibreOffice kit. Targets with a declared native engine use it; other targets use Node WASM.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Each package owns its configuration and lifetime rules; the subsystem reference describes their shared conversion operation.

| Package | Role | ctx key |
|---|---|---|
| [office-to-pdf](readme-a65daa80d5.md) | Authorized Office bytes to complete PDFs with bounded queues and caching | `ctx.officeToPdf` |

-----

<a id="related-documentation"></a>
## Related documentation

Consumers own source authorization and presentation.

- [Document conversion](../subsystems/office-to-pdf-317ee6b0d3.md) — shared operation and generated service reference.
- [Independent kit ownership](../history/2026-09-14-independent-libreoffice-kit-ed360c766c.md) — engine distribution and application integration.
- [Workspace Files](readme-bf56ed61c2.md) — authorized bounded source reads.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
