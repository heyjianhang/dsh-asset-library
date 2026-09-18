> 自动同步的官方参考原文。来源：[vendor/logger-console/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/vendor/logger-console/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# @cordisjs/plugin-logger-console

Console exporter for the built-in Cordis logger service.

## Usage

```ts
import { Context } from 'cordis'
import ConsoleLogger from '@cordisjs/plugin-logger-console'

const root = new Context()
await root.plugin(ConsoleLogger, {
  showDiff: true,
  levels: {
    default: 2,
    hmr: 3,
  },
})

root.logger('app').info('started')
```

## Config

| Field | Description |
| --- | --- |
| `colors` | Color support level, or `false` to disable colors. |
| `maxLength` | Maximum rendered line length before truncation. |
| `levels` | Per-logger minimum level map. |
| `showDiff` | Show elapsed time since the previous message. |
| `showTime` | Timestamp template. |
| `label` | Label width, margin, and alignment options. |

The Node entry uses `node:util.inspect` for `%o` and `%O`; the browser entry
passes log arguments through to `console`.
