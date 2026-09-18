> 自动同步的官方参考原文。来源：[.agents/notes/implemented/feature/2026-09-15-profile-command-shorthand.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/feature/2026-09-15-profile-command-shorthand.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Profile command shorthand

Status: implemented

English | [中文](2026-09-15-profile-command-shorthand.zh-6b79d63ae9.md)

## Problem

Profile launch needs a concise spelling that works for custom names without making plugin management depend on the contents of the Harness home.

## Decision

The CLI expands a leading non-option argument other than `plugin` into `--profile <name>` before parsing. Both spellings use the same launcher flags, app-argument forwarding, and profile validation. `plugin` retains command priority only as the first argument; `dsh --profile plugin` selects the same-named profile explicitly. After profile selection, `plugin` is forwarded as an app argument. Repeated profile selection before app arguments is rejected.

This decision supersedes the Web-only shorthand mechanism in [one dsh application launcher](2026-08-22-single-dsh-application-launcher-4117297069.md); that note retains authority over application composition and lifecycle ownership.

## Alternatives considered

- Registering profiles as commands requires filesystem discovery and makes parsing depend on installed profiles.
- Giving profiles priority over built-in commands makes installing a profile change the meaning of plugin-management invocations.
- Last-wins profile selection can launch a different app from the leading name; explicit rejection avoids that ambiguity.

## Consequences

Custom profiles and shipped profiles share one shorthand without adding public types. Names must immediately follow `dsh`; an unknown name reaches the existing missing-profile diagnostic. Removing the dedicated `web` command also lets an already selected profile receive `web` as an app argument. Parser equivalence tests, built-bin acceptance, and the keyless headless tool round trip cover the shared launch path.
