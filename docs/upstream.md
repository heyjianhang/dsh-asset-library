# 上游资料与适用范围

核对日期：2026-09-18。官方仓库为 `deepseek-ai/deepseek-harness`，本索引固定在提交 `ddefc45fbc7f8e46dd73185e68295696d1297887`。

这是资料研究基线，**不是已验证的宿主兼容版本**。首次业务开发应选定实际宿主，核对相关类型与接口后记录自己的运行基线；无需默认升级到官方最新提交。

本地 Skill 由本仓库编写，引用并适配官方资料，不是官方原样发行。具体采用了什么、哪些属于本地选择见 [来源映射](source-map.md)；开发文档如何写见 [文档规范](documentation-standard.md)。

本页记录手写指导的研究依据，不随同步自动改写。需要最新原文时使用 [官方参考 Skill](../.agents/skills/dsh-official-reference/SKILL.md)，其实际提交见生成元数据；运行 [同步脚本](official-skill-sync.md) 可以更新默认分支或指定版本。

## 按问题找官方资料

| 问题 | 来源 | 使用边界 |
| --- | --- | --- |
| 文档职责与结构 | [官方 docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/AGENTS.md) | 采用内容分工和事实所有权，不照搬整个目录体系 |
| 文档编写与事实验证 | [dsh-doc](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/skills/dsh-doc/SKILL.md) | 采用操作实测等原则；双语配对、网站生成及其命令属于上游工程 |
| 接口与说明完整性 | [dsh-prose-standard](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/skills/dsh-prose-standard/SKILL.md) | 保留前提、结果、时序、失败和所有权，不引入上游专项审阅工作流 |
| 从哪里开始开发 | [第一个插件](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/index.zh.md) | 区分上游源码工作区与外部开发环境 |
| 配置与依赖 | [插件配置](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/config.zh.md) | 以目标版本的 schema 和注入方式为准 |
| Agent 工具 | [开发一个工具](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/tool.zh.md) | 工具定义、规范返回值及模型输出；示例命令需要目标环境 |
| 服务和生命周期 | [框架与生命周期](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/framework/index.zh.md)、[能力分层](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/practice/index.zh.md) | 简单插件无需因教程分层而拆多个包 |
| 可安装包 | [打包与安装](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/publish.zh.md) | bundle、profile、实际分发形式及配置层 |
| 前端架构 | [Client 开发规范](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/AGENTS.md)、[Web Client](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/web-client.md) | 提取接口和前端边界；上游包命名、工作区登记、专用脚本和维护流程不直接继承 |
| 页面挂载 | [Slots](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/slots.md) | 核对精确 Slot 的协议、props 和声明时机 |
| 公共控件与主题 | [ui-primitives](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-primitives/README.md)、[Web 样式](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/web-styling.md) | 核对目标版本可用导出；实际验证所选主题 |
| Skill 发现 | [Skills 子系统](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/subsystems/skills.md) | 文件存在、客户端发现、实际加载与遵循是不同阶段 |
| 官方 Agent 开发流程 | [cordis-plugin-development](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets/presets/cordis/skills/cordis-plugin-development/SKILL.md) | 该版本面向持久化 bundle；先确认环境是否提供查询与安装工具 |
| Host 与 Agent preset | [editing-cordis-compositions](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets/presets/cordis/skills/editing-cordis-compositions/SKILL.md) | 仅调整组合或 preset 时读取，注意生命周期与作用范围 |

固定版本的 Skill 与教程也有场景差异：Creator 使用宿主提供的工具；独立仓库使用可用开发工具链。遇到不一致先识别使用环境和具体接口，不能把不同路径的代码、命令混合。

## 社区候选

以下是可选资料，不是已安装依赖或经过本 base 运行认证的工具。仓库链接会变化；采用某段实现前应记录确切 commit、许可证及兼容版本。

| 来源 | 值得参考的部分 | 限制 |
| --- | --- | --- |
| [green-dalii/dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 中文插件开发说明与分主题参考 | 重新核对示例的版本、加载路径与前端覆盖 |
| [zephyrpersonal/dsh-plugin-development-skill](https://github.com/zephyrpersonal/dsh-plugin-development-skill) | 开发场景分类与蓝图 | 区分上游工作区命令与独立包 |
| [AI-Scarlett/build-dsh-plugin](https://github.com/AI-Scarlett/build-dsh-plugin) | 需求、实现到分发的流程参考 | 选择适用部分，不继承作者自己的发布流程与通用审批门槛 |
| [iiwish/dsh-testkit](https://github.com/iiwish/dsh-testkit) | 构建产物安装、启动、卸载的测试方法 | 先核对支持的宿主版本、测试适配器和运行依赖；未在此执行 |
| [zoahdev/dsh-plugin-doctor](https://github.com/zoahdev/dsh-plugin-doctor) | manifest、产物和配置诊断 | 静态诊断通过不能替代真实业务与界面验收；未在此执行 |

## 更新方法

只更新本次受影响的资料。记录新的来源提交，核对相关声明及适用范围，再更新本地摘要与项目基线。若宿主版本改变，重做受影响的加载或行为验证。

手写指导保留本页来源，官方参考生成器另行保留全部仓库 Markdown/MDX 原文与许可证，并生成覆盖报告。若引入其他第三方源码或资料，按其许可保留必要归属信息，避免把示例中的外部发布动作当成项目授权。
