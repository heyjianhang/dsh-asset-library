> 自动同步的官方参考原文。来源：[packages/compaction/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the conversation-condensing feature family: automatic compaction, the on-demand /compact command, and tool-output trimming."
kind: "package-group"
---

# compaction/ — compaction capability family

English | [中文](readme.zh-79f694283b.md)

## Summary

The `compaction/` group keeps long agent conversations working near the model's context limit: older history is condensed into a summary automatically as token pressure builds, on demand with `/compact`, oversized tool outputs can be trimmed first so there is less to condense, and images an image-capable route can no longer send are replaced with placeholders. The shipped `dsh` base enables the feature by default — mount the packages explicitly to tune when and how condensation happens. The token measurement that decides when to condense lives in a separate LLM-family service.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Each package below provides one piece of the feature; open a package page for how to use it.

| Package | Role | ctx key |
|---|---|---|
| [`compaction/`](readme-8ef4f24307.md) | The shared condensation contract: the operations and summary format every backend and trigger use | `ctx.compaction` |
| [`compaction-basic/`](readme-6723ef805a.md) | Automatic condensation of older history into a summary as token pressure builds | registers `ctx.compaction` |
| [`compaction-tool-result-pruner/`](readme-9066c5848f.md) | Trims oversized tool outputs so less history needs condensing | `ctx.toolResultPruner` |
| [`compaction-image-offload/`](readme-c17e192ff6.md) | Replaces over-budget request images with placeholders when an image-capable route rejects a request | listens to `agent/request-error` |
| [`command-compact/`](readme-26e9cf6dd8.md) | The `/compact` command to condense history on demand | registers on `ctx.commands` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then read the two Agent Notes for the design rationale.

- [Compaction subsystem reference](../subsystems/compaction-6cf647eebd.md) — the condensation vocabulary, results, and service behavior.
- [Compaction capability-seam Agent Note](../history/2026-06-18-compaction-capability-seam-376b45428a.md) — how the family is split and why it depends on session and LLM vocabulary.
- [Queued manual compaction Agent Note](../history/2026-07-30-queued-manual-compaction-511245a0ca.md) — how on-demand `/compact` serializes against running turns.
- [Capability seams](../history/2026-06-13-capability-seams-090260d55b.md) — the Service Definition / Service Provider / Consumer split this family follows.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
