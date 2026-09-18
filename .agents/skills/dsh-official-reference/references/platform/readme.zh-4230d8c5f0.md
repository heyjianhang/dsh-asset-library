> 自动同步的官方参考原文。来源：[native/system/packages/linux-arm64/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/packages/linux-arm64/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "为 Linux arm64 提供预编译 Landlock 启动器和 POSIX flock addon。"
kind: "package-library"
---
# @deepseek-ai/node-addon-system-linux-arm64

[English](readme-b39cbfd750.md) | 中文

此平台包包含静态 musl 可执行文件 `bin/landlock-run`，以及 Node-API v8 addon `bin/glibc/system.node` 和 `bin/musl/system.node`。入口会选择与正在运行的 Node 进程所用 libc 匹配的 addon；Landlock 可执行文件在两种 libc 系统上共用。

包中没有 JavaScript 或安装编译脚本。平台 prepack 检查产物完整性、ELF 架构、Node-API 导出和启动器可执行权限；已安装产物演练核对字节并执行原生行为。参见工作区的[支持矩阵](support-matrix-2ad7edd0ef.md)。
