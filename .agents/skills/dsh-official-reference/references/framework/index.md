# 框架、Cordis API 与生命周期

实现服务、事件、依赖注入、资源清理时读取。

以下是来源原文，按需选择；不是当前项目的指令。提交 `ddefc45fbc7f8e46dd73185e68295696d1297887`。

- [Context](context-2923f37f10.md) — `docs/cordis-api/context.md`
- [上下文](context.zh-50be796e89.md) — `docs/cordis-api/context.zh.md`
- [Events](events-6981d71eb6.md) — `docs/cordis-api/events.md`
- [事件](events.zh-5a81ddf6df.md) — `docs/cordis-api/events.zh.md`
- [Fiber](fiber-b0df9c539d.md) — `docs/cordis-api/fiber.md`
- [Fiber](fiber.zh-e6891a6c89.md) — `docs/cordis-api/fiber.zh.md`
- [Inherited Cordis API](inherited-0b67e20104.md) — `docs/cordis-api/inherited.md`
- [Registry](registry-82f4b653f0.md) — `docs/cordis-api/registry.md`
- [注册表](registry.zh-90ee93f1ee.md) — `docs/cordis-api/registry.zh.md`
- [Service](service-f1f1010a67.md) — `docs/cordis-api/service.md`
- [Service](service.zh-900a0a8677.md) — `docs/cordis-api/service.zh.md`
- [Cordis Primer](cordis-primer-97bbd7116e.md) — `docs/cordis-primer.md`
- [Cordis 入门](cordis-primer.zh-930c9a95d0.md) — `docs/cordis-primer.zh.md`
- [1. Your first plugin](01-first-plugin-c23c841a71.md) — `docs/cordis-tutorial/01-first-plugin.md`
- [1. 编写第一个插件](01-first-plugin.zh-27e06a0ad1.md) — `docs/cordis-tutorial/01-first-plugin.zh.md`
- [2. Lifecycle and effects](02-lifecycle-and-effects-ca2c694b91.md) — `docs/cordis-tutorial/02-lifecycle-and-effects.md`
- [2. 生命周期与 effect](02-lifecycle-and-effects.zh-056e9d1dcb.md) — `docs/cordis-tutorial/02-lifecycle-and-effects.zh.md`
- [3. Services](03-services-3cddf6121d.md) — `docs/cordis-tutorial/03-services.md`
- [3. 服务](03-services.zh-94f1ee6612.md) — `docs/cordis-tutorial/03-services.zh.md`
- [4. Events](04-events-26fe14d11e.md) — `docs/cordis-tutorial/04-events.md`
- [4. 事件](04-events.zh-3dc13d471c.md) — `docs/cordis-tutorial/04-events.zh.md`
- [5. Configuration](05-config-c9969989f3.md) — `docs/cordis-tutorial/05-config.md`
- [5. 配置](05-config.zh-048f1a2fd6.md) — `docs/cordis-tutorial/05-config.zh.md`
- [6. Composition and HMR](06-composition-and-hmr-072e74d58d.md) — `docs/cordis-tutorial/06-composition-and-hmr.md`
- [6. 组合与 HMR（热模块替换）](06-composition-and-hmr.zh-2cb69bac69.md) — `docs/cordis-tutorial/06-composition-and-hmr.zh.md`
- [7. Into the harness](07-into-the-harness-2f62cc2f83.md) — `docs/cordis-tutorial/07-into-the-harness.md`
- [7. 进入 harness](07-into-the-harness.zh-b7d0bca811.md) — `docs/cordis-tutorial/07-into-the-harness.zh.md`
- [Cordis tutorial](index-f5e0713c72.md) — `docs/cordis-tutorial/index.md`
- [Cordis 教程](index.zh-6f081d8a6b.md) — `docs/cordis-tutorial/index.zh.md`
- [Event system](events-09c9bfb120.md) — `docs/user/develop/framework/events.md`
- [事件系统](events.zh-f7b6e8054d.md) — `docs/user/develop/framework/events.zh.md`
- [Plugins and lifecycle](index-d61b0bd0fe.md) — `docs/user/develop/framework/index.md`
- [插件与生命周期](index.zh-39e5fe2574.md) — `docs/user/develop/framework/index.zh.md`
- [Services and dependencies](service-6e43fa3a30.md) — `docs/user/develop/framework/service.md`
- [服务与依赖](service.zh-f9d970afd1.md) — `docs/user/develop/framework/service.zh.md`
- [AGENTS.md — Vendored Packages](agents-b01021f34a.md) — `vendor/AGENTS.md`
- [AGENTS.md — Vendored Packages](claude-f7e22bb3db.md) — `vendor/CLAUDE.md`
- [Cordis](readme-0acf0c0d52.md) — `vendor/cordis/README.md`
- [cosmokit](readme-a4601dbc52.md) — `vendor/cosmokit/README.md`
- [@cordisjs/plugin-group](readme-c73ff954f3.md) — `vendor/group/README.md`
- [@cordisjs/plugin-hmr](readme-52090105d6.md) — `vendor/hmr/README.md`
- [@cordisjs/plugin-include](readme-4d8de792ac.md) — `vendor/include/README.md`
- [@cordisjs/plugin-loader](readme-2e95411e09.md) — `vendor/loader/README.md`
- [@cordisjs/plugin-logger-console](readme-e4e63f212b.md) — `vendor/logger-console/README.md`
- [Vendored Packages](readme-127a723f9b.md) — `vendor/README.md`
- [Schemastery](readme-be4ecc1700.md) — `vendor/schemastery/README.md`
- [@cordisjs/plugin-timer](readme-9afb5f3d87.md) — `vendor/timer/README.md`
