> 自动同步的官方参考原文。来源：[snapshots/web/sidebar-browser/browser.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/sidebar-browser/browser.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Sidebar Browser

- HTTPS sandbox: allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox
- Permissions Policy: browser defaults
- Sandbox toggle: per-tab and temporary
- Unknown navigation: marker shown; Back, Forward, and external-open disabled
- HTTPS history: one -> two -> one -> two
- Loopback HTTP: loaded under the default sandbox
- Invalid protocol: Only HTTP and HTTPS addresses are supported; use Document Preview for local files.
