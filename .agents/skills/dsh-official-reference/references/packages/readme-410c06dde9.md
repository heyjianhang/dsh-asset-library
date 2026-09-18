> 自动同步的官方参考原文。来源：[packages/jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The jobs group map: background-job control — the registry contract, process-local storage, and the model-facing job tools — for users and maintainers navigating the group."
kind: "package-group"
---

# jobs/ — background-job capability family

English | [中文](readme.zh-ae760f0dd7.md)

## Summary

The jobs group is the background-work capability family: tools that run long work register it as a job, and the owning agent can read, wait on, list, and cancel it without blocking its own turn. Jobs belong to the agent session that started them, so one agent never sees another's work, and completion is delivered to the owning agent in-session instead of polled. The group splits into the registry contract (`jobs`), its process-local storage (`jobs-local`), and the model-facing control tools with completion notices (`tool-jobs`).

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`jobs`](readme-67769d6fc7.md) | Defines the background-job contract: ids, ownership, lifecycle, and completion listeners | `ctx.jobs` |
| [`jobs-local`](readme-2ccaf29c85.md) | Runs and stores jobs in this process, fenced per owner | registers on `ctx.jobs` |
| [`tool-jobs`](readme-45d3e5cc65.md) | Lets the model read, list, and kill jobs and delivers completion notices | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

- [Background task runtime subsystem](../subsystems/jobs-cdd03a5ef8.md) — the job types, snapshot fields, and the `ctx.jobs` API.
- [Generic long-running tool runtime Agent Note](../history/2026-06-20-generic-long-running-tool-runtime-5540094856.md) — the design behind the background-job runtime.
- [job-registry seam Agent Note](../history/2026-07-26-job-registry-seam-38018d3a7a.md) — the owner-fenced registry contract and its rationale.

-----

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
