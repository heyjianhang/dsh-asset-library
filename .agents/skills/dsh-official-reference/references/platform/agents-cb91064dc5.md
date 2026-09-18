> 自动同步的官方参考原文。来源：[scripts/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Repository scripts

Gate scripts invoke pnpm shell-free, normalize repository-relative glob paths to `/` at ingestion, and keep platform adaptation in the gate that needs it instead of a shared platform layer. Source-ownership gates use syntax-aware discovery, guard against an empty or narrowed corpus, and test every admitted/excluded form that changes their detection boundary.

Script specs run in forked workers beside the rest of the suite and beside the other gate processes in their job, so own every port, temporary path, and child process a spec acquires. A spec that passes only when it runs alone is a defect in the spec; [the testing policy](../architecture/testing-c22885d97f.md#how-specs-execute) states the execution model and [dsh-ci-test-reliability](../agents/skill-26f0f1a0f1.md) owns the rules.
