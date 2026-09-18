> 自动同步的官方参考原文。来源：[.agents/notes/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Agent Notes

Agent Notes are effectively RFCs written by agents: durable proposals and decision records that preserve rationale, alternatives, consequences, and required verification. Follow the [documentation standard](../documentation/agents-d00743dc4e.md) and the [Agent Note rules](readme-3ae47a418e.md).

**Every new Agent Note triggers a supersession check.** Search the active tree for older notes covering the same decision or mechanism, classify any full or partial supersession with [`dsh-archive-agent-notes`](../agents/skill-3d506d83d4.md), and archive every qualifying implemented triplet in the same PR. Keep partial supersessions active and cross-linked.

Files under [`archived/`](agents-012ed6cbd8.md) are frozen historical snapshots: never edit them or treat them as current authority.
