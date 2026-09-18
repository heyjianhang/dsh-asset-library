> 自动同步的官方参考原文。来源：[packages/identity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/identity/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The identity package group: anonymous, per-harness-home correlation ids shared by telemetry, feedback, and DeepSeek provider requests."
kind: "package-group"
---

# identity/ — shared identity

English | [中文](readme.zh-eb5733a9ca.md)

## Summary

The identity group provides one anonymous id per harness home that the installation's telemetry, feedback, and DeepSeek requests attach to their records, so everything leaving one home can be recognized as coming from the same installation without identifying the user. There is nothing to configure: the id appears automatically the first time one of those features runs and stays stable until its file is deleted. The group has one package; this page maps it, and the package README owns the details.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

<a id="packages"></a>
## Packages

| Package | Role |
|---|---|
| [`anonymous-user-id`](readme-1f7316c386.md) | Gives every harness home one anonymous id that telemetry, feedback, and DeepSeek requests attach to their records, so records from one installation can be recognized without identifying the user |

<a id="related-documentation"></a>
## Related documentation

- [Session telemetry subsystem](../subsystems/session-telemetry-15cbcab55b.md) — the telemetry feature that carries the id on exports.
- [dsh-llm-deepseek](readme-733e0ac01e.md) — the DeepSeek provider that carries the id on requests.
- [dsh-command-feedback](readme-baef84cd2e.md) — the feedback command that names the anonymous installation in its acknowledgement.

<a id="dev-note"></a>
## Dev Note

None.
