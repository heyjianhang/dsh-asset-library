> 自动同步的官方参考原文。来源：[packages/bundle/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Ready-made dsh profile bundles for the shared core, browser GUI, one-shot task, ACP, and SDK application surfaces."
kind: "package-group"
---

# bundle/ — profile plugin bundles

English | [中文](readme.zh-945d4d5766.md)

## Summary

This group maps the installable patch layers used by `dsh --profile`. Each package declares `dsh.bundle.patch`; the launcher stacks those patch documents to assemble a named profile. The `web`, `headless`, `acp`, and `sdk` profiles build on `dsh-base`, while `sdk-minimal` supplies its complete tree in one bundle. Domain packages can declare additional layers outside this directory.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`base`](readme-4bfcd706bd.md) | Shared core for base-backed profiles | — (patch only) |
| [`acp-app`](readme-f57655e557.md) | Automation-only ACP stdio application over base | mounts the ACP bridge |
| [`web-app`](readme-f82baa3855.md) | Browser application layer over base | mounts Web rows |
| [`headless`](readme-a22115ce3e.md) | One-shot command-line task application over base | `headless-runner` |
| [`sdk-app`](readme-c399561002.md) | SDK JSON-RPC stdio application over base | mounts the SDK server |
| [`sdk-minimal`](readme-c7f65198a8.md) | Standalone minimal SDK application without base or Web | — (complete patch tree) |

In-box bundles resolve from the dsh installation; out-of-tree bundles install into a profile through `dsh plugin --profile <name> add <package>`.

<a id="related-documentation"></a>
## Related documentation

- [dsh app](../platform/readme-814f330f4d.md) — the `dsh` command that starts a profile.
- [app-boot](readme-166cdf0b7a.md) — how profiles are resolved, layered, and customized.
- [Profile plugin bundles note](../history/2026-08-05-profile-plugin-bundles-9cb0eb3b82.md) — the profile and bundle composition design.
- [Generated composition graph](../platform/composition-02b48d34d0.md) — the exact composition each shipped profile uses.

<a id="dev-note"></a>
## Dev Note

None.
