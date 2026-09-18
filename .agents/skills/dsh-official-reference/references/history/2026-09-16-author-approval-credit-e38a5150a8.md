> 自动同步的官方参考原文。来源：[.agents/notes/implemented/process/2026-09-16-author-approval-credit.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/process/2026-09-16-author-approval-credit.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Author approval credit

Status: implemented

English | [中文](2026-09-16-author-approval-credit.zh-7a23b5ca13.md)

## Problem

The approval policy needs author experience to contribute enough points for an established author and one ordinary reviewer to meet the two-point requirement.

## Decision

The [approval policy](../repository/readme-d90e0e7bcf.md) awards 0.011 points per merged PR in this repository, capped at 1.1 points after 100 PRs. History lookup stops at 100 matching PRs. Author credit alone remains insufficient, and blocking reviews still prevent approval.

## Alternatives considered

**Keep the 0.6-point cap at 150 PRs.** That cap cannot combine with an ordinary one-point review to meet the requirement without an ownership boost.

## Consequences

One ordinary approval with no ownership boost meets the requirement at 91 merged PRs; 90 yields only 1.99 points. The lower counting cap limits required history traversal for prolific authors. Merged PR count measures contribution history rather than review quality.

## Verification

Policy tests cover credit below, at, and above the cap; the 90/91-PR approval threshold; author-only rejection; pagination; and below-threshold scores whose display rounds to two.
