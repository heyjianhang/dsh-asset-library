> 自动同步的官方参考原文。来源：[packages/client/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/README.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

---
description: "web GUI 浏览器侧的包映射：外壳启动、浏览器与宿主通信、共享客户端服务、本地化、开发重载与 UI 功能插件。"
kind: "package-group"
---

# client/ — Web GUI 浏览器侧

[English](readme-7b3f04edbf.md) | 中文

## 概述

`client/` 组提供 dsh web GUI 的浏览器体验，包括对话、导航、设置、批准、文件访问及其他交互功能。添加浏览器中可见的行为时，请选择本系列中的包；服务端页面交付与宿主集成则使用 [`host/`](../packages/readme.zh-19768ae54a.md)。本系列同时涵盖共享浏览器基础与专门的 UI 功能，各子包 README 拥有其配置与行为说明。编写规则见 [AGENTS.md](agents-3054d3fab9.md)，下方相关文档解释跨包组合方式。

## 目录

- [包](#packages)
- [相关文档](#related-documentation)
- [开发备注](#dev-note)

-----

<a id="packages"></a>
## 包

内核包负责启动与服务于页面，UI 功能包负责呈现页面。各包的 README 拥有自己的约定与配置。

| 包 | 职责 | ctx 键 |
|---|---|---|
| [`web/`](readme.zh-fbd8e649a2.md) | 启动浏览器外壳 | — |
| [`modules/`](readme.zh-7192eb8446.md) | 加载浏览器侧客户端模块 | `ctx.clientModules` / `ctx.modules` |
| [`connection/`](readme.zh-c23c03a95a.md) | 维护浏览器与宿主之间的 RPC 通信与事件投递 | `ctx.connection` |
| [`file-upload/`](readme.zh-5a3c8622bb.md) | 在页面线程之外发送原始 Blob 与字节流请求体 | `ctx.fileUpload` |
| [`store/`](readme.zh-6c05d077e8.md) | 提供不依赖 React 的 observable 与快照存储原语 | — |
| [`hmr/`](readme.zh-ba8d0acdf8.md) | 在开发期间刷新客户端插件 | — |
| [`locale/`](readme.zh-0626c77425.md) | 提供本地化偏好与消息词典 | `ctx.locale` |
| [`test-runtime/`](../packages/readme.zh-bd7f83ca29.md) | 为客户端功能包提供共享的仓库测试支持 | — |
| [`ui-renderer/`](readme.zh-0afc995411.md) | 将 slot 数据绑定到 React，并挂载组装完成的应用 | `ctx.uiRenderer` |
| [`ui-slots/`](readme.zh-ccd46e6c25.md) | 定义类型化扩展 Slots 与可复用 Component Factory | — |
| [`ui-session/`](readme.zh-cb2711aa51.md) | 把会话控制器状态适配为标准 Slot source 与钩子 | — |
| [`ui-theme/`](readme.zh-3a29631cf6.md) | 应用所选颜色主题 | — |
| [`ui-primitives/`](readme.zh-be0cd1e476.md) | 提供共享 React 控件、图标与内容渲染器 | — |
| [`ui-attachment/`](readme.zh-49b4c2116b.md) | 注册输入框与消息图片的附件呈现 | — |
| [`ui-layout/`](readme.zh-a63ab37ef4.md) | 排列应用的主要区域 | — |
| [`ui-dockkit/`](readme.zh-53df596506.md) | 提供停靠布局操作与 React 组件 | — |
| [`ui-sidebar/`](readme.zh-99410eb40e.md) | 展示工作区与会话导航 | — |
| [`ui-sidebar-right/`](readme.zh-c7614c8744.md) | 管理右侧 Sidebar 及其 tab 类型 | `ctx.sidebarRight`, `ctx.sidebarRightTabs` |
| [`ui-sidebar-documentpreview/`](readme.zh-63facee571.md) | 在右侧 Sidebar 的 tab 中显示文档 | `ctx.documentPreviews` |
| [`ui-sidebar-browser/`](readme.zh-26b64041f8.md) | 在右侧 Sidebar tab 中浏览 sandboxed HTTP(S) 页面，包括 loopback 服务 | — |
| [`resources/`](readme.zh-133ad015be.md) | 统一资源模型：`useResource` 会话标准钩子背后的协议提供方 | `ctx.resources` |
| [`ui-sidebar-files/`](readme.zh-c61bcfaec1.md) | 右侧 Sidebar 的工作区文件树 tab 类型 | — |
| [`ui-brand-official/`](readme.zh-6e1948c8d6.md) | 用官方名称与标记填充通用浏览器品牌 slot | — |
| [`ui-workspace/`](readme.zh-8a38d5f34a.md) | 提供工作区选择与创建界面 | — |
| [`ui-conversation/`](readme.zh-ef31f7ff6e.md) | 展示当前对话及其输入界面 | — |
| [`ui-chat/`](readme.zh-8a318c6c31.md) | 投影并渲染 Chat 对话 target | — |
| [`ui-approval/`](readme.zh-484ff51d3c.md) | 展示批准请求并返回用户决策 | — |
| [`ui-tool/`](readme.zh-361c8fcbcf.md) | 编排工具调用树与按工具键控的视图 | — |
| [`ui-workflow-run/`](readme.zh-0cb0b56733.md) | 把持久工作流运行回放为嵌套对话折叠项 | — |
| [`ui-goal/`](readme.zh-86a5a44490.md) | 展示与管理当前目标 | — |
| [`ui-trajectory/`](readme.zh-f4b552a923.md) | 提供 agent（智能体）活动的其他视图 | — |
| [`ui-commands/`](readme.zh-6fa04396d8.md) | 提供会话感知的命令发现与分发 | — |
| [`ui-input-trigger/`](readme.zh-912c31dfa9.md) | 协调内联命令与引用建议 | — |
| [`ui-skill/`](readme.zh-7f98f5db90.md) | 向内联建议添加 skill（技能）引用 | — |
| [`ui-reference/`](readme.zh-0bdd59678d.md) | 统一的 Web `@file` / `@session` 引用 source | — |
| [`ui-subagent/`](readme.zh-123f52bb0d.md) | 提供 subagent 导航、子级 transcript（文本记录）状态与内联引用 | — |
| [`ui-schedule/`](readme.zh-5dd8832335.md) | 在只读标题栏目录中列出当前会话中生效的提醒 | — |
| [`ui-jobs/`](readme.zh-e9922baddd.md) | 在会话标题栏列出当前会话的后台任务 | — |
| [`ui-model-selection/`](readme.zh-e24048411e.md) | 在对话界面中提供模型选择 | — |
| [`ui-permission-presets/`](readme.zh-abc553f336.md) | 配置默认权限并切换当前会话的访问模式 | — |
| [`ui-plan/`](readme.zh-9534c793ac.md) | 展示生效中的 plan mode 状态及其退出控件 | — |
| [`ui-settings-plugins/`](readme.zh-a98e84ae56.md) | 负责「插件」设置分区、其标签页扩展点与可配置的宿主平面插件卡片 | — |
| [`ui-user-questions/`](readme.zh-bab0013297.md) | 展示 agent 请求的交互式问题 | — |
| [`ui-agent-preset/`](readme.zh-d4f626171f.md) | 选择会话的 agent 预设并编写预设组合 | — |
| [`ui-settings/`](readme.zh-0ccd4a9a06.md) | 承载设置界面及其扩展区域 | — |
| [`ui-settings-general/`](readme.zh-ffe5a2b46c.md) | 提供常规设置分区 | — |
| [`ui-settings-models/`](readme.zh-62a2da2b8e.md) | 提供模型提供方配置与 DeepSeek 引导 | — |
| [`ui-plugin-manager/`](readme.zh-c58a1c488c.md) | 贡献侧栏的“插件”面板：安装、启用、停用、重试与组合已安装的包 | — |
| [`ui-settings-plugin-inventory/`](readme.zh-864b8633e5.md) | 向「插件」设置贡献只读的 Host Loader 清单标签页 | — |
| [`ui-deliverables/`](readme.zh-b25307383a.md) | 生成改动文件卡片及其对比 tab、交付文件卡片与可点击的最终响应文件引用 | — |
| [`ui-message-feedback/`](readme.zh-df0cbc62f3.md) | 反馈界面：助手消息操作条中的逐消息赞踩，以及点赞、点踩与 `/feedback` 背后的反馈弹窗 | — |
| [`ui-directory-picker-browse/`](readme.zh-82a1e78f43.md) | 面向工作区目录流程的应用内目录浏览界面 | — |
| [`ui-directory-picker-native/`](readme.zh-e0b01ef615.md) | 驱动本地 Desktop 或 Host OS 选择器的原生目录选择界面 | — |
| [`ui-open-in-app/`](readme.zh-db92146d79.md) | 在已安装应用中打开工作区目录的会话标题栏拆分按钮 | — |

-----

<a id="related-documentation"></a>
## 相关文档

先从子系统参考与两份拥有跨包组合决策的 Agent Note 读起，再看服务于本页的宿主半侧。

- [客户端模块子系统](client-modules.zh-d715888701.md)——web 插件表：`dsh.client` 声明、启动图协议与 bundle 路由。
- [slot 系统标准](../history/2026-07-22-slot-type-chain-implementation.zh-1e3021a26e.md)——权威 slot 模型：注册、props 份额与存储。
- [web 客户端架构 Agent Note](../history/2026-07-19-gui-web-client-architecture.zh-f20ac65249.md)——加载链、对象层与客户端服务。
- [宿主组地图](../packages/readme.zh-19768ae54a.md)——服务于本浏览器半侧的宿主半侧。

<a id="dev-note"></a>
## 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
