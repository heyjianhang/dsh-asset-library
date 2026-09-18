> 自动同步的官方参考原文。来源：[packages/boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The boot package group: how dsh app bins start — environment loading, profile and patch layers, clear startup failures, and app-owned command lines."
kind: "package-group"
---

# boot/ — shared app-bin boot glue

English | [中文](readme.zh-704d5162a7.md)

## Summary

The boot group launches profile applications and manages their installed composition. `app-boot` resolves configuration and starts the Loader, `cmdline` supplies application arguments, and `plugin-manager` exposes current-profile operations shared with the CLI. Each package README owns its details.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`app-boot`](readme-166cdf0b7a.md) | Boots a dsh app from a `cordis.yml`: loads `.env`, applies profile and patch layers, and reports startup failures clearly | (library for the bins) |
| [`cmdline`](readme-6d7658d5ba.md) | Lets the app own its flags, `--help`, and exit code; passes everything after the launcher's flags through verbatim | `cmdlineArgs`, `appExit` |
| [`hmr`](readme-932aa00d6e.md) | Coordinates module and configuration reloads with package mutations | `hmr` |
| [`plugin-manager`](readme-e0039118a8.md) | Manages current-profile plugins and bundle packages through shared CLI operations | `pluginManager` |

<a id="related-documentation"></a>
## Related documentation

- [dsh app](../platform/readme-814f330f4d.md) — the `dsh` bin that consumes these helpers for its boot sequence.
- [Profile bundles](readme-168d963b7d.md) — installable patch layers that `dsh --profile` compositions mount.
- [dsh-home-paths](readme-f8b70534b7.md) — the harness-home resolver both packages build on.
- [dsh-cmdline](readme-6d7658d5ba.md) — how an app owns its flag family instead of the launcher.

- [Profile management](../subsystems/boot-315056a4e7.md) — service methods and result records.

<a id="dev-note"></a>
## Dev Note

None.
