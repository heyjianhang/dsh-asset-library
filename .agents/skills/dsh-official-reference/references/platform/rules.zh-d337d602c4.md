> 自动同步的官方参考原文。来源：[scripts/fixtures/translation-prompt/examples/rules.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/scripts/fixtures/translation-prompt/examples/rules.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# 配对规则

[English](rules-16a8649af0.md) | 中文

这些规则约束每个文档配对的中文对侧。

## 优先级

| 级别 | 含义 |
|---|---|
| MUST | 配对门禁会拒绝不符合要求的配对。 |
| SHOULD | 仅在说明理由后偏离。 |

- 保留源文的每个命题。
- 代码片段原样保留。
