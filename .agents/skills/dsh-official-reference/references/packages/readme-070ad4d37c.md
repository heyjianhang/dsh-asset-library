> 自动同步的官方参考原文。来源：[packages/spill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the text spill capability family: what the storage service, the local backend, and the result policy each provide."
kind: "package-group"
---

# spill/ — text spill capability family

English | [中文](readme.zh-3e187c4b6f.md)

## Summary

The `spill/` group stores full text outside the model's context and returns a locator with retrieval guidance. The family splits into the storage service in `spill/`, the local filesystem backend in `spill-local/`, and the tool-result policy in `spill-policy/`. Tool-result spilling is opt-in through `maxInlineBytes` and keeps the original result on storage failure. [Session references](readme-f32aad6e82.md) also consume storage directly for truncated captured transcripts, with their own preview and failure notices; they do not require the tool-result policy.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Three packages play the spill roles; the subsystem reference owns the exhaustive vocabulary and contracts.

| Package | Role | ctx key |
|---|---|---|
| [`spill/`](readme-6422253133.md) | Storage service: saves oversized text and returns a locator plus retrieval guidance | `ctx.spillStore` |
| [`spill-local/`](readme-3d103d7c5b.md) | Saves spilled text to private session-scoped files on this machine | registers on `ctx.spillStore` |
| [`spill-policy/`](readme-8e4b3541dd.md) | Replaces oversized plain-text tool results with a preview and locator | listens on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then the design decision.

- [Spill subsystem](../subsystems/spill-9a4df6b238.md) — the `SaveTextSpill`/`SpillRef` vocabulary, ownership, and backend relationships.
- [Tool output spill decision](../history/2026-07-08-tool-output-spill-files-9cf1d9a0d8.md) — the capability boundary between storage, retention, and tool-owned output handling.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
