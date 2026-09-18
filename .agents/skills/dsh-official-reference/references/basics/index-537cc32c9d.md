> 自动同步的官方参考原文。来源：[docs/user/develop/basic/index.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/index.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Your first plugin

English | [中文](index.zh-d73377cd11.md)

This tutorial creates a minimal Harness plugin and loads it into the Web UI. Start from a repository checkout that has completed the [run-from-source path](../repository/readme-b335630551.md#run-from-source).

## Create a local project

From the repository root, create a scratch project for the tutorial:

```sh
mkdir -p scratch-plugin/src
```

## What is a plugin?

In Harness, a plugin is a TypeScript module that exports an `apply` function. The framework calls `apply` when loading the plugin and passes a `ctx` context object through which the plugin registers capabilities:

```ts
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-plugin'

export function apply(ctx: Context) {
  // Register capabilities here.
}
```

That is the complete configuration.

## Create the plugin file

Create `scratch-plugin/src/my-plugin.ts`:

```ts
import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}
```

## Register it in cordis.yml

Run `pwd` from the repository root, then create `scratch-plugin/cordis.yml` as a Web overlay that inserts the local plugin. Replace `/absolute/path/to/deepseek-harness` below with the printed path:

```yaml
- insert:
    - id: hello
      name: '/absolute/path/to/deepseek-harness/scratch-plugin/src/my-plugin.ts'
```

The plugin path must be absolute. A patch file contributes configuration but does not change the profile directory from which the loader resolves module paths.

Start the Web UI with that overlay:

```sh
pnpm dsh web --patch ./scratch-plugin/cordis.yml
```

Open `http://127.0.0.1:3080`. The terminal prints `[hello-plugin] plugin loaded!` during startup.

## Automatic cleanup

Anything registered through `ctx`—event listeners, tools, or timers—is cleaned up when the plugin unloads. You do not need to call removeListener or clearInterval manually.

For a resource that needs explicit cleanup, such as a network connection, use `ctx.effect()` to provide its disposer:

```ts
import type { Context } from '@deepseek-ai/cordis'

export function apply(ctx: Context) {
  ctx.effect(() => {
    const timer = setInterval(() => {
      console.log('heartbeat')
    }, 5000)

    // The returned function runs when the plugin unloads.
    return () => clearInterval(timer)
  })
}
```

## Declare dependencies

If the plugin consumes another service such as `tools` or `llm`, declare it in `inject`:

```ts ignore-check
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-tool-plugin'
export const inject = ['tools']

export function apply(ctx: Context) {
  // ctx.tools is ready here.
  ctx.tools.register(/* ... */)
}
```

The framework waits for every required service before loading the plugin.

## Three plugin forms

In addition to a function module, a plugin can use object or class form.

### Object form

```ts
import type { Context } from '@deepseek-ai/cordis'

export default {
  name: 'my-plugin',
  inject: ['tools'],
  apply(ctx: Context) {
    // ...
  },
}
```

### Class form

```ts
import { Service, type Context } from '@deepseek-ai/cordis'

export default class MyService extends Service {
  static inject = ['tools']

  constructor(ctx: Context) {
    super(ctx, 'myService')
    // Perform synchronous initialization in the constructor.
  }
}
```

Function form is sufficient in most cases. Use class form when the plugin provides a service to other plugins; see [services and dependencies](../framework/service-6e43fa3a30.md).

## Next steps

- [Build a tool](tool-4fb3be243c.md) — learn the tool definition DSL
- [Plugin configuration](config-5542d185a0.md) — accept user configuration
- [Cordis tutorial](../framework/index-f5e0713c72.md) — the plugin framework underneath, built from a scratch directory with no API key
