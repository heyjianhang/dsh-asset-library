> 自动同步的官方参考原文。来源：[packages/runtime-diagnostics/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The runtime-diagnostics group map: package-owned runtime invariant checks for live compositions, for users and maintainers navigating the group."
kind: "package-group"
---

# packages/runtime-diagnostics

English | [中文](readme.zh-606e85eec2.md)

## Summary

The runtime-diagnostics group provides runtime self-checking for DeepSeek Harness compositions: one package, `invariants`, runs package-owned checks that verify each package's durable event and data relationships while the composition is live. A violation surfaces as an error attributed to the package that owns the relationship; a global switch and package-name filters control which checks run. Use this group's package when a composition should verify its own runtime contracts as part of normal operation.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`invariants`](readme-37c416d09a.md) | Runs package-owned runtime checks and reports each failure by owning package | registers on `ctx.invariants` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Runtime invariants subsystem](../subsystems/invariants-1d2c2ceb81.md) — the generated service reference: selection, installer, and companion contract.
- [Invariant runtime contracts Agent Note](../history/2026-07-19-package-invariant-runtime-contracts-dc5434ed84.md) — what a runtime invariant may assert and the mechanical gate enforcing companion wiring.
- [Package conventions](agents-0c2589e647.md) — the `./invariant` companion rule every package follows.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
