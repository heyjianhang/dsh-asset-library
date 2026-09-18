> 自动同步的官方参考原文。来源：[vendor/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/vendor/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Vendored Packages

This directory contains source-vendored copies of the Cordis framework and its foundation libraries. See `vendor/README.md` for the manifest, local-modification log, and the upstream sync procedure.

**Do NOT edit `vendor/*/src/` files casually.** Every local divergence from upstream must be logged exhaustively in `vendor/README.md` under "Local modifications." The `vendor/*/tsconfig.json` files are the exception — regenerated to fit the monorepo build, and they may be touched for type-checking policy changes (e.g., `noImplicitAny`).

When changes are unavoidable, follow the sync procedure in `vendor/README.md`.
