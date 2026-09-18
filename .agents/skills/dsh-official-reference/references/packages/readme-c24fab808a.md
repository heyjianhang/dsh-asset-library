> 自动同步的官方参考原文。来源：[packages/util/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for shared utilities: atomic file writes, branded ids, deques, JSON values, harness home paths, launch environment, native commands, output retention, time zones, and timeouts."
kind: "package-group"
---

# util/ — shared utilities

English | [中文](readme.zh-db57419c19.md)

## Summary

The `util/` group gives capability packages shared mechanical primitives instead of duplicate implementations. It covers atomic writes, branded ids, deques, lossless JSON values, UUIDs, Harness-home paths, launch environments, outbound proxy policy, native commands, output retention, time-zone canonicalization, and timeout handling. Every root entry here is a library: it registers no product service or event, and the consuming capability retains the business semantics.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Each package provides one primitive; open a package page for how to use it.

| Package | Role |
|---|---|
| [`brand/`](readme-01f4143893.md) | Nominal string types and their stateless constructor |
| [`package-manifest/`](readme-a13fa8ecf8.md) | Shared TypeScript declarations for package manifests |
| [`crypto/`](readme-878eb6c22f.md) | Mints RFC 9562 v4 UUIDs from the cross-runtime `crypto.getRandomValues` primitive |
| [`deque/`](readme-191ada2a74.md) | Provides amortized constant-time queue operations with bounded vacant storage |
| [`chunked-list/`](readme-d37ac9adc4.md) | Retains immutable list versions with bounded append copying and checkpoint validation |
| [`values/`](readme-41a57287cb.md) | Validates, snapshots, compares, and freezes lossless JSON-compatible values |
| [`home-paths/`](readme-f8b70534b7.md) | Resolves the single Harness home and joins shared user-data paths |
| [`http-proxy/`](readme-16aaf127c0.md) | Resolves one outbound proxy policy and installs it for `fetch`, SDK agents, and spawned children |
| [`launch-environment/`](readme-219b5dab49.md) | Frozen launch environment that remembers which layer supplied each value |
| [`atomic-write/`](readme-c3c05aef50.md) | Atomic file replacement and cross-process writer locking |
| [`lazy-require/`](readme-904cf40d5c.md) | Loads CommonJS-compatible Host dependencies on first use with caller-relative resolution |
| [`native-command/`](readme-fcbf1c487e.md) | Runs host-native commands directly, never through a shell string |
| [`workspace-path/`](readme-01444f8594.md) | Provides browser-safe Workspace path and display helpers |
| [`output-retention/`](readme-e496159a9e.md) | Bounds model-facing output and reports exact omission metadata |
| [`time/`](readme-21a9a15d33.md) | Validates and canonicalizes a caller-reported IANA time zone |
| [`timeout/`](readme-7f5854f283.md) | Deadline arithmetic, signal fusion, and timeout-versus-cancel classification |

-----

<a id="related-documentation"></a>
## Related documentation

- [Root package map](readme-1206c4b8d1.md) — where `util/` sits among all package groups.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md) — the library-package index this group forms part of.
- [Adding a package cookbook](../practice/adding-a-package-2680212440.md) — how a new shared primitive lands in this group.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
