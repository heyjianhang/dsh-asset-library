> 自动同步的官方参考原文。来源：[native/system/packages/darwin-x64/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/packages/darwin-x64/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "为 macOS x64 POSIX 锁提供预编译 system.node。"
kind: "package-library"
---
# @deepseek-ai/node-addon-system-darwin-x64

[English](readme-3bc128e485.md) | 中文

此平台包提供 `bin/system.node`，这是一个供 `@deepseek-ai/node-addon-system/flock` 使用的稳定 Node-API v8 addon。它不包含 Landlock 可执行文件、JavaScript 加载器或安装构建脚本。Native 工作流在 macOS x64 上构建它，并负责验证安装后的产物。
