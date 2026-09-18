# 本地规范与官方来源映射

当前 `dsh-plugin-development` 是本仓库编写、维护的开发 Skill，**不是官方 Skill 的原样拷贝或官方认证版本**。本仓库参考官方材料并为独立插件开发做适配；社区项目仅列为候选，没有批量安装或纳入执行指令。

另有自动生成的 [dsh-official-reference](../.agents/skills/dsh-official-reference/SKILL.md)，包含官方仓库全部 Markdown/MDX 原文及分级主题索引，覆盖情况见 [覆盖报告](../.agents/skills/dsh-official-reference/coverage.md)。其提交、原文与输出哈希及生成时间以生成目录的 `upstream.json` 为准，附带官方许可证。同步方式见 [生成器说明](official-skill-sync.md)。

官方资料固定在 `deepseek-ai/deepseek-harness@ddefc45fbc7f8e46dd73185e68295696d1297887`，核对日期为 2026-09-18。原文见下面链接；更多接口入口见 [资料索引](upstream.md)。该提交是资料依据，不表示某个插件已经在此版本运行通过。

## 文档与开发流程

| 官方原文 | 本地采用的原则 | 本地适配与未继承部分 |
| --- | --- | --- |
| [docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/AGENTS.md) | 文档各有职责，事实有唯一所有者；长期规则与详细说明分开；教程与参考按读者需要组织 | 不继承上游固定目录、文档字数清单与仓库内部引用检查；本 base 使用固定提交追溯外部资料 |
| [dsh-doc](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/skills/dsh-doc/SKILL.md) | 操作说明有实际执行证据；依真实包类型编写 README；明确成功、失败及限制 | 不直接复制双语逐行配对、网站投影、元数据分类及其专用检查命令 |
| [dsh-prose-standard](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/skills/dsh-prose-standard/SKILL.md) | 保留条件、时序、失败、副作用、所有权和结果区别；解释代码无法表达的事实 | 不继承其仓库范围输入协议；本地任务范围按用户要求与现有工程确定 |
| [package-bundle 文档模板](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/.agents/skills/dsh-doc/templates/package-bundle.md) | 依据 `dsh.bundle.patch` 判断 bundle，说明安装和配置层行为，以及模型可见影响 | 本地 [使用说明模板](../templates/plugin-readme.md) 允许按交付类型删改，不套用上游包名和翻译机制 |
| [cordis-plugin-development](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets/presets/cordis/skills/cordis-plugin-development/SKILL.md) | 针对需要的接口查询，先做可安装能力，再在真实环境验证 | Creator 工具仅在会话实际提供时调用；独立开发环境核对自己的 CLI 与构建入口 |

文档原则在 [文档规范](documentation-standard.md) 落地；准备流程在 [preparation](../.agents/skills/dsh-plugin-development/references/preparation.md) 落地。本文只说明归属，不再复制完整规则。

## 插件技术约束

| 官方原文 | 本地落实位置与重点 |
| --- | --- |
| [Client AGENTS](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/AGENTS.md) | [Client 参考](../.agents/skills/dsh-plugin-development/references/client.md)：Slots、推导 props、ctx 所在层、共享模块与本地状态职责 |
| [Web 样式](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/web-styling.md) | 同上：CSS Modules、语义变量、公共控件和可访问性；具体数值与变量表留在官方所有者 |
| [工具教程](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/tool.zh.md) | [Host 与工具](../.agents/skills/dsh-plugin-development/references/host-and-tools.md)：输入校验、规范结果、模型展示及调用验证 |
| [打包与安装](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/user/develop/basic/publish.zh.md) | [打包与验证](../.agents/skills/dsh-plugin-development/references/packaging-and-verification.md)：bundle 与 profile、实际分发包、加载结果 |

以上是固定资料版本下的依据。目标宿主不同时先核对对应声明，不把局部摘要当成跨版本 SDK 文档。上游 Client 规范中的 monorepo 聚合配置、发布命名空间和专用测试门槛不自动成为外部项目要求。

## 本仓库自行约定

下列内容由本次 base 的目标形成，没有声称是 DSH 官方强制规范：

- 不预设业务目录与数据模型，先理解需求再选择结构。
- 新项目、功能变更与小修复采用不同规模的准备工作。
- 每次检查并按需更新 AGENTS，长期约束与任务进度分开。
- 需求、设计和验证可以合并文档，路径由项目决定。
- 文档以中文为主，明确计划、已实现、已验证和未覆盖状态。
- 用独立 Agent 场景评估流程，机械文档检查只提供有限证据。

新规则落地时继续按“官方依据 / 适配 / 项目约定”标明归属。手写指导摘取并转述所需原则；自动同步的原文作为参考材料保存，不将官方 Skill 的全部指令直接变成本仓库规则。
