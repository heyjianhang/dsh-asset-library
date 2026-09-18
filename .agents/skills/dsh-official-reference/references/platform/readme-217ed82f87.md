> 自动同步的官方参考原文。来源：[python/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/python/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# DeepSeek Harness Python SDK

English | [中文](readme.zh-f171229475.md)

Python packages for driving DeepSeek Harness as a subprocess. The client SDK communicates with the bundled runtime over newline-delimited JSON-RPC on stdio.

## Packages

| Directory | Dist / module | Role |
|---|---|---|
| [sdk](readme-6d1b4a1817.md) | `deepseek-harness-sdk` / `deepseek_harness` | High-level turns API and lower-level JSON-RPC client |
| [sdk-runtime](readme-7ac3b70796.md) | `deepseek-harness-runtime-bin` / `deepseek_harness_runtime` | Bundled `dsh` CLI executable and native sidecars |

## Behavior

The SDK starts the matching bundled `dsh --profile sdk` runtime unless the caller selects another `dsh` executable or profile. The runnable minimal example selects the shipped standalone `sdk-minimal` profile; the same runtime also packages `dsh web` and its frontend assets for separate CLI use. Every launch requires an explicitly selected Harness home; Python never silently reads `~/.dsh`. The [SDK reference](readme-6d1b4a1817.md) and [runtime carrier reference](readme-7ac3b70796.md) own runtime selection, profiles, patches, and external plugin management.

## Contributor workflows

The [Python contributor workflows](development-df83d49512.md) cover building runtime artifacts, validating the packages, source-mode development, and distribution.
