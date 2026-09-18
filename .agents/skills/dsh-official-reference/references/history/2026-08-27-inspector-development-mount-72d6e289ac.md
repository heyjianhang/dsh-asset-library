> 自动同步的官方参考原文。来源：[.agents/notes/archived/architecture/2026-08-27-inspector-development-mount.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/architecture/2026-08-27-inspector-development-mount.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Inspector development mount

Status: implemented
Archived: 2026-09-04

English | [中文](2026-08-27-inspector-development-mount.zh-8d0804d910.md)

## Problem

`@deepseek-ai/dsh-experimental-inspector` is a private package no published dsh installation carries, yet development launches need to mount it into the shipped Web composition on demand. A row in a shipped bundle patch cannot express this: `verify-cordis-config` requires every named row of a bundle patch to resolve from that bundle's own `dependencies` — disabled rows included — and a published manifest must not depend on an unpublished package.

## Decision

The inspector package owns two development overlays. `packages/experimental/inspector/cordis.source.patch.yml` inserts `./src/index.ts` for the tsx source launch behind `pnpm run demo:inspector`. `packages/experimental/inspector/cordis.patch.yml` inserts `./lib/index.js` for `node apps/cli/lib/bin.js web --patch ./packages/experimental/inspector/cordis.patch.yml` after `pnpm run build`.

Each relative entry resolves from its overlay file's directory through the Loader's normal owning-tree `baseUrl`. The source launch therefore reaches TypeScript directly, while the built launch reaches the package artifact; neither path reads or modifies profile-installed plugin state. A missing source or built entry fails loud during Loader import rather than skipping the Inspector.

## Consequences

Published packages carry no trace of the inspector: no manifest entry, no composition row, no launcher flag. Mounting stays a per-launch choice — the same service without an overlay never loads the package — and every layer the launch composes is declared in a config file. The source shorthand names its overlay automatically; a built launch names the built overlay explicitly and requires current `lib/` artifacts.

## Alternatives considered

- A `disabled: !!js` row in the shipped web-app patch: the dependency gate and npm publication both force the private package into the published manifest.
- A `--inspector` launcher flag mounting the package as an extra bundle layer: the launcher owns neither app flags nor plugin package names.
- An optional `peerDependencies` entry on `dsh-web-app` plus a dynamic `ctx.loader.create` from its glue plugin: it writes a never-published name into a published manifest and mounts a row no config layer declares.
- One bare-package overlay for both launch modes: source resolution can use the workspace facade, but built resolution would require persistent profile installation state unrelated to the launch command.
