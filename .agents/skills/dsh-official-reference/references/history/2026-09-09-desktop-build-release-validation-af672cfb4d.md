> 自动同步的官方参考原文。来源：[.agents/notes/implemented/architecture/2026-09-09-desktop-build-release-validation.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/architecture/2026-09-09-desktop-build-release-validation.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Verify Desktop release compatibility during packaging

Status: implemented

English | [中文](2026-09-09-desktop-build-release-validation.zh-681ba404c1.md)

## Problem

The shell and runtime descriptor ship together. Comparing their release facts on every launch repeats packaging checks without proving that installed executable bytes match the descriptor.

## Decision

The packaging verifier owns descriptor schema, shell version, platform, architecture, declared Host protocol version, and Node/pnpm semver validation. Startup reads the fields needed for profile preparation and retains shared-package record and Host-entry checks. The actual Host ready message still validates its protocol version.

This partially supersedes startup release compatibility checks in the [bundled-runtime decision](2026-09-08-desktop-bundled-runtime-and-external-plugins-4046ea823c.md). That note retains package ownership and distribution rationale.

## Alternatives considered

Repeating descriptor comparisons can diagnose a mixed installation earlier, but cannot establish executable integrity. Reintroducing them requires a concrete installation failure that packaging validation and actual Host diagnostics cannot adequately explain.

## Consequences

Startup does not reject a descriptor solely because its declared release schema, target, or Host protocol differs, or its Node/pnpm version strings are not semver. Packaging still rejects these cases and shell-version mismatch. Tests distinguish startup reads from packaging verification.
