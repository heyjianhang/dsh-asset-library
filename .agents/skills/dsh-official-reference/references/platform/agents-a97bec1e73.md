> 自动同步的官方参考原文。来源：[apps/cli/tests/profiles/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/cli/tests/profiles/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Profile integration tests

This tree owns cross-package behavior of shipped `dsh` profiles. Start product scenarios through `apps/cli/src/bin.ts` with `--profile <name>` or the `<name>` shorthand; a test-only Loader driver is allowed only when the public profile output cannot expose the asserted internal evidence.

Keep a composition here only when the CLI profile assembly is the subject. Move package-specific Loader configurations and drivers into that package's `tests/fixtures/`. Recorded-session replay belongs under top-level `snapshots/`; other expected output uses `*.expected.e2e.ts` and an owner-local `expected/` directory.

User-facing optional overlays live under `apps/cli/config/examples/` and have a published guide under `docs/user/`. They are product assets, not test fixtures.
