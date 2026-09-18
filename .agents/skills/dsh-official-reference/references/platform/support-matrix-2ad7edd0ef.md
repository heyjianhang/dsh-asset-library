> 自动同步的官方参考原文。来源：[native/system/docs/support-matrix.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/docs/support-matrix.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Support matrix

| Platform package suffix | Builder | Payload |
|---|---|---|
| linux-x64 | ubuntu-24.04 | static Landlock executable; glibc and musl system.node |
| linux-arm64 | ubuntu-24.04-arm | static Landlock executable; glibc and musl system.node |
| darwin-x64 | macos-15-intel | system.node |
| darwin-arm64 | macos-latest | system.node |

The stable Node-API v8 addon is built once per platform/libc and exercised by CI under Node 20, 22, 24, and 26. macOS builds target 11.0 or later. Linux binding selection uses the running Node process's libc; the static launcher serves both libc variants.

Landlock additionally requires an enforcing Linux kernel. The functional probe determines full, partial, or unusable enforcement; kernel version alone is not an availability guarantee.

Windows has neither a Landlock launcher nor this POSIX addon. The Harness retains its existing Windows semaphore implementation. Other CPU/OS combinations have no published platform package: Landlock probes unusable, and flock acquisition rejects. New platform support requires a native builder and installed-artifact verification.
