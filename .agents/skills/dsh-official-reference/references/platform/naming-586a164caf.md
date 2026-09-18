> 自动同步的官方参考原文。来源：[native/system/docs/naming.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/native/system/docs/naming.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Naming

## npm packages

The public package family belongs to the `@deepseek-ai` scope and uses the `node-addon-system` package prefix; platform packages append platform information only:

```text
@deepseek-ai/node-addon-system
@deepseek-ai/node-addon-system-<platform>
```

Platform suffixes carry OS and CPU. Linux libc variants live inside the same platform package and are declared in `prebuilds.json`.

## Binaries

The Linux launcher remains `bin/landlock-run`. The Node-API addon is `system.node`: `bin/glibc/system.node` and `bin/musl/system.node` on Linux, `bin/system.node` on macOS.

## Environment variables

The `NALR_` prefix (Node Addon Landlock Run) is reserved for build/test orchestration:

```text
NALR_REQUIRE_LANDLOCK   test-only: an unenforcing kernel fails instead of skipping
```

Runtime binaries and entry packages read NO environment variables — a runtime safety rule ([AGENTS.md](agents-ae7a3747e6.md)), not a naming convention. Do not include the npm scope in environment variable names.

## C symbols

The launcher is a single C file with static linkage; there is no exported symbol namespace. Kernel UAPI constants keep their kernel names prefixed `LL_` where locally defined.
