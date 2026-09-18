> 自动同步的官方参考原文。来源：[packages/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the web GUI browser half: shell boot, browser-host communication, shared client services, localization, development reload, and the UI feature plugins."
kind: "package-group"
---

# client/ — web-GUI browser half

English | [中文](readme.zh-f964eba3da.md)

## Summary

The `client/` group provides the browser experience for the dsh web GUI, including conversation, navigation, settings, approvals, file access, and other interactive features. Choose packages from this family when adding browser-visible behavior; use [`host/`](../packages/readme-62629169d0.md) for server-side page delivery and host integration. Packages cover both the shared browser foundation and focused UI features, while each child README owns its configuration and behavior. Authoring rules live in [AGENTS.md](agents-3054d3fab9.md), and the related documentation below explains cross-package composition.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

The kernel packages boot and serve the page; the UI feature packages present it. Each package README owns its contract and configuration.

| Package | Role | ctx key |
|---|---|---|
| [`web/`](readme-cb3d1ce68e.md) | Boots the browser shell | — |
| [`modules/`](readme-645599eb25.md) | Loads browser-side client modules | `ctx.clientModules` / `ctx.modules` |
| [`connection/`](readme-10d136b054.md) | Maintains browser-host RPC communication and event delivery | `ctx.connection` |
| [`file-upload/`](readme-3bc6a5e00f.md) | Sends raw Blob and byte-stream request bodies outside the page thread | `ctx.fileUpload` |
| [`store/`](readme-3a799ef7a5.md) | Provides React-free observable and snapshot-store primitives | — |
| [`hmr/`](readme-8eb0774cf3.md) | Refreshes client plugins during development | — |
| [`locale/`](readme-92992a83e8.md) | Provides localization preferences and message dictionaries | `ctx.locale` |
| [`test-runtime/`](../packages/readme-915f4cf8b0.md) | Shared repository test support for client feature packages | — |
| [`ui-renderer/`](readme-535813282c.md) | Binds slot data to React and mounts the assembled application | `ctx.uiRenderer` |
| [`ui-slots/`](readme-b625455a4e.md) | Defines typed extension Slots and reusable Component Factories | — |
| [`ui-session/`](readme-e1f59b9109.md) | Adapts Session Controller state into standard Slot sources and hooks | — |
| [`ui-theme/`](readme-0f0e9dec66.md) | Applies the selected color theme | — |
| [`ui-primitives/`](readme-33df2efed7.md) | Provides shared React controls, icons, and content renderers | — |
| [`ui-attachment/`](readme-4f09ea27f6.md) | Registers composer and message-image attachment presentation | — |
| [`ui-layout/`](readme-33d6fe9191.md) | Arranges the main application regions | — |
| [`ui-dockkit/`](readme-b2b820633a.md) | Provides docking layout operations and React components | — |
| [`ui-sidebar/`](readme-87b405673e.md) | Presents workspace and session navigation | — |
| [`ui-sidebar-right/`](readme-20bc3675a5.md) | Owns the right Sidebar and its tab types | `ctx.sidebarRight`, `ctx.sidebarRightTabs` |
| [`ui-sidebar-documentpreview/`](readme-f18b8ad324.md) | Displays documents in right Sidebar tabs | `ctx.documentPreviews` |
| [`ui-sidebar-browser/`](readme-763a687235.md) | Browses sandboxed HTTP(S) pages, including loopback services, in right-Sidebar tabs | — |
| [`resources/`](readme-c7bd26a182.md) | Unified resource model: protocol providers behind the `useResource` session standard hook | `ctx.resources` |
| [`ui-sidebar-files/`](readme-41df419f7f.md) | Right-Sidebar workspace file tree tab type | — |
| [`ui-brand-official/`](readme-1348b432e3.md) | Fills the generic browser-brand slots with the official name and marks | — |
| [`ui-workspace/`](readme-77853c9f07.md) | Provides workspace selection and creation surfaces | — |
| [`ui-conversation/`](readme-d7a1e9baae.md) | Presents the active conversation and its input surface | — |
| [`ui-chat/`](readme-7ac7917398.md) | Projects and renders the Chat conversation target | — |
| [`ui-approval/`](readme-5c550e0f84.md) | Presents approval requests and returns user decisions | — |
| [`ui-tool/`](readme-39f70d244e.md) | Composes Tool call trees and keyed per-Tool views | — |
| [`ui-workflow-run/`](readme-c32640f9ae.md) | Replays durable workflow runs as nested chat disclosures | — |
| [`ui-goal/`](readme-ec269bcc68.md) | Presents and manages the current goal | — |
| [`ui-trajectory/`](readme-c26f728a8b.md) | Presents alternate views of agent activity | — |
| [`ui-commands/`](readme-ae7f08a2fd.md) | Provides session-aware command discovery and dispatch | — |
| [`ui-input-trigger/`](readme-e46596e00d.md) | Coordinates inline command and reference suggestions | — |
| [`ui-skill/`](readme-f52bd0a9bf.md) | Adds skill references to inline suggestions | — |
| [`ui-reference/`](readme-a97017a9e6.md) | Unified Web `@file` / `@session` reference source | — |
| [`ui-subagent/`](readme-4eb8a43cc0.md) | Provides subagent navigation, child transcript states, and inline references | — |
| [`ui-schedule/`](readme-fb16058f3d.md) | Lists the current Session's active reminders in a read-only header catalog | — |
| [`ui-jobs/`](readme-af951b425c.md) | Lists this session's background jobs in the conversation header | — |
| [`ui-model-selection/`](readme-a5c2dd9cf9.md) | Provides model selection in conversation surfaces | — |
| [`ui-permission-presets/`](readme-52b51c4414.md) | Configures default permissions and switches the current session's access | — |
| [`ui-plan/`](readme-5847127674.md) | Presents active plan-mode status and its exit control | — |
| [`ui-settings-plugins/`](readme-c442bb6aeb.md) | Owns the Plugins settings section, its tab extension point, and configurable host-plane plugin cards | — |
| [`ui-user-questions/`](readme-628170f4f9.md) | Presents interactive questions requested by the agent | — |
| [`ui-agent-preset/`](readme-29f9f67ff9.md) | Selects a session's agent preset and authors preset compositions | — |
| [`ui-settings/`](readme-fe77362542.md) | Hosts the settings interface and its extension areas | — |
| [`ui-settings-general/`](readme-5d338ffc29.md) | Provides the general settings section | — |
| [`ui-settings-models/`](readme-4bacb5a5e9.md) | Provides model-provider configuration and DeepSeek onboarding | — |
| [`ui-plugin-manager/`](readme-04ce4cbfb2.md) | Contributes the sidebar Plugins panel: install, enable, disable, retry, and compose installed packages | — |
| [`ui-settings-plugin-inventory/`](readme-8a60b7d72f.md) | Contributes the read-only Host Loader inventory tab to Plugins settings | — |
| [`ui-deliverables/`](readme-a3586cfd97.md) | Produces the changed-files card with its comparison tabs, delivery cards, and clickable final-response file references | — |
| [`ui-message-feedback/`](readme-fc139dd153.md) | The feedback surface: per-message Like/Dislike in the assistant-message action strip, and the feedback dialog behind both ratings and `/feedback` | — |
| [`ui-directory-picker-browse/`](readme-4e776d83c4.md) | In-app directory browsing surface for the workspace directory flow | — |
| [`ui-directory-picker-native/`](readme-83cd2e43c5.md) | Native directory-picker surface driving the local Desktop or Host OS chooser | — |
| [`ui-open-in-app/`](readme-d1d1d7399e.md) | Session-header split button opening the workspace directory in an installed application | — |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference and the two notes that own the cross-package composition decisions, then the host half that serves this page.

- [Client modules subsystem](client-modules-cf1b9f2775.md) — the web plugin table: `dsh.client` declarations, the boot graph wire, and the bundle route.
- [Slot system standard](../history/2026-07-22-slot-type-chain-implementation-5c92b4dcea.md) — the definitive slot model: registration, props shares, and stores.
- [Web client architecture note](../history/2026-07-19-gui-web-client-architecture-3ffdf750a6.md) — the loading chain, object layer, and client services.
- [Host group map](../packages/readme-62629169d0.md) — the host half that serves this browser half.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
