> 自动同步的官方参考原文。来源：[packages/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the durable image attachment capability family: what you can do with image attachments, and where your images are stored."
kind: "package-group"
---

# attachment/ — durable attachment capability family

English | [中文](readme.zh-95c429b1f8.md)

## Summary

The `attachment/` group provides durable image attachments: attach images to prompts and commands, and the harness saves them on your machine, shows them again in conversation history, and sends them to the model in later turns. The shipped `dsh` composition enables this with no setup. The capability and its storage are split across two packages, described below. Stored images survive restarts and are never deleted automatically, and only raster image formats are supported.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

These two packages provide durable image attachments; each README describes what you can do with its part.

| Package | Role | ctx key |
|---|---|---|
| [`attachment/`](readme-506e19292b.md) | Image attachments for prompts and commands that persist and come back in history | `ctx.attachments` |
| [`attachment-local/`](readme-ca45cc0fee.md) | Stores your attached images on this machine below `DSH_HOME` | registers on `ctx.attachments` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the service contract, then the capability-seam table and the configuration surface of the local backend.

- [Attachment subsystem reference](../subsystems/attachment-bd162ad2ea.md) — service contract, payload types, and the `ctx.attachments` Cordis surface.
- [Capability seams](../architecture/capability-seams-0f7ddb1eb9.md) — the Service Definition / Service Provider / Consumer split this family follows.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-attachment-local) — every accepted field of the local backend.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
