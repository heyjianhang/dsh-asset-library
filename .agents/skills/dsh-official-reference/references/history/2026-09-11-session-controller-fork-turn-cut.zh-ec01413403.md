> 自动同步的官方参考原文。来源：[.agents/notes/implemented/bug-fix/2026-09-11-session-controller-fork-turn-cut.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/notes/implemented/bug-fix/2026-09-11-session-controller-fork-turn-cut.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

# Agent Note: Session Controller 分叉截到选中轮次的结束事件

Status: implemented

English | [中文](2026-09-11-session-controller-fork-turn-cut-37dc381d65.md)

## Problem

用户输入会先进入持久化 inbox，再出现对应的 `turn/start`。如果已结束轮次的分叉继续复制后面的轮次间事件，就可能复制下一条输入的入队事件，却没有复制其后的出队事件。继续子会话时，就会执行选中轮次之后的输入。

## Decision

[Session Controller](../packages/readme.zh-fb9779db1c.md) 复制截至选中 `turn/end` 的连续前缀，并包含该事件。显式锚点选择位于锚点或其后的第一条结束事件；省略锚点或锚点超出日志末尾时，选择最后一条结束事件。结束事件之后的所有事件均不属于种子，包括排队输入、标题和模型设置。

底层 `SessionStore.fork()` 保留[纯日志事件决策](2026-07-28-remove-synthetic-log-only-turns.zh-710140acbb.md)规定的显式稳定事件语义。在控制器中选择已结束轮次，不代表请求复制到更晚的稳定事件。

## Alternatives considered

**仅在下一条 inbox 事件处停止。** 按事件类型添加例外仍会复制选中轮次之后的无关状态变化，并要求控制器分类插件所属的事件。

**复制尾部后清空子会话 inbox。** 清空操作会添加子会话事件，以取消本来就在所请求前缀之外的输入，同时仍然继承选中轮次之后的其他状态。

## Consequences

分叉继承截至选中轮次记录的配置。之后的配置和标题事件被排除。客户端可以独立设置子会话的分叉标题。已经位于选中前缀内的事件保留通常的回放语义；本决策不重新定义在选中结束事件之前入队的待处理输入。

## Verification

控制器测试执行生产循环，检查从 A 分叉后发送 C 时，子会话历史不包含父会话后续的 B，并且只产生一次模型请求。消息、结束事件、省略及越界锚点共用此断言。模型路由覆盖排除了后续配置变更。Web 消息操作快照在已结束轮次后植入排队输入，验证分叉操作创建的子会话不包含该输入或其入队事件。
