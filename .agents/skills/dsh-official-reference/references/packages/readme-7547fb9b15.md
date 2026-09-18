> 自动同步的官方参考原文。来源：[packages/session/session-title-all-prompts-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-all-prompts-llm/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "All-messages LLM session-title provider for users and maintainers choosing a title strategy or debugging automatic title generation."
kind: "package-reference"
---

# @deepseek-ai/dsh-session-title-all-prompts-llm

English | [中文](readme.zh-f445fccdf0.md)

## Summary

`dsh-session-title-all-prompts-llm` summarizes every eligible human message through `ctx.llm` as an optional `ctx.sessionTitle` provider. It registers the `all-prompts` cadence and starts a new revision after each new human prompt, using seeded history and child-session prompts. A newer revision aborts and supersedes older work, and even a provider that ignores cancellation cannot commit stale output. It uses the complete required shared LLM configuration from `dsh-session-title-llm`, so route, prompt, budget, and cancellation behavior cannot drift. Automatic behavior and configuration come first; the implementation is a thin registration over the shared policy.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Mount this plugin beside the title service when a session should be retitled as it grows, so the title keeps representing the whole conversation. It requires the full [shared LLM configuration](readme-707ffd6dea.md#configuration) with no defaults.

### When titles are generated

A new revision starts after each new eligible human prompt, including prompts in child sessions; the generation folds all eligible messages through the current revision, seeded history included. A newer revision aborts and supersedes older work, so a stale completion can never commit. An automatic failure — including input over `maxInputBytes`, which fails instead of truncating history — warns and keeps the prior title; `ctx.sessionTitle.refresh()` is the explicit retry.

### Configuration

The plugin accepts the complete required [shared LLM configuration](readme-707ffd6dea.md#configuration): `targetWords`, `targetCjkCharacters`, `maxInputBytes`, `maxOutputTokens`, `timeoutMs`, and the optional paired `provider`/`model` route. Omit both to inherit the exact route from each current logged main request, or set both to route title generation independently. The generated [configuration catalog](../architecture/config-catalog-9957d66982.md#deepseek-aidsh-session-title-all-prompts-llm) is the exhaustive source for every accepted field.

### Failures and recovery

If the final framed aggregate prompt exceeds `maxInputBytes`, the request fails instead of truncating history; automatic use warns and keeps the prior title, and only an explicit `refresh()` retries. Automatic work adds no tokens and no latency to the main agent request.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

This section explains the plugin's shape; the observable behavior is fully covered in [Use this package](#use-this-package).

### Design concept

A thin provider plugin: it registers the `all-prompts` cadence with an identity selector over all eligible messages, and delegates everything else to the [shared LLM policy](readme-707ffd6dea.md).

### Source map

| File | Role |
|---|---|
| [`src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-all-prompts-llm/src/index.ts) | Plugin entry: shared config schema, provider registration with the all-messages selector |

### Scheduling

The title service schedules automatic work: for the `all-prompts` cadence, every new eligible user message starts a revision, and a newer revision supersedes older work; the provider call begins after the exact main-request route is logged.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

Read these pages when the provider contract is not enough. They move from the shared policy to the alternative cadence and the service it plugs into.

- [Shared LLM title policy](readme-707ffd6dea.md) — the generation helper this provider uses.
- [First-message title provider](readme-6698368cbb.md) — the cadence that titles a session once from its first prompt.
- [Session title service](readme-c443f6454c.md) — fallback behavior, rename, refresh, and provider registration.
- [Session package map](readme-f38ff78869.md) — adjacent persistence, projection, title, and telemetry packages.

-----

<a id="model-experience"></a>
## Model Experience

### All-messages title request

#### What the model sees

The title model receives the shared title instruction and a JSON array of all eligible human messages through the current revision, in log order with exact seqs. Seeded history is included.

#### Token effect

One auxiliary request may follow every new eligible prompt, bounded per request by `maxInputBytes` and `maxOutputTokens`; explicit refreshes may add calls. The main agent request gains zero tokens.

#### KV Cache effect

No main-request invalidation. Auxiliary input grows or changes after each prompt, so provider-specific cache reuse ends at the first changed JSON token.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>


These limits define how the provider treats long and heterogeneous sessions. They are current package constraints.

- **No summarization-of-summaries** — input overflow retains the prior title; this provider has no summarization-of-summaries or retention policy for very long sessions.
- **Messages are treated equally** — it treats all eligible human messages alike and offers no weighting, filtering, or manual-title precedence.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>

**Runtime invariant:** No companion is published. This thin provider delegates request and result validation to the shared title service and LLM helper and retains no independent mutable state.
