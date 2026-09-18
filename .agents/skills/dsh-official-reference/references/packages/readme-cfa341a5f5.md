> 自动同步的官方参考原文。来源：[packages/ssh/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The POSIX SSH provider family: shared connection, remote filesystem, managed subprocesses and file-effect sandbox."
kind: "package-group"
---

# ssh/ — POSIX remote execution providers

English | [中文](readme.zh-c613bc6e10.md)

## Summary

This family runs files, ordinary processes, terminals and sandbox enforcement on one POSIX SSH host while the Harness stays local. A shared OpenSSH connection and installed helper support the existing filesystem, subprocess and sandbox interfaces. Use it in headless or custom profiles whose consumers honor provider-owned paths.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

<a id="packages"></a>
## Packages

| Package | Responsibility | Service |
|---|---|---|
| [`ssh`](readme-ba820d9899.md) | Connection, helper identity and transport lifecycle | `ctx.ssh` |
| [`fs-ssh`](readme-edab840144.md) | Remote file identity, reads and guarded atomic mutations | `ctx.fs` |
| [`subprocess-ssh`](readme-ef1e70eed6.md) | Executable lookup, processes, control streams and terminals | `ctx.subprocess` |
| [`sandbox-ssh`](readme-099ccedaee.md) | Remote file-effect confinement and enforcement facts | `ctx.sandbox` |

<a id="related-documentation"></a>
## Related documentation

- [SSH subsystem](../subsystems/ssh-06a64b463f.md) — shared execution coordinates and transport ownership.
- [POSIX SSH decision](../history/2026-09-11-posix-ssh-runtime-8e8eb80e78.md) — alternatives, consequences and verification requirements.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

Remote capability implementations retain the shared asynchronous terminal and cancellation interfaces. Local path access must never be inferred from a remote path string.

</details>
