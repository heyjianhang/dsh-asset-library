> 自动同步的官方参考原文。来源：[.agents/notes/implemented/process/2026-09-10-approval-review-workflow-identity.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/process/2026-09-10-approval-review-workflow-identity.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Identify approval review workflows by file path

Status: implemented

English | [中文](2026-09-10-approval-review-workflow-identity.zh-28f34371c5.md)

## Problem

GitHub can populate a workflow run's `name` with its expanded `run-name`. The approval review workflow includes the pull-request number in that title, so comparing `workflow_run.name` with the static workflow name rejects valid review events before refreshing the approval status.

## Decision

The [approval publisher](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.github/review-ownership/check-approval.mjs) identifies the review-event workflow by its exact `workflow_run.path`. It also requires a successful `pull_request_review` run, parses the pull-request number from `display_title`, validates any supplied pull-request association, and compares the current pull-request head with the reviewed head before evaluating approvals.

## Alternatives considered

**Accept a name prefix.** A display name does not identify the workflow file; another workflow can use the same title.

**Remove the numbered run title.** The title supplies the pull-request number when GitHub returns an empty `pull_requests` array. Removing it requires a different handoff mechanism.

## Consequences

Run-title expansion does not prevent approval refreshes, while an unexpected workflow file still fails validation. Moving the review-event workflow requires updating the publisher's expected path.

[Approval policy tests](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.github/review-ownership/check-approval.test.mjs) cover a numbered run name, invalid source paths and events, unsuccessful runs, invalid titles, and superseded heads. The [approval outcome policy](2026-09-09-blocked-weighted-approvals-remain-pending-fe7ea93a44.md) continues to own pending and successful status semantics.
