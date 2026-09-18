> 自动同步的官方参考原文。来源：[packages/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "Package map for the web access capability family: the search/fetch service, its provider backends, and the model-facing tools that consume them."
kind: "package-group"
---

# web/ — web access capability family

English | [中文](readme.zh-70b9da2370.md)

## Summary

The `web/` packages let models search the public web and fetch HTTP(S) pages through the `web_search` and `web_fetch` tools. Deployments can choose Exa, Perplexity, or DeepSeek for search and anonymous HTTP(S) access for fetch; availability and resource limits depend on the configured provider. Use this family for search and page retrieval, not interactive browsing, content extraction, or per-URL policy enforcement. Models receive consistent tool behavior, cancellation, and error reporting when providers change.

## Table of Contents

- [Packages](#packages)
- [Related documentation](#related-documentation)
- [Dev Note](#dev-note)

-----

<a id="packages"></a>
## Packages

Six packages play the web roles; the subsystem reference owns the exhaustive vocabulary and contracts.

| Package | Role | ctx key |
|---|---|---|
| [`web/`](readme-8d5238c4cf.md) | Search/fetch service: search and fetch URLs through interchangeable backends, one selection and error policy | `ctx.web` |
| [`web-search-exa/`](readme-e3aa164754.md) | Searches the web through Exa | registers on `ctx.web` |
| [`web-search-perplexity/`](readme-5f7c176af6.md) | Searches the web through Perplexity | registers on `ctx.web` |
| [`web-search-deepseek/`](readme-5293d685cf.md) | Searches the web through DeepSeek native search | registers on `ctx.web` |
| [`web-fetch-http/`](readme-823c921226.md) | Fetches public HTTP(S) pages anonymously | registers on `ctx.web` |
| [`tool-web/`](readme-bf52cfadd5.md) | Exposes `web_search` and `web_fetch` to the model | registers on `ctx.tools` |

-----

<a id="related-documentation"></a>
## Related documentation

Start with the subsystem reference for the shared vocabulary, then the design decision behind the single provider-selection service.

- [Web subsystem](../subsystems/web-dc7886985f.md) — the search/fetch requests and results, provider availability, `WebError`, and public-address enforcement.
- [Web capability seam decision](../history/2026-06-24-web-capability-seam-b3cbb6b772.md) — why search and fetch share one provider-selection service.

<a id="dev-note"></a>
## Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
