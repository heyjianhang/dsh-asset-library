> 自动同步的官方参考原文。来源：[packages/web/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/AGENTS.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# AGENTS.md — Web Packages

These rules supplement the package conventions in [packages/AGENTS.md](agents-0c2589e647.md).

- **Reject redirects on credential-bearing provider requests.** Configure the HTTP client to fail before following any redirect response. Regression coverage must prove that the redirect target is not contacted and that every credentialed provider opts into the policy. The configured endpoint necessarily receives the initial request; this prevents automatic forwarding of credentials or request data to another origin, not compromise of the configured endpoint.
