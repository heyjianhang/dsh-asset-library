> 自动同步的官方参考原文。来源：[packages/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The filesystem package group: the ctx.fs provider contract, local and sandbox-enforcing backends, the read-before-edit policy plugin, and the model-facing file and search tools."
kind: "package-group"
---

# packages/fs

English | [中文](readme.zh-02e3ae039f.md)

## Summary

The `fs/` group gives agents durable, policy-governed access to files: the `ctx.fs` service contract in `fs/`, the host-filesystem and sandbox-enforcing backends in `fs-local/` and `fs-sandbox/`, the read-before-edit policy in `fs-observation-policy/`, and the model-facing tools in `tool-fs/` (`read`, `read_image`, `write`, `edit`) and `tool-fs-search/` (`glob`, `grep`). A deployment mounts one backend, loads the policy for freshness-guarded mutations, and registers the tool packages the model should see; backends swap without touching the tools or the policy. File I/O takes no timeout by design: a deadline would kill work the OS still finishes, so cancellation is a best-effort signal at syscall boundaries.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Seven packages play the filesystem roles; the subsystem reference owns the exhaustive contracts and the error taxonomy.

| Package | Role | ctx key |
|---|---|---|
| [`fs/`](readme-3e4bcf63c8.md) | `ctx.fs` service contract: execution-world paths, bounded text I/O, and atomic mutations with an optional version guard | `ctx.fs` |
| [`fs-local/`](readme-db9fcb7085.md) | Host-filesystem backend: reads, writes, and edits real files on the local machine | registers on `ctx.fs` |
| [`fs-sandbox/`](readme-2fa020ff96.md) | Sandbox-enforcing backend: fences writes and edits by the per-call sandbox mode while reads pass through | registers on `ctx.fs` |
| [`fs-observation-policy/`](readme-0e12a2c30b.md) | Read-before-edit policy: records observed presence or absence and guards write/edit through the `fs/*` events | `fs/*` listeners |
| [`tool-fs/`](readme-2bb5af70f4.md) | Model-facing `read`, `read_image`, `write`, and `edit` tools plus their executor | registers on `ctx.tools` |
| [`tool-fs-search/`](readme-a81e0019c2.md) | Model-facing `glob` and `grep` discovery tools backed by the packaged ripgrep binary | registers on `ctx.tools` |
| [`tool-str-replace-editor/`](readme-38d12e731d.md) | Standalone `str_replace_editor` tool: `view`, `create`, `str_replace`, and `insert` over `ctx.fs` | registers on `ctx.tools` |

The policy is a plugin, not a service the tools inject: removing it leaves the bare provider's unconditional mutation behavior instead of breaking the tools. The mode fence in `fs-sandbox` and the read-before-edit gate compose. `tool-fs-search` deliberately does not extend the provider contract — search is a process-backed ripgrep workflow, so filesystem backends stay free of a universal search API.

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary and error taxonomy, then the decisions that shaped the family.

- [Filesystem subsystem](../subsystems/filesystem-f8eb468655.md) — targets, outcomes, guards, policy events, and the error taxonomy.
- [Cross-family fs sandbox decision](../history/2026-07-14-cross-family-fs-sandbox-a79850339a.md) — the shared sandbox mode fence over the filesystem seam.
- [Portable execution world consumers decision](../history/2026-07-28-portable-execution-world-consumers-f99e5ef1ac.md) — why filesystem and subprocess providers share one execution world.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
