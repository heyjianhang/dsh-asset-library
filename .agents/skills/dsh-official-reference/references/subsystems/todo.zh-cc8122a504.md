> 自动同步的官方参考原文。来源：[docs/subsystems/todo.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/todo.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Todo

[English](todo-f4e162d037.md) | 中文

本页记录 [`@deepseek-ai/dsh-tool-todo`](../packages/readme.zh-0893c519f5.md) 拥有的持久 todo 词汇。面向模型的工具会整体替换一个 agent（智能体）会话的列表；该包还拥有事件声明、回放投影和不变量配套插件。工具行为与配置见[包 README](../packages/readme.zh-0893c519f5.md)。

源码：[`packages/todo/tool-todo/src/types.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/todo/tool-todo/src/types.ts)

## `TodoItem`：一条列表项

```ts type-equiv
/**
 * One entry in an agent's todo list — the unit of the `todo/write`
 * whole-list snapshot declared by this package.
 *
 * Deliberately minimal: a human-readable `content` line and a three-state
 * `status`. No id, priority, or `activeForm` — the list is replaced wholesale
 * on every write (last-write-wins), so entries need no stable identity. The
 * three statuses describe the complete portable lifecycle needed by model and
 * UI consumers.
 */
interface TodoItem {
  /** What this task is — a short imperative line shown in the UI. */
  content: string
  /** Lifecycle state. `in_progress` marks a task being worked now; parallel work may mark several. */
  status: 'pending' | 'in_progress' | 'completed'
}
```

## 持久事件与不变量

该包通过声明合并把 `todo/write: { todos: TodoItem[] }` 加入 `SessionEventMap`。此事件仅写入日志，并携带完整替换列表；生成的[持久化目录](../architecture/persistence-catalog.zh-5575fccc0c.md#todowrite--log-only)会记录其声明位置。该包的不变量配套插件会单次遍历校验现有会话和新发布的会话，随后增量追踪已提交的轮次边界，使每个实时 `todo/write` 都能在追加前得到校验，而无需重新扫描日志。
