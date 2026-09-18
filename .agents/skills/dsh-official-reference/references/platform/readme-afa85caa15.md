> 自动同步的官方参考原文。来源：[native/system/packages/linux-x64/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/packages/linux-x64/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Prebuilt Landlock launcher and POSIX flock addons for Linux x64."
kind: "package-library"
---
# @deepseek-ai/node-addon-system-linux-x64

English | [中文](readme.zh-1dbbaae495.md)

This platform package contains the static musl executable `bin/landlock-run` and Node-API v8 addons `bin/glibc/system.node` and `bin/musl/system.node`. The entry chooses the addon matching the running Node process's libc; the Landlock executable serves both libc systems.

The package contains no JavaScript or installation build script. Platform prepack checks complete payloads, ELF architecture, Node-API exports, and launcher executability; the installed-artifact rehearsal checks bytes and executes native behavior. See the workspace [support matrix](support-matrix-2ad7edd0ef.md).
