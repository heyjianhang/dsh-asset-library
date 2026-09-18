> 自动同步的官方参考原文。来源：[.agents/notes/implemented/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Implemented Agent Notes

These Agent Notes describe shipped decisions. Follow the [root instructions](../repository/agents-a54ff182c7.md), [documentation standard](../documentation/agents-d00743dc4e.md), and [Agent Note format](readme-3ae47a418e.md#the-file-format); `verify-agent-note-format` gates the lifecycle-specific structure.

## Keep an implemented Agent Note current with what actually shipped

Keep paths, symbols, defaults, and mechanisms current in the same change that alters them. Rewrite stale facts in place; do not append change history.

When a shipped note is unlikely to guide future work, archive its complete triplet through [`dsh-archive-agent-notes`](../agents/skill-3d506d83d4.md) instead of continuing to maintain it.

### This is not a license to rewrite the *decision*

Update factual realization in place. A reversal of the decision or its rationale requires a new Agent Note and cross-link; a fully superseded old note may be deleted only through the consolidation rule in the [Agent Note rules](readme-3ae47a418e.md).
