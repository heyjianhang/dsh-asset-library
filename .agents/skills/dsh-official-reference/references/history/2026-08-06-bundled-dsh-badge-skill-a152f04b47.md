> 自动同步的官方参考原文。来源：[.agents/notes/archived/feature/2026-08-06-bundled-dsh-badge-skill.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/feature/2026-08-06-bundled-dsh-badge-skill.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Bundled dsh badge skill

Status: implemented
Archived: 2026-08-22

English | [中文](2026-08-06-bundled-dsh-badge-skill.zh-e1de5a1d32.md)

## Problem

The [Cordis tutorial](../framework/index-f5e0713c72.md) uses an official “powered by dsh” badge across its pages, but the shipped CLI has no reusable instructions or explicit opt-in provider for applying the same attribution elsewhere.

## Decision

`@deepseek-ai/dsh-skill-badge` is a native Cordis plugin that registers one immutable bundled provider on `ctx.skills`. The provider owns the `dsh-badge` summary, instruction body, and PNG resource base; `dsh-tool-skill` remains the sole owner of model-facing catalog and loader rendering.

The shipped CLI composition declares `skill-badge` as disabled. Enabling that existing row is the explicit opt-in; disabled installations advertise no badge skill and gain no model-visible content.

The provider uses the bundled rank after project, custom, and user filesystem sources, so a user-owned `dsh-badge` definition can override it through the ordinary registry precedence contract. Provider disposal removes the contribution through the registry-owned effect.

## Alternatives considered

**Mount packaged files through `dsh-skill-filesystem`.** Rejected because filesystem discovery, parsing, and watching add lifecycle machinery that an immutable single-skill provider does not need.

## Consequences

The badge instructions and source PNG are versioned with DSH and resolve through a packaged directory resource base. The provider has no configuration surface. Package tests pin provider lifecycle and the official PNG bytes, while a keyless assembled-application snapshot pins the enabled catalog and loaded skill body.
