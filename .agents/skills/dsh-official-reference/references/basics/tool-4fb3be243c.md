> 自动同步的官方参考原文。来源：[docs/user/develop/basic/tool.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/tool.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Build a tool

English | [中文](tool.zh-4a0b5d3394.md)

This tutorial adds a `greet` tool to the Web UI. Complete [Your first plugin](index-537cc32c9d.md) first and keep its `scratch-plugin` directory.

## Create the tool plugin

Replace `scratch-plugin/src/my-plugin.ts` with:

```ts
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'greet-tool'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'greet',
    description: 'Greet someone by name.',
    parameters: {
      name: { type: 'string', required: true, description: 'The name to greet' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      return `Hello, ${args.name}!`
    },
  }))
}
```

`inject` makes Cordis wait for the tool registry. `defineTool` infers and validates `args` from `parameters`; `execute` returns the canonical value declared by `output.schema`, and `output.render` converts that value to model-facing content.

## Run and call the tool

Restart the development command if it is not running:

```sh
pnpm dsh web --patch ./scratch-plugin/cordis.yml
```

Open `http://127.0.0.1:3080` and ask: `Use the greet tool to greet Ada.` The model can call `greet` and receives `Hello, Ada!` as the tool result.

## Next steps

- [Plugin configuration](config-5542d185a0.md) — make the greeting configurable.
- [Tool authoring reference](../practice/adding-a-tool-8ee371d755.md) — look up nested schemas, canonical values, background work, policy hooks, PTC mode, and UI cards.
- [Capability layering](../practice/index-e8b746a7a5.md) — split a replaceable capability into Service Definition, Service Provider, and Consumer packages.
