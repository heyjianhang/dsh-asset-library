> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-12-linux-scope-direct-kill-settlement.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-12-linux-scope-direct-kill-settlement.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Join direct termination before rejecting Linux scope cleanup

Status: implemented

English | [中文](2026-09-12-linux-scope-direct-kill-settlement.zh-030e5e142b.md)

## Problem

A failed scope signal can precede the exit notification of a direct process that accepted fallback `SIGKILL` or has already disappeared. Reporting the signal failure from an active scope observation during that interval can reject cleanup while termination remains in progress. The direct process's exit alone cannot prove that its descendants have stopped.

## Decision

The [Linux scope owner](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess-local/src/linux-scope.ts) retains a failed final scope signal. A successful process-group `SIGKILL` proves delivery to at least one member, so the direct PID requires its own signal acknowledgement or absence proof. A successful group `SIGTERM` remains a single delivery to avoid repeating a catchable TERM handler; its acknowledgement does not authorize the final-kill settlement wait. Direct-PID requests use `process.kill()` so delivery errors remain separate from the child's `error` event, which also carries launch failures and rejects the direct outcome. `ChildProcess.kill()` can emit that event on a denied signal before the real exit. Successful direct `SIGKILL` submission or independently proven direct-process absence permits one wait for the direct process's exit or launch-error settlement before a fresh scope observation. This event is independent of output draining, startup-error interpretation, and managed-range completion. After rejected direct signaling, a signal-zero probe must report `ESRCH` to establish absence; a surviving process or another probe error permits no such wait.

Existing scope-emptiness proofs remain sufficient before direct settlement. When an active scope observation began before direct exit and cannot prove emptiness, the owner consumes the direct settlement wait once and then queries the scope again. An observation begun after direct exit requires no extra wait or query. A surviving range or unknown process count retains the original signal failure. State-query and parsing errors remain failures.

The [native-containment decision](2026-08-28-subprocess-native-containment-46845a9812.md) continues to own descendant membership and the separation between direct outcomes and whole-range quiescence. The [hosted-image fixture policy](2026-09-10-hosted-image-test-assumptions-3f1341d195.md) retains its existing test budgets; those budgets do not establish signal completion.

## Alternatives considered

**Reject on the first active observation.** Rejected because successful direct signaling requests termination but does not synchronously deliver its exit notification.

**Increase graces or repeat observations without a completion event.** Rejected because elapsed time cannot establish that the signaled process has exited.

**Treat direct exit as successful cleanup.** Rejected because descendants can outlive their direct parent and remain in the scope.

## Consequences

Cleanup joins direct-process settlement only after a successful signal or proven absence while preserving independent scope verification. Configured grace periods and polling budgets remain unchanged. The wait can delay a signal error until direct settlement; it cannot convert a surviving or unobservable managed range into success.
