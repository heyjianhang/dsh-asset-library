> 自动同步的官方参考原文。来源：[packages/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the credential capability family: the credential-reference seam, the environment-and-file provider, the authorization flow registry, and how references keep secret values out of configuration."
kind: "package-group"
---

# credentials/ — credentials and authorization

English | [中文](readme.zh-c48c081d5c.md)

## Summary

The `credentials/` group lets configuration name secrets instead of embedding their values. Use `credentials/` to store, look up, and remove credentials, `credentials-local/` for private on-machine storage with per-run environment overrides, and `authorization/` when obtaining a credential requires asking a human. Rotated stored values apply to the next model request, while `DEEPSEEK_API_KEY=… dsh` takes precedence for that run. Configuration files contain only credential names; local secret values remain readable only by the same OS user.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Three packages provide the credential feature: one stores, looks up, and removes secrets at runtime while configuration only names them; the second is the default on-machine store; the third lets plugins obtain credentials that have to be asked for. Their READMEs cover day-to-day use; the subsystem reference owns the exhaustive contracts.

| Package | Role | ctx key |
|---|---|---|
| [`credentials/`](readme-fdf97ab410.md) | Store, look up, and remove secrets at runtime while configuration only names them | `ctx.credentials` |
| [`credentials-local/`](readme-62b6bb9f4a.md) | The default on-machine store: a private YAML file, environment overrides win | registers `ctx.credentials` |
| [`authorization/`](readme-316664fc70.md) | Plugin-owned flows that obtain a credential by asking a human | `ctx.authorization` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then the capability-seam table and the configuration surface of the local store.

- [Credentials subsystem reference](../subsystems/credentials-2173dd41d7.md) — `CredentialRef` and `CredentialKey`, per-operation resolution, UI-safe `CredentialInfo`, authorization flows, and the generated Cordis surface.
- [Capability seams](../architecture/capability-seams-0f7ddb1eb9.md) — the Service Definition / Service Provider / Consumer split this family follows.
- [Generated configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-credentials-local) — every accepted field of the local store.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
