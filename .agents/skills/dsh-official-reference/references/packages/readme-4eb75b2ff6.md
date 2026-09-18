> 自动同步的官方参考原文。来源：[packages/typert/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The Typert group map: the build-time type-graph generator, runtime registry, Loader integration, and shared Remote protocol that enable typed Host-to-Client calls."
kind: "package-group"
---

# packages/typert

English | [中文](readme.zh-7911063925.md)

## Summary

With the Typert group, Client environments can call Host capabilities as typed methods and share generated schemas and reflection without hand-written wire code. A build-time generator turns source type declarations into compiler-independent models and runtime artifacts, a runtime registry stores those artifacts, and a Loader integration registers them automatically in Loader compositions. A shared protocol package supplies the Remote-call declarations — decorators, wire descriptors, codecs, and provider contracts — that business packages, generated artifacts, the Host Gateway, and the Client API all consume. This page maps the four packages; each package README owns its configuration, usage, and limits.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`generator/`](readme-83225a1389.md) | Analyzes source types at build time and generates the reflection, schemas, and Remote descriptors that runtimes load | — |
| [`loader/`](readme-b8f50f08b3.md) | Auto-registers generated Typert artifacts from Loader compositions into the runtime registry | consumes `ctx.loader` and `ctx.typert` |
| [`protocol/`](readme-f0ba01d3e2.md) | Declares the Remote decorators, wire descriptors, codecs, and provider contracts shared by Host and Client | — |
| [`registry/`](readme-8c8a875888.md) | Stores generated package reflection and live Zod schemas at runtime, plus lookup and Context provider registries | `ctx.typert` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Typert subsystem reference](../subsystems/typert-15ff52e11b.md) — the literal public contracts recorded from protocol and registry types.
- [API Gateway reference](../architecture/api-gateway-6ccd3a260a.md) — how the generated Remote descriptors become running Host-to-Client calls.
- [Remote-call Agent Note](../history/2026-08-02-typert-remote-method-calls-4c1c6daabb.md) — the architecture and transport decisions behind Remote calls.
- [Package workspace map](readme-1206c4b8d1.md) — every group in the workspace and what each owns.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
