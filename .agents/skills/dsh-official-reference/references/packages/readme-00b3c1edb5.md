> 自动同步的官方参考原文。来源：[packages/computer-use/computer-use/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Computer-use provider registration for deployments that enable one desktop driver at a time."
kind: "package-reference"
---

# @deepseek-ai/dsh-computer-use

English | [中文](readme.zh-0f0ca7c54f.md)

## Summary

A deployment can enable one computer-use provider at a time. Loading another provider fails with the registered provider name. Each provider supplies its own tools and desktop operations. This package adds no model-visible tools and does not coordinate concurrent Sessions.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Mount the service once beside the chosen provider in a Cordis composition:

```yaml
- name: '@deepseek-ai/dsh-computer-use'
```

The service has no configuration. Provider plugins inject `computerUse` and call `ctx.computerUse.register(ComputerUseProviderName(name))`; the brand is exported from `@deepseek-ai/dsh-computer-use/brand`. The returned effect disposer releases that registration.

Providers stop admitting tool calls, close their resources, and await owned work before releasing the registration. `ctx.computerUse.providerName` reports the registered name until release.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

One private name owns the slot. Cordis effects remove contributions when their plugin unloads; a repeated disposer cannot remove a later registration. The [source](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use/src/index.ts) contains no driver object, operation interface, or provider selector.

No runtime invariant companion is published: the registry has one authoritative field and exposes no independently maintained observation that can diverge. Duplicate rejection and plugin disposal are covered by the owning tests.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

- [Computer use](../subsystems/computer-use-e036039168.md) — provider selection and shared-desktop limits.
- [Cua Driver MCP provider](readme-36273a0e44.md) — use an installed driver.
- [Cua Driver native provider](readme-4efdd6e819.md) — use the npm runtime.

-----

<a id="model-experience"></a>
## Model Experience

None, as this registry only records provider names.

#### KV Cache effect

Registration does not alter model requests. Provider-owned tools and guidance determine their own request-prefix effects.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

The service limits registrations within its Cordis service instance.

- **Shared desktop** — concurrent Sessions and separate DSH processes can operate the same desktop; callers coordinate whole computer-use workflows.
- **Provider selection** — configuration selects the provider; the model cannot switch registered drivers at runtime.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
