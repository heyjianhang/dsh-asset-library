> 自动同步的官方参考原文。来源：[packages/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the SDK family: JSON-RPC protocol plus the TypeScript client and server used by out-of-process SDKs."
kind: "package-group"
---

# sdk/ — drive a Harness runtime from another process

English | [中文](readme.zh-4e9f74f55b.md)

## Summary

The SDK family lets another process drive a complete DeepSeek Harness runtime over newline-delimited JSON-RPC. Its protocol package defines the public messages, the TypeScript client launches `dsh` with a named profile and ordered patches, and the server accepts SDK requests over stdio. Clients can open sessions, send prompts, and observe session events, agent status changes, and subagent completions. The TypeScript client and [Python SDK](../platform/readme-217ed82f87.md) use the same protocol, and these packages do not create developer projects or define another application.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Each package README describes what you can do with its part of the stack.

| Package | Role |
|---|---|
| [`protocol/`](readme-9bdce9b724.md) | Wire protocol: the newline-delimited JSON-RPC transport and the named request, result, and notification types |
| [`client/`](readme-c44c6f15e0.md) | TypeScript client that spawns a runtime subprocess and drives agent turns through the high-level and protocol-level APIs |
| [`server/`](readme-d1f9dac720.md) | `jsonrpc` plugin that serves out-of-process SDK clients over stdio |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the Python SDK (the sibling implementation of the client contract), then the runnable application and the decision records behind the group's boundary.

- [Python SDK](../platform/readme-217ed82f87.md) — the Python counterpart that speaks the same protocol and ships a bundled runtime.
- [SDK application bundle](readme-c399561002.md) — the `dsh --profile sdk` application that boots the JSON-RPC server.
- [Architecture](../architecture/architecture-140eef3ba4.md) — why the packaged Python client launches the same named profiles.
- [SDK project toolchain removal](../history/2026-08-11-remove-sdk-project-toolchain-c1ce0e2e3d.md) — why this group never creates, configures, or builds developer projects.
- [SDK subagent provider](readme-8c07cbc784.md) — a harness-internal consumer of the TypeScript client.

<a id="dev-note"></a>
## Dev Note

None.
