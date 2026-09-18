> 自动同步的官方参考原文。来源：[native/system/packages/darwin-x64/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/packages/darwin-x64/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Prebuilt system.node for macOS x64 POSIX locks."
kind: "package-library"
---
# @deepseek-ai/node-addon-system-darwin-x64

English | [中文](readme.zh-6e741e859d.md)

This platform package supplies `bin/system.node`, a stable Node-API v8 addon used by `@deepseek-ai/node-addon-system/flock`. It contains no Landlock executable, JavaScript loader, or installation build script. The native workflow builds it on macOS x64 and owns its installed-artifact validation.
