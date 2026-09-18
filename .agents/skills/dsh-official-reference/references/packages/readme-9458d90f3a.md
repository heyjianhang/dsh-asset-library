> 自动同步的官方参考原文。来源：[packages/experimental/agent-team-web-profile/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-web-profile/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Add the published experimental Agent Teams panel to a Web profile after the Host Team layer."
kind: "package-bundle"
---

# @deepseek-ai/dsh-experimental-agent-team-web-profile

English | [中文](readme.zh-ffbc6a5beb.md)

## Summary

`dsh-experimental-agent-team-web-profile` is the published experimental Web layer for [Agent Teams](readme-57b2e1d72c.md). Add it after `@deepseek-ai/dsh-web-app` and [`@deepseek-ai/dsh-experimental-agent-team-profile`](readme-ec0315791b.md) to show the Team roster, task board, and teammate navigation in the browser. Removing either experimental layer leaves the stable base and Web composition unchanged. The dsh installation ships it as an optional bundle that no shipped Web profile enables; switch it on from the Web sidebar's Plugins page after the Host layer.

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

### Install into a profile

Add the Host and Web Agent Teams layers to an initialized `web` profile in this order:

```sh
dsh plugin --profile web add @deepseek-ai/dsh-experimental-agent-team-profile
dsh plugin --profile web add @deepseek-ai/dsh-experimental-agent-team-web-profile
```

The first command supplies the Team domain, generated Remote methods, and model tools. The second command activates this package's declared patch and its browser presentation. Removing the package with `dsh plugin --profile web remove @deepseek-ai/dsh-experimental-agent-team-web-profile` removes the Web layer from the profile's ordered bundle list.

### What you get

The conversation header gains the Team roster, shared task board, and teammate navigation. [`@deepseek-ai/dsh-experimental-client-ui-agent-team`](readme-fa2a682f71.md) owns those browser interactions and mounts the generated Client Remote namespace used to reach the Host Team service.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

The package's runtime content is [`cordis.patch.yml`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-web-profile/cordis.patch.yml). Applied after `dsh-web-app` and the Host Agent Teams layer, its single `insert` entry adds the `ui-agent-team` row for `@deepseek-ai/dsh-experimental-client-ui-agent-team`. The inserted Client plugin owns the generated Remote assembly and Team UI; this static bundle holds no mutable state and installs no runtime invariant.

| File | Role |
|---|---|
| [`cordis.patch.yml`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-web-profile/cordis.patch.yml) | Ordered Web patch containing the `ui-agent-team` row |
| [`src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-web-profile/src/index.ts) | Empty module entry; the patch is the runtime content |
| — | No runtime invariant companion is published; the package carries only a static profile patch. The Remote assembly and Team UI own their activation requirements. |

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

- [Experimental packages](readme-ceea8c28e8.md) — incubation status and publication policy.
- [Agent Teams Host profile](readme-ec0315791b.md) — the required domain, Remote, and model-tool layer.
- [Agent Teams browser UI](readme-fa2a682f71.md) — roster, task-board, and teammate-navigation behavior.
- [Web bundle](readme-f82baa3855.md) — the stable browser layer this patch extends.

-----

<a id="model-experience"></a>
## Model Experience

Indirectly, through the Host-side Agent Teams profile selected alongside this Web layer.

#### KV Cache effect

This Web bundle adds no model request content; the Host-side Team tools own prompt, schema, and cache effects.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

- **Ordered composition** — `dsh-base`, `dsh-web-app`, `dsh-experimental-agent-team-profile`, and this package must remain in that order.
- **Preset-scoped legacy controls** — stable Web presets still mount continuable Subagent controls inside the preset scope. Top-level Host profile overrides do not replace those scoped registrations, so the Team roster and legacy child controls can both appear until Web has a Team-aware preset. The [Web Agent Teams decision](../history/2026-08-06-agent-teams-web-4a59c50169.md) records this deferred composition work.
- **Opt-in only** — the package ships with the installation switched off; no shipped Web profile enables either Agent Teams layer.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
