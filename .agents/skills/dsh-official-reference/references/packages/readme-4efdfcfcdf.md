> 自动同步的官方参考原文。来源：[packages/shell/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "The bash capability family for deployments and maintainers choosing and composing a shell executor, sandboxing, and the model-facing bash and pwsh tools."
kind: "package-group"
---

# shell/ — bash capability family

English | [中文](readme.zh-bfa63a0e83.md)

## Summary

The shell group provides command execution to agents: run a foreground command and read its bounded output, or start a background process and poll it, on POSIX with Bash and on Windows with PowerShell. Exactly one executor implementation is mounted per composition; the sandboxing executors confine every command through the sandbox capability, and the model-facing `bash` and `pwsh` tools sit on top of whichever executor is mounted. Choose a Bash executor for POSIX, a PowerShell executor for Windows, and pick the sandboxing variant when commands need file-level confinement.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

| Package | Role | ctx key |
|---|---|---|
| [`shell`](readme-6f22711136.md) | Defines the executor contract: foreground runs, background handles, and request resolution | `ctx.shell` |
| [`bash-local`](readme-d74abbec64.md) | Runs Bash commands as fresh `bash -c` processes on POSIX | registers `ctx.shell` |
| [`bash-sandbox`](readme-97dcac6c52.md) | Runs Bash commands confined through the sandbox capability, reporting denials as facts | registers `ctx.shell` |
| [`pwsh-local`](readme-207a7658ca.md) | Runs PowerShell commands as fresh `pwsh -Command` processes on Windows | registers `ctx.shell` |
| [`pwsh-sandbox`](readme-8f72260098.md) | Runs PowerShell commands confined through the sandbox capability | registers `ctx.shell` |
| [`shell-env`](readme-003c97aa4d.md) | Supplies the managed `DSH_*` environment every shell command receives | `ctx.shellEnv` |
| [`tool-bash`](readme-2c83fb0a50.md) | Exposes Bash execution and background jobs to the model as the `bash` tool | registers on `ctx.tools` |
| [`tool-bash-persistent`](readme-7e920c3556.md) | Runs model shell calls in one owner-isolated persistent Bash session | registers on `ctx.tools` |
| [`tool-pwsh`](readme-09206aeef7.md) | Exposes PowerShell execution to the model as the `pwsh` tool | registers on `ctx.tools` |
| [`tool-pwsh-persistent`](readme-603799d620.md) | Runs model shell calls in one owner-isolated persistent PowerShell session | registers on `ctx.tools` |

A profile layer selects exactly one executor implementation (the win32 layer swaps the POSIX rows for the pwsh ones; mounting two fails loudly at load time on the duplicate service registration) and the model-facing tools it needs. A sandboxed composition also selects a `ctx.sandbox` provider and `ctx.sandboxPolicy`; the [base bundle](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/base/cordis.patch.yml) owns the shipped wiring.

-----

<a id="related-documentation"></a>
## Related documentation

- [Bash executor subsystem](../subsystems/shell-8bac0cbd82.md) — the shared request/spec vocabulary, results, background processes, and the complete service contract.
- [Sandbox subsystem](../subsystems/sandbox-627ec2f04b.md) — the confinement capability the sandboxing executors consume.

<a id="dev-note"></a>
## Dev Note

None.
