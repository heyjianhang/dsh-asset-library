> 自动同步的官方参考原文。来源：[.agents/notes/implemented/process/2026-09-12-experimental-publication-denylist.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/process/2026-09-12-experimental-publication-denylist.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Publish experimental packages with explicit private exceptions

Status: implemented

English | [中文](2026-09-12-experimental-publication-denylist.zh-47b2d6805a.md)

## Problem

An allowlist for public experimental packages requires a policy edit whenever a new installable prototype joins the repository. Experimental status describes compatibility and support expectations, but internal-only prototypes still need an explicit publication exclusion.

## Decision

The local npm baseline publisher and the public dsh release family discover experimental packages by default. [`PRIVATE_EXPERIMENTAL_PACKAGE_DIRECTORIES`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/experimental-package-policy.ts) owns explicit private exclusions. The [complete experimental publication decision](2026-09-12-publish-all-experimental-packages-87418f24bd.md) leaves this denylist empty; all current experimental packages publish.

Every experimental directory outside the denylist is public by default. Workspace constraints require public packages to omit `private` and set `publishConfig.access: public`; all experimental packages retain the `@deepseek-ai/dsh-experimental-*` npm prefix. Adding a private prototype requires a denylist entry as well as its private manifest.

This decision supersedes the private publication default in the [Agent Teams package decision](2026-08-18-experimental-agent-teams-packages-f20b63e017.md). Its dependency isolation, opt-in composition, engineering requirements, and promotion rules remain active. Publication grants neither stability nor a support promise.

## Alternatives considered

**Retain a public allowlist.** Every new public experimental package needs another policy entry, even though the default publication path can discover it.

**Publish every experimental package immediately.** This would expose the existing internal-only prototypes. An explicit private denylist changes the default for new packages while preserving their current publication status. The [complete publication decision](2026-09-12-publish-all-experimental-packages-87418f24bd.md) records their separate publication.

## Consequences

New experimental packages join both npm publication paths without an allowlist edit. Private exceptions have one shared owner, and workspace validation rejects manifests that disagree with it.
