> 自动同步的官方参考原文。来源：[docs/subsystems/computer-use.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/computer-use.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Computer use

English | [中文](computer-use.zh-417e889685.md)

Computer use lets a model observe and operate the local desktop through a configured provider. The shared DSH capability is called **computer use**; **Cua Driver** names the upstream implementation.

## Choose a provider

Mount [`dsh-computer-use`](../packages/readme-00b3c1edb5.md) and one provider in the same composition. Both Cua Driver providers are experimental public npm packages and require explicit activation.

| Provider | Runtime |
|---|---|
| [Cua Driver MCP](../packages/readme-36273a0e44.md) | An already installed `cua-driver` executable connected through MCP |
| [Cua Driver native](../packages/readme-4efdd6e819.md) | The platform-native runtime installed with the npm dependency |

Each provider supplies its upstream tool catalog. The shared service registers only a name and rejects any second provider, including another instance with the same name. It has no common desktop-operation methods or model-controlled selector.

## Lifetime and desktop sharing

A provider retains its registration while it shuts down its tools and owned resources. Startup failure releases the attempted registration. The MCP provider keeps its registration during reconnects.

One registered provider does not reserve a desktop for a Session. Callers coordinate complete observe, act, and verify workflows across Sessions and separate DSH processes. A cancelled call cannot undo input that the desktop already received.

## Results and platform requirements

Tools use the normal execution pipeline and Session log. Image-capable model routes with an attachment store receive durable screenshots; unsupported image routes receive the existing MCP image diagnostic. Provider READMEs own installation, permission, and platform limitations.

The [decision record](../history/2026-09-12-computer-use-provider-registration-dad6c442f7.md) explains the registration-only service and the two Cua Driver integrations.

<!-- BEGIN GENERATED cordis-surface (gen-cordis-catalog.ts) — do not edit between markers -->

<a id="cordis-surface"></a>

## Cordis API

Generated from source by `scripts/gen-cordis-catalog.ts` (verified fresh by `pnpm run verify-cordis-catalog` in doc-sync; regenerate with `pnpm run gen-cordis-catalog`) — the language sides differ only in locale-specific paired document paths. Signature blocks use a `ts cordis-catalog` fence and keep the original source JSDoc; dispatch modes are defined in the [primer](../framework/cordis-primer-97bbd7116e.md#dispatch-modes), and the framework-inherited `ctx` API lives in [cordis-api/inherited.md](../framework/inherited-0b67e20104.md).

<a id="ctxcomputeruse--computeruseregistry"></a>

### `ctx.computerUse` — `ComputerUseRegistry`

Owns one optional provider registration in the shared computer-use service.

```ts cordis-catalog
/**
 * Reserve the sole provider slot until the contribution is disposed.
 * A second registration fails even when it repeats the current name. Providers
 * must stop their tools and await owned work before releasing this registration.
 * @param name - provider-owned name used in registration diagnostics.
 * @returns the effect disposer for this exact registration.
 */
register(name: ComputerUseProviderName): () => Promise<void>
```

Source: [`packages/computer-use/computer-use/src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use/src/index.ts)
<!-- END GENERATED cordis-surface -->
