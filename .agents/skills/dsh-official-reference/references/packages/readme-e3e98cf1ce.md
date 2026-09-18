> 自动同步的官方参考原文。来源：[packages/extensions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Runtime API inspection, process-local runners, and historical Cordis cards."
kind: "package-group"
---

# packages/extensions

English | [中文](readme.zh-8209b2dad0.md)

## Summary

The extensions group provides read-only runtime API discovery for agents, process-local runners for programmatic and browser consumers, and historical generated-plugin cards. Creator mode installs persistent plugins through [Plugin Manager](readme-e0039118a8.md). Choose a child package for inspection, Host execution, Client execution, or browser controls.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`tool-cordis`](readme-5e15f91e17.md) | Two read-only tools for runtime API discovery | registers on `ctx.tools` |
| [`cordis-host-runner`](readme-b630ce312b.md) | Host half: definition registry, sandboxed host-half lifecycle, and the inspect registry that answers browser queries | provides `ctx.dynamicCordisRunner` and `ctx.cordisInspect` |
| [`cordis-client-runner`](readme-bc22b14b0f.md) | Browser half: evaluates a browser-half source into a live plugin and answers run requests | client face; provides browser `ctx.dynamicCordisRunner` |
| [`ui-cordis`](readme-3db1a7bf82.md) | Browser panel and historical lifecycle tool cards | client face; registers slots |

-----

<a id="related-documentation"></a>
## Related documentation

- [Extensions subsystem](../subsystems/extensions-13d4d2616c.md) — the generated `ctx.cordisInspect` and `ctx.dynamicCordisRunner` service API.
- [Generated tool catalog](../architecture/tool-catalog-6bf6f62b02.md#deepseek-aidsh-tool-cordis) — the two read-only tool schemas.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-cordis-host-runner) — the runner's accepted config fields.
- [Self-referential Cordis toolset Agent Note](../history/2026-07-08-self-referential-cordis-toolset-8b1a4526ab.md) — design home for sandbox semantics, lifecycle, and composition.
- [Client shells and dynamic packages Agent Note](../history/2026-08-15-client-shells-and-dynamic-packages-cafbd41fcd.md) — package placement and build faces for the client halves.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The two browser-half packages live in this group rather than under `packages/client/` because they are halves of this subsystem's dual-half packages; the client face compiles them through the client program, while the host program references only the host runner.

</details>
