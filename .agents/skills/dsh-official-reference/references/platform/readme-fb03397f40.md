> 自动同步的官方参考原文。来源：[benchmarks/active-stream-reconnect/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/benchmarks/active-stream-reconnect/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Active Assistant reconnect benchmark

English | [中文](readme.zh-c696294b38.md)

[reconnect.bench.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/benchmarks/active-stream-reconnect/reconnect.bench.client.ts) measures the production Client fold when a reconnect carries an unfinished 100,000-delta reasoning prefix. A compiled private adapter reaches `ClientAssistantStream.replace()` without adding product exports. Three fresh plain-Node workers synthesize the compact baseline before timing; replacement time and retained heap after forced GC have separate median budgets. The next dense live frame must still be accepted. Standard hosted CI uses a 50 ms replacement expectation with the shared 1.25× headroom (63 ms ceiling); the retained-heap budget remains 30 MiB. Recorded-sample and synthetic-regression controls exercise the same time assertion as the worker verdict.

Build with `pnpm run build:bench`, then select `benchmarks/active-stream-reconnect` in `vitest.bench.config.ts`. This focused Node workload neither builds nor measures browser rendering. [Frontend performance budgets](../history/2026-09-06-frontend-performance-budgets-9d4c937e44.md) records calibration and exclusions.
