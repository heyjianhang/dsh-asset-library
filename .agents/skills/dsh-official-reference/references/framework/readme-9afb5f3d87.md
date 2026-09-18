> 自动同步的官方参考原文。来源：[vendor/timer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/vendor/timer/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# @cordisjs/plugin-timer

Disposal-aware timer service for Cordis.

## Usage

```ts
import { Context } from 'cordis'
import Timer from '@cordisjs/plugin-timer'

const root = new Context()
await root.plugin(Timer)

const dispose = root.timeout(() => {
  root.logger.info('done')
}, 1000)

dispose()
```

Timer handles are registered on the current fiber, so they are cleared
automatically when the plugin that created them is disposed.

## API

| API | Description |
| --- | --- |
| `ctx.timeout(callback, delay)` | Run once and return a disposer. |
| `ctx.timeout(delay)` | Return a promise that resolves after `delay`. |
| `ctx.interval(callback, delay)` | Run repeatedly and return a disposer. |
| `ctx.interval(delay)` | Return an async iterator that yields on each interval. |
| `ctx.throttle(callback, delay, noTrailing?)` | Return a throttled function with `.dispose()`. |
| `ctx.debounce(callback, delay)` | Return a debounced function with `.dispose()`. |

`ctx.setTimeout()` and `ctx.setInterval()` are kept as deprecated aliases for
`ctx.timeout()` and `ctx.interval()`.
