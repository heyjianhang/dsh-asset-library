> 自动同步的官方参考原文。来源：[docs/subsystems/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Subsystems

English | [中文](readme.zh-4050d378a0.md)

One page per subsystem of the DeepSeek Harness: what it is, the data structures it moves, and — where a `ctx` service or event scope backs it — a generated **Cordis API** section carrying its service and event reference. The folder complements [architecture.md](../architecture/architecture-140eef3ba4.md), which describes *behavior* across subsystems (the service map, the session/turn/step lifecycle, the event taxonomy); each page here is the reference for one subsystem's vocabulary and wiring.

| Page | Owns |
|---|---|
| [boot.md](boot-315056a4e7.md) | Current-profile plugin management and launcher reload coordination |
| [core.md](core-eb12d29a85.md) | how `packages/core` controls the agent loop: the package-by-package loop description, agent creation and ownership (`AgentHandle`), the `Agent` handle's delivery/cancellation/interception contracts, and the repo-wide type patterns (`…Map → derived-union`, branded ids) |
| [llm-streaming.md](llm-streaming-7a1c63fe96.md) | the `packages/llm` conversation types — `Message`/`ContentBlock`, the assembled model request, the `StreamChunk` wire protocol and adapter contract, `BlockAssembler`, and the `LlmAdapter` provider contract |
| [token-meter.md](token-meter-d138842e41.md) | immutable scalar and positional replay measurements with consumed-log revisions |
| [scope.md](scope-af50cbbcde.md) | scoped registration identity, dispatch carriers, and the owned `Scope` context |
| [typert.md](typert-15ff52e11b.md) | Remote invocation descriptors, lookup/Context declarations, Typert registries, and the Host Gateway/Client API boundaries |
| [goal.md](goal-c08402a6f9.md) | persisted goal identity, lifecycle snapshots, activation, change records, and round attribution |
| [schedule.md](schedule-dd3d32d4e0.md) | Session-local reminder records, durable transitions, active views, and ordinary-conversation delivery |
| [todo.md](todo-f4e162d037.md) | the todo package's whole-list item type, durable event ownership, projection, and open-turn invariant |
| [deliverables.md](deliverables-c8b91afeb4.md) | what a turn hands to the user: `PresentedFile` deliveries from `present` and the Host-served `WorkspaceChangesSummary` of changed files from git snapshots |
| [commands.md](commands-182ff0c785.md) | the human-command registry service: definitions, adapter discovery, direct invocation, results, and parsing views |
| [session.md](session-b1806dce9a.md) | the full `SessionEventMap` variant catalog, `TurnEndReason`, `deriveMessages()`, execution enclosure, and standalone events |
| [persistence.md](persistence-63e745c683.md) | the durability seam: `SessionPersistence`, the JSONL provider, `session/flush`, crash recovery, `SessionHeader` |
| [settings.md](../client/settings-c9b20555da.md) | the user-settings seam: `SettingsNamespace` registration, layered resolution (defaults → composition `base` → user document), owner scopes, hot commits |
| [credentials.md](credentials-2173dd41d7.md) | the credential seam: `CredentialRef` references (never values) in configuration, per-operation resolution, UI-safe `CredentialInfo`, provider source layers |
| [session-query.md](session-query-8860b2381c.md) | logical records, bounded exact-event reads, relationship traces, semantic filters/documents, and full-text result pages |
| [feedback.md](feedback-acdee6ec14.md) | lifecycle-bound per-message feedback records, optimistic versions, sidecar persistence, and the Host Remote contract |
| [session-title.md](session-title-41d2179d94.md) | durable title snapshots, cited source-message seqs, and the asynchronous provider contract |
| [session-reference.md](session-reference-beed05a9d8.md) | structured cross-session references: `SessionReferenceInput`/`Candidate`, prepared message contexts, the stable error taxonomy |
| [system-prompt.md](system-prompt-7410483c3d.md) | per-assembly context, tool-provider results, prompt sections, and cooperative assembly |
| [tools.md](tools-82b9070d05.md) | `ToolDefinition` full fields, the schema DSL, `ToolExecution`/`ToolResult`, tool-presentation UI types, and the guarded execution pipeline |
| [mcp.md](mcp-0057687b3d.md) | external MCP connections, scoped tools and resources, server instructions, protocol results, and configuration ownership |
| [user-questions.md](user-questions-1b837ad502.md) | the UI-backed human question/answer seam: `AskUserQuestionRequest`, answer/options vocabulary, provider API, error taxonomy |
| [approval.md](approval-7e58655923.md) | the one-shot user-approval seam: `ApprovalRequest`, `ApprovalOutcome`, per-session policy, audit events, and answerer contracts |
| [office-to-pdf.md](office-to-pdf-317ee6b0d3.md) | authorized Office-to-PDF conversion, native/WASM engines, and bounded shared reuse |
| [attachment.md](attachment-bd162ad2ea.md) | durable image identity and metadata, validation inputs, verified reads, and the `AttachmentStore` seam |
| [shell.md](shell-8bac0cbd82.md) | the shell executor seam: `ShellExecRequest`/`Spec`, `ShellRunResult`, background `ShellProcess` handles |
| [subprocess.md](subprocess-be660d9204.md) | the subprocess seam: fully-explicit `SubprocessSpawnSpec`, offset-based output readers, unclassified `SubprocessOutcome`, and the managed `DSH_*` environment vocabulary |
| [ssh.md](ssh-06a64b463f.md) | the POSIX SSH connection and remote filesystem, subprocess and sandbox providers |
| [terminal.md](terminal-f72896adba.md) | persistent terminal ids, backend/session contracts, send readiness, bounded reads, and owner-visible snapshots |
| [sandbox.md](sandbox-627ec2f04b.md) | per-session policy resolution and the process-confinement seam: file-effect modes, execution/provider policies, `ConfinedArgv`, enforcement and fail-closed errors |
| [ptc-runtime.md](ptc-runtime-18098b6708.md) | the PTC execution seam: `PtcRunRequest`/`Result`, binding namespaces, captured logs, the `PtcRunFailure` taxonomy |
| [computer-use.md](computer-use-e036039168.md) | exclusive named computer-use provider registration and Cua Driver integration choices |
| [browser-use.md](browser-use-a714a20501.md) | exclusive named browser-use registration, provider choices, and per-Session browser ownership |
| [extensions.md](extensions-13d4d2616c.md) | versioned dynamic Cordis Plugins and Packages, Host/Client activation, approval, runtime inspection, and lifecycle teardown |
| [filesystem.md](filesystem-f8eb468655.md) | the filesystem seam: `FsTarget`, read/write/edit outcomes, observed-file state, `FsErrorCode` |
| [lsp.md](lsp-f4bb090a5e.md) | the LSP navigation seam: `LspQueryRequest`/`Result`, `LspProvider`/`Service`, four operations, `LspError` |
| [skills.md](../agents/skills-d7aa2ea162.md) | the skill service: discovery priority, `SkillSummary`/`SkillDefinition`, session-prefix catalog, model-facing `skill` loading |
| [compaction.md](compaction-6cf647eebd.md) | the compaction seam: the `compaction/*` session events, `CompactionResult`, the `CompactionEngine` interface |
| [subagent.md](subagent-18247ac264.md) | the subagent seam: the named-provider registry, `SubagentStartRequest`/`Result`/`Run`, the start-time-vs-runtime capability split |
| [agent-team.md](agent-team-97b7ef8c7a.md) | Agent Teams: implicit Lead identity, named continuable teammates, durable peer mailbox, and shared task DAG |
| [web.md](web-dc7886985f.md) | the web access seam: `WebSearchRequest`/`Result`, `WebFetchRequest`/`Result`, `WebFetchBody`, provider availability, `WebError` |
| [spill.md](spill-9a4df6b238.md) | the spill storage seam: `SaveTextSpill`, `SpillOwner`/`SpillSource`, `SpillRef`, the branded `SpillLocator` |
| [workflow.md](workflow-3a8a1be2c2.md) | the workflow seam: `WorkflowStartRequest`, `WorkflowMeta`, `WorkflowRun`/`Result`, the `workflow/*` event payloads, `WorkflowError` fatality |
| [jobs.md](jobs-cdd03a5ef8.md) | the background-job runtime: branded `JobId`s, the producer contract, consumer views, and `ctx.jobs` service behavior |
| [permission-presets.md](permission-presets-20be9bdbb7.md) | the permission-preset layer: `PresetSpec`/`PresetOption`, the derived `custom` state, the log-only `permission/preset` event |
| [plan.md](plan-617c8a7dda.md) | plan mode: the log-only `plan/mode` state, pending-selection flush, `PlanModeConfig`, the `exit_plan_mode` review arc |
| [invariants.md](invariants-1d2c2ceb81.md) | the runtime-invariant registry: selection `Config`, `InvariantInstaller`/`InvariantFailure`, the empty-companion contract |
| [web-server.md](web-server-506c210b94.md) | the HTTP carrier: `WebRouteKind`/`WebRoute`, match order, the claimable fallback seat, index taps |
| [webhook.md](webhook-458d1adbf9.md) | authenticated provider deliveries, arbitrary programmatic rules, and fire-and-forget Workspace Session creation |
| [storage.md](storage-5396e0be0a.md) | the storage subsystem: the backend contract (`StorageBackend`), `StorageForms`, `DomainSpec`/`Domain`, `domain/changed` |
| [workspace.md](workspace-d8d44a8d59.md) | the workspace registry: `Workspace`/`WorkspaceId`, registration and resolution, the session `cwd` relationship |
| [web-client.md](../client/web-client-e8abd1964d.md) | the browser architecture: boot, Remote communication, paired Client models, UI adapters, Conversation assembly, Slots, and reconnect semantics |
| [client-modules.md](../client/client-modules-cf1b9f2775.md) | the web plugin table: `dsh.client` declarations, `WebBootGraph` wire composition, the bundle route and index tap |
| [slots.md](../client/slots-0297391ac4.md) | typed Web UI composition: declaration ownership, cardinality and scope, framework and feature injection, props derivation, and the shipped hierarchy |
| [client-resources.md](../client/client-resources-0cff4ce123.md) | the client resource model: `dsh-resource://<type>/…` addresses, protocol providers and `ResourceProtocolMap`, the `useResource` global hook and its states, pins and release |
| [sidebar-right.md](../client/sidebar-right-47c9c83f4f.md) | the right Sidebar: resource and navigation addresses, tab-type registration and routing, the `ctx.sidebarRight` navigation service, the pane-tab slots and owner props, the resource model, and the Workspace Files service |
| [conversation.md](conversation-861c54dd37.md) | target-neutral Session-event assembly: Context identity, Location data, replay paths, view builders, and target-owned render nodes |
| [session-projection.md](session-projection-c047f7f301.md) | the projection seam: `SessionProjectionMap`, the pure `ProjectionDefinition` unit, `ProjectionSnapshot`'s consistent cut, the change feed |
| [session-telemetry.md](session-telemetry-15cbcab55b.md) | the outbound session-reporting capability seam: `SessionTelemetryRecord`/`SessionTelemetrySeverity`, the `SessionTelemetrySink` contract, and the `session-telemetry/record` redact waterfall |

> Type declarations and their JSDoc on these pages are source-equivalent and drift-checked by `pnpm run verify-type-equiv` (see [development.md](../architecture/development-97db29a791.md#documenting-types-verbatim-ts-type-equiv)). Ordinary blocks preserve complete declarations; `public-api` blocks preserve body-stripped public class declarations. Cordis services and events use each page's generated **Cordis API** section.
