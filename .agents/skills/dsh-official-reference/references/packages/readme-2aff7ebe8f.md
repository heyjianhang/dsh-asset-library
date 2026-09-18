> 自动同步的官方参考原文。来源：[packages/settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the user-settings capability family: the ctx.settings service that resolves per-namespace configuration, and the YAML/JSON file provider that stores it."
kind: "package-group"
---

# settings/ — user-editable configuration

English | [中文](readme.zh-a4388a720c.md)

## Summary

The `settings/` group makes plugin configuration user-editable: a plugin registers a named namespace with a schema, and users override values in one document without touching `cordis.yml`. User overrides win over the deployment's own configuration and schema defaults, and changes apply live. Two packages cover the capability: `settings/` provides the settings service, and `settings-file/` stores every namespace in one YAML or JSON document users can edit. Settings are optional: without a provider mounted, configuration stays exactly as composed.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Two packages cover the capability; each child README owns the full contract, and the subsystem reference owns the exhaustive service surface.

| Package | Role | ctx key |
|---|---|---|
| [`settings/`](readme-28447ff3e0.md) | Settings service: register namespaces and read or change their values | `ctx.settings` |
| [`settings-file/`](readme-75895d3830.md) | Stores settings in one local YAML/JSON file and publishes external edits live | registers `ctx.settings` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then the capability-seam split this family follows.

- [Settings subsystem reference](../client/settings-c9b20555da.md) — namespaces, layered resolution, descriptors, change commits, and the generated Cordis surface.
- [Capability seams](../architecture/capability-seams-0f7ddb1eb9.md) — the Service Definition / Service Provider / Consumer split this family follows.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
