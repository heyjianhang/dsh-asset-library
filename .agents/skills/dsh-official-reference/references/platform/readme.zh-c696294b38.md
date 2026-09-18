> 自动同步的官方参考原文。来源：[benchmarks/active-stream-reconnect/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/benchmarks/active-stream-reconnect/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# 活跃 Assistant 重连基准

[English](readme-fb03397f40.md) | 中文

[reconnect.bench.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/benchmarks/active-stream-reconnect/reconnect.bench.client.ts) 测量重连携带一个包含 100,000 个 delta、尚未完成的 reasoning 前缀时，生产 Client 的折叠成本。编译后的私有适配器调用 `ClientAssistantStream.replace()`，不增加产品导出。三个全新的纯 Node worker 在计时前合成紧凑基线；替换时间与强制 GC 后的保留堆分别执行中位数预算检查。下一个稠密序号的实时 frame 仍须被接受。标准托管 CI 使用 50 ms 替换预期及共享的 1.25× 余量（上限为 63 ms）；保留 heap 预算仍为 30 MiB。实测样本和合成回归对照使用与 worker 判定相同的时间断言。

通过 `pnpm run build:bench` 构建，再在 `vitest.bench.config.ts` 中选择 `benchmarks/active-stream-reconnect`。这项针对 Node 的工作负载既不构建也不测量浏览器渲染。[前端性能预算](../history/2026-09-06-frontend-performance-budgets.zh-2338cf8905.md)记录校准与排除项。
