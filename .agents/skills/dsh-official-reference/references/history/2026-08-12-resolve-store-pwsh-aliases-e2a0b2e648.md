> 自动同步的官方参考原文。来源：[.agents/notes/archived/bug-fix/2026-08-12-resolve-store-pwsh-aliases.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/archived/bug-fix/2026-08-12-resolve-store-pwsh-aliases.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Resolve Microsoft Store pwsh aliases

Status: implemented
Archived: 2026-09-04

English | [中文](2026-08-12-resolve-store-pwsh-aliases.zh-26f13951dc.md)

## Problem

`resolvePwshPath` documented that Microsoft Store installs resolve through PATH, but its existence probe was `existsSync`, which stats a candidate and therefore follows reparse points. The Store's `%LOCALAPPDATA%\Microsoft\WindowsApps\pwsh.exe` is an app execution alias whose target directory ACL refuses stat (EACCES), so `existsSync` missed it and resolution silently fell through to Windows PowerShell 5.1 on hosts whose only PowerShell 7 is a Store install.

## Decision

`candidateExists` accepts a candidate that stats as a file or that lstat sees as a link-shaped reparse point, and `resolvePwshPath` uses it. Spawning the alias path works because CreateProcess resolves app execution aliases. A dangling link-shaped candidate is accepted so a broken pwsh fails loudly at spawn instead of silently downgrading to 5.1.

## Alternatives considered

**Probe the WindowsApps package directory directly.** The Store package path is versioned and ACL-hidden; hard-coding it duplicates packaging knowledge that PATH plus the alias already owns.

**Keep the 5.1 fallback for stat failures.** Rejected: it silently runs a different shell than the one installed, which is the defect this note fixes.

## Consequences

Store-installed PowerShell 7 now resolves ahead of the 5.1 fallback on Windows; real-file candidates and non-Windows behavior are unchanged. The dangling-symlink unit test pins the stat/lstat split on every platform.
