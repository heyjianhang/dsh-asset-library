> 自动同步的官方参考原文。来源：[vendor/group/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/vendor/group/README.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# @cordisjs/plugin-group

Loader group plugin for nesting Cordis entries.

## Usage

```yaml
- id: tools
  name: '@cordisjs/plugin-group'
  group: true
  config:
    - id: logger
      name: '@cordisjs/plugin-logger-console'
```

Groups are always considered enabled themselves, but disabling a group entry
prevents its child entries from running. Nested entry ids use `:` separators,
for example `tools:logger`.

The package re-exports the `Group` implementation from
`@cordisjs/plugin-loader` as its default plugin.
