> 自动同步的官方参考原文。来源：[docs/persistence-changes/releases/dsh-v0.1.2-alpha.3.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/persistence-changes/releases/dsh-v0.1.2-alpha.3.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Retrospective Session persistence types and adjacent-release changes for dsh-v0.1.2-alpha.3."
kind: persistence-release
---

# Persistence release: dsh-v0.1.2-alpha.3

English | [中文](dsh-v0.1.2-alpha.3.zh-7703dda8bd.md)

## Summary

All reconstructed persistence root digests match the preceding alpha tag. The writer format remains 0.

## Table of Contents

- [Release evidence](#evidence)
- [Declaration](#declaration)
- [Structural changes](#changes)
- [Verification](#verification)
- [Dev Note](#dev-note)

-----

<a id="evidence"></a>
## Release evidence

This approximate backfill supports reading and format validation; it is not a contemporaneous compatibility acknowledgement. See the [archive reference](readme-70f184696b.md) for extraction and coverage limits.

| Item | Recorded value |
|---|---|
| Source tag | `dsh-v0.1.2-alpha.3` |
| Source date | 2026-08-31T15:53:17.000Z |
| Release record | Release object present. |
| Previous release | [dsh-v0.1.2-alpha.2](dsh-v0.1.2-alpha.2-340c8decff.md) |
| Session writer version | 0 |
| Reconstructed inventory | <!-- persistence-release-inventory:start -->54 roots / 417 types<!-- persistence-release-inventory:end --> |
| This snapshot | [dsh-v0.1.2-alpha.3.schema.json](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/persistence-changes/releases/dsh-v0.1.2-alpha.3.schema.json) |

Source evidence for the writer version constant at this tag:

- `packages/core/session/src/types.ts`: `export const SESSION_FORMAT_VERSION = 0`

<a id="declaration"></a>
## Declaration

```yaml persistence-release
schemaVersion: 1
tag: dsh-v0.1.2-alpha.3
previous: dsh-v0.1.2-alpha.2
sessionFormatVersion: 0
changes: []
```

<a id="changes"></a>
## Structural changes

<!-- persistence-release-changes:start -->

Normalized root types and their transitive digests are unchanged from the preceding tag.

<!-- persistence-release-changes:end -->

<a id="verification"></a>
## Verification

Extraction passed canonical-graph, root-digest, and reachable-type-digest validation, permitting the original optional `surfaceOp` only for historical surface events. The in-tree check reconstructs each tag from its predecessor and verifies before/after values, snapshot coverage, and bilingual machine declarations.

```sh
pnpm run verify-persistence-releases
```

<a id="dev-note"></a>
## Dev Note

None.
