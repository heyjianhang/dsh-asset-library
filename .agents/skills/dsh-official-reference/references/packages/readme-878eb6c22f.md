> 自动同步的官方参考原文。来源：[packages/util/crypto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/crypto/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Cross-runtime UUID generation for maintainers replacing secure-context-only crypto.randomUUID calls."
kind: "package-library"
---

# dsh-util-crypto

English | [中文](readme.zh-7bee8cf6bc.md)

## Summary

Zero-dependency browser-safe UUID and byte-encoding helpers. UUID minting uses `crypto.getRandomValues`, the one random primitive every shipped context provides. `crypto.randomUUID` is a secure-context Web API: a page or worker served over plain HTTP on a LAN address (the browser preview deployment) has no such method, so code that must run there cannot call it. The repository-wide `no-restricted-properties` lint rule points `crypto.randomUUID` callers here; Node-only code importing `randomUUID` from `node:crypto` stays as it is.

## Table of Contents

- [Use this package](#use-this-package)
- [API](#api)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

It is a **library, not a service or plugin**: no `ctx`, registers nothing, holds no state.

-----

<a id="api"></a>
## API

```ts
import { bytesToBase64, randomUUID, type Uuid } from '@deepseek-ai/dsh-util-crypto'
```

| Export | Role |
|---|---|
| `bytesToBase64(data)` | Canonical base64 for a byte array, encoded in bounded chunks. |
| `randomUUID()` | Random RFC 9562 v4 UUID string, minted from `crypto.getRandomValues`. Drop-in for `crypto.randomUUID()`. |
| `Uuid` | The five-group UUID string type, matching `crypto.randomUUID`'s declared return shape. |

<a id="model-experience"></a>
## Model Experience

Indirectly, through consumers that mint request, session, and attachment identifiers with it, none of which enter prompts as semantic content.

#### KV Cache effect

No direct invalidation; identifier-minting consumers own any request changes.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

- **v4 only** — no other UUID versions, namespaces, or parsing; consumers needing more should take a real UUID dependency.
- **Uniqueness is probabilistic** — 122 random bits, the same guarantee `crypto.randomUUID` gives; nothing here detects collisions.


<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>

**Runtime invariant:** No companion is published. This pure utility owns no event stream or mutable runtime data; its value algebra is enforced by unit tests.
