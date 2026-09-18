> 自动同步的官方参考原文。来源：[packages/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The DeepSeek Harness package workspace: how the npm packages under packages/ are grouped, what each group owns, and the conventions that bind them."
kind: "package-group"
---

# Packages

English | [中文](readme.zh-4e1114dc44.md)

## Summary

The harness is assembled from npm packages under `packages/`, grouped by capability family: sessions and the agent loop, model-facing tools, shell and filesystem execution, web access, subagents, and the rest. Use this page as the top-level map: find the owning group, then open its README for the package list. Every package is scoped `@deepseek-ai/dsh-*` and lives in exactly one group; each group README is the authoritative package map for its family.

## Table of Contents

- [Package groups](#package-groups)
- [Release expectations](#release-expectations)
- [Dependencies](#dependencies)
- [Package README contracts](#package-readme-contracts)
- [Dev Note](#dev-note)

-----

<a id="package-groups"></a>
## Package groups

Every package lives in exactly one group; new packages join existing groups, and a new group updates its own README and this table.

| Group | Role |
|---|---|
| [`core/`](readme-af0c08d6f2.md) | Product API spine: sessions, prompts, tools, agent services, and the concrete loop |
| [`api/`](readme-f3a9540595.md) | Remote BFF assembly and Typert RPC gateway |
| [`typert/`](readme-4eb75b2ff6.md) | Type graph generation, artifact loading, and runtime registry |
| [`goal/`](readme-a3aa5abe58.md) | Same-session goal persistence and lifecycle |
| [`schedule/`](readme-944694de8b.md) | Session-local scheduled follow-ups |
| [`feedback/`](readme-b888fa3af9.md) | Human feedback capture and command |
| [`identity/`](readme-19cfa9b3b7.md) | Shared anonymous identity |
| [`llm/`](readme-23daf3e3e5.md) | LLM capability family: abstract service + provider adapters |
| [`subprocess/`](readme-dc0d1b15f9.md) | Subprocess capability family: Service Definition + local process-tree provider |
| [`ssh/`](readme-cfa341a5f5.md) | POSIX remote connection with paired filesystem, subprocess and sandbox providers |
| [`shell/`](readme-4efdfcfcdf.md) | Bash capability family: executor seam, local impl, model-facing tools |
| [`terminal/`](readme-79cae2b77b.md) | Persistent PTY capability family: owner-scoped sessions, local implementation, model-facing tools |
| [`ptc-runtime/`](readme-a37f974fb4.md) | PTC execution capability family: Service Definition + sandboxed Node provider + PTC mode Consumer |
| [`computer-use/`](readme-6205d76bd2.md) | Exclusive named desktop-provider registration |
| [`browser-use/`](readme-44de45b6f1.md) | Exclusive named browser-provider registration |
| [`sandbox/`](readme-cd31c4b609.md) | Process-confinement seam; bwrap/Landlock/Seatbelt backends |
| [`deliverables/`](readme-7502fedab9.md) | Turn deliverables: explicit file delivery and recorded workspace changes |
| [`fs/`](readme-de79a2d16e.md) | Filesystem capability family: seam, local impl, model-facing file tools, discovery tools |
| [`lsp/`](readme-f2bd17d5ba.md) | LSP capability family: seam, generic stdio provider, and the `lsp` tool |
| [`skill/`](readme-c26f114595.md) | Skill capability family: provider registry, local provider, model-facing catalog/loader |
| [`compaction/`](readme-1e039f6ea0.md) | Compaction capability family: Service Definition + basic provider + command Consumer |
| [`context/`](readme-ffdcfd2a18.md) | Model-visible request context: workspace instructions, time context, references |
| [`subagent/`](readme-79fda5c133.md) | Subagent capability family: provider-registry contract and model-facing delegation tools |
| [`jobs/`](readme-410c06dde9.md) | Generic background-job runtime and model-facing job control tools |
| [`experimental/`](readme-ceea8c28e8.md) | Pre-stable prototypes with explicit private exceptions |
| [`workflow/`](readme-b0ef03fb3f.md) | Workflow seam, PTC process engine, and model-facing `workflow`/`ralph` tools |
| [`webhook/`](readme-d5b06606c0.md) | Verified external events, trusted rules, and fire-and-forget Workspace Sessions |
| [`web/`](readme-95e2a4ab7d.md) | Web capability family: seam, search/fetch providers, model-facing web tools |
| [`document/`](readme-6c60bea76c.md) | Shared Host Office-to-PDF conversion |
| [`attachment/`](readme-cda7d390ad.md) | Durable attachment identity, validation, local content-addressed storage |
| [`spill/`](readme-070ad4d37c.md) | Spill capability family: storage seam, local impl, tool-result spill policy |
| [`todo/`](readme-aae938cfc8.md) | The model-facing `todo_write` tool |
| [`plan/`](readme-3cf887a0e3.md) | Plan collaboration state with a direct entry command and reviewed exit |
| [`preset/`](../agents/readme-900308537e.md) | Per-session agent composition from preset `cordis.yml` files |
| [`guard/`](readme-d09119e539.md) | Loop-hygiene guards: advisory repeat-call reminders + the `tools/execute` deadline enforcer |
| [`bundle/`](readme-168d963b7d.md) | Installable `dsh --profile` patch layers |
| [`extensions/`](readme-e3e98cf1ce.md) | Agent runtime self-modification: live plugin/service inspection and model-written mount/unmount |
| [`mcp/`](readme-ba5dea79fe.md) | External Model Context Protocol servers exposed as native tools |
| [`hooks/`](readme-dacb00190c.md) | Hook bridges + the shared Claude Code / Codex wire-protocol library |
| [`session/`](readme-f38ff78869.md) | Durable session data plane: persistence seam + backends, projection seam, log-backed titles, session reporting |
| [`session-query/`](readme-0598c8f8df.md) | Session retrieval family: logical corpus, bounded reads, lineage, semantic filtering, SQLite full-text search |
| [`settings/`](readme-2aff7ebe8f.md) | User-settings seam + file-backed provider |
| [`credentials/`](readme-5e2e509e7f.md) | Credential-reference and credential-record seam + env-over-`.env` provider + authorization flows that ask a human |
| [`storage/`](readme-8fbb896c3a.md) | Non-session storage hub + backends + domain form |
| [`workspace/`](readme-614f7b4628.md) | Workspace entity |
| [`sdk/`](readme-fb389a13c1.md) | Out-of-process SDK: JSON-RPC protocol and TypeScript client/server |
| [`acp/`](readme-25e87e3075.md) | Automation-only Agent Client Protocol server |
| [`interaction/`](readme-523729cda4.md) | Human-collaboration plane: approval/interaction seams, permission preset, commands, ask-user tool |
| [`boot/`](readme-fe4649f14a.md) | Shared app-bin boot glue |
| [`host/`](readme-62629169d0.md) | Web-GUI host half: API gateway + HTTP route server |
| [`client/`](../client/readme-7b3f04edbf.md) | Web-GUI browser half: shell, wire, object services, slots, `ui-*` plugins |
| [`test-support/`](readme-106c612858.md) | Test infrastructure (testkits, replay, Loader smokes) |
| [`runtime-diagnostics/`](readme-439fa3150d.md) | Runtime diagnostics: package-owned invariant checks and reports |
| [`util/`](readme-c24fab808a.md) | Low-level zero-dependency utilities shared across groups (`Branded<B>`, home/path helpers, timeout, retention) |

-----

<a id="release-expectations"></a>
## Release expectations

Most groups are product — stable API. The exceptions: `experimental/` publishes without stability or support promises, and `test-support/`, `runtime-diagnostics/`, and `util/` are support with lower compatibility expectations.

-----

<a id="dependencies"></a>
## Dependencies

The dependency graph is generated: [docs/module-graph.md](../architecture/module-graph-84f3016eec.md) (`pnpm run gen-module-graph`, freshness-gated in CI).

**Extension plugins depend on Service Definitions, never concrete providers.** `dsh-agent-loop` is swappable; UI, hook, and tool plugins use `dsh-agent`. Composition bundles may depend on spine plugins. Capabilities separate Service Definition / Service Provider / Consumer roles when they evolve independently; see [capability seams](../history/2026-06-13-capability-seams-090260d55b.md).

-----

<a id="package-readme-contracts"></a>
## Package README contracts

Every package README covers purpose, configuration, extension points, and [Model Experience](../practice/adding-a-package-2680212440.md#4-write-the-package-readme) unless the model-agnostic [omission allowlist](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/verify-package-readme-model-experience.ts) exempts it. It also carries `## Known Limitations and Deferred Work` or uses its [allowlist](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/verify-package-readme-limitations.ts). Package conventions — exports, service access, invariants, tests — live in [packages/AGENTS.md](agents-0c2589e647.md).

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
