# DSH 插件开发入口

仓库：`heyjianhang/dsh-plugin-devkit`；项目名称：DSH Plugin Devkit。

本仓库提供通用的 DeepSeek Harness 插件开发流程。业务目标、源码结构、技术选型由当前需求决定。已有项目在原结构上迭代，不为套用模板重排代码。

## 开始工作

- 开发、修复或评审 DSH 插件时，读取 [dsh-plugin-development](.agents/skills/dsh-plugin-development/SKILL.md)，再按任务选择参考资料。
- 查询官方细节时按需读取 [自动同步的官方参考](.agents/skills/dsh-official-reference/SKILL.md)，核对其来源提交与目标宿主。需要更新时运行同步脚本；不要手工修改生成正文；同步器与配置在该 Skill 的 scripts 内维护。
- 检查实际文件、依赖、已有文档和用户要求，区分已实现、计划中、未验证。不要把示例路径、上游命令或准备安装的工具当成已存在。
- 每次开发前明确目标、验收、受影响的接口与文件、验证方式。新项目建立必要文档；已有项目更新受影响部分；小修复不强制新增文档。
- 信息足够后直接继续实现。只询问影响方向且不能从上下文合理判断的事项，不把日常设计决策变成逐步审批。

## 规则与文档维护

- 编写或更新需求、设计、任务和用户文档时遵循 [文档规范](docs/documentation-standard.md)：保留目标与验收、接口依据、结构理由、验证路径和未决项。文件可以合并，源码结构仍由需求决定。
- 每次任务检查本文件，长期约束或开发入口变化时按需更新。保留用户确定的规则；不为使当前实现通过而放宽约束。
- 需求、架构和本次计划写入适合当前项目的文档，文件名由项目决定，在下方维护入口。临时进度不堆入本文件。
- 用户明确的选择、上游接口约束、项目自行采用的惯例分别标明。规划不冒充现状；实现变化时同步相关文档。
- 每项事实只维护一个来源，其余位置链接引用。不要一次读取全部资料或生成无用途的空目录。

## DSH 开发边界

- 编码前核对目标宿主版本及相关接口。资料固定提交仅用于追溯，不等于已经验证兼容；[资料索引](docs/upstream.md) 记录当前研究基线。
- 根据需求选择配置、Host、Client、工具、存储等能力。无需的能力不建立对应目录；多插件、多进程和共享服务均由实际边界决定。
- 确认当前 Agent 真正拥有的查询、安装和浏览器工具。缺少宿主工具时使用已验证的本地入口与目标版本资料，不编造工具调用。
- 原生界面通过目标版本支持的 Slots、公共组件、主题与语言机制接入。前端、工具等多个入口若操作同一业务，复用同一业务校验与数据所有者。
- 注册、订阅、定时器和自有进程有明确生命周期；验证与本次修改相关的禁用、重载和退出行为。

## 当前状态与真实命令

目前有开发流程、官方参考生成器、参考资料、文档模板和检查脚本。尚无业务插件、已选择的宿主运行基线或 DSH 构建/安装命令。

- `node scripts/check-base.mjs`：检查本仓库 Markdown 文件链接及 Skill 入口。
- `node --test scripts/check-base.test.mjs`：测试检查脚本的有效输入、失败检测及退出状态。
- `node scripts/sync-official-skill.mjs`：联网同步并生成官方参考 Skill；`--check` 只读检查，`--ref` 固定版本。行为和来源范围见 [同步说明](docs/official-skill-sync.md)。
- `node .agents/skills/dsh-official-reference/scripts/verify-local.mjs`：离线核对全部文档覆盖、原文与产物哈希；查看 [覆盖报告](.agents/skills/dsh-official-reference/coverage.md)。
- `node --test scripts/sync-official-skill.test.mjs`：离线测试生成、更新、失败和回退。
- 检查与测试不安装依赖、不启动宿主；只有同步命令联网。使用 Node.js 22 或更高版本；实际验证环境见 [base 状态](docs/base-status.md)。

首次业务开发时核对并选择项目依赖和包管理器，建立实际可执行的命令后更新本节。只有需要前端构建时才引入对应工具链。

## 当前项目文档入口

- [base 说明](README.md)
- [官方与社区资料索引](docs/upstream.md)
- [本地规则与官方来源映射](docs/source-map.md)
- [文档规范](docs/documentation-standard.md)
- [已验证范围与后续验收](docs/base-status.md)
- [Agent 场景验收方法](docs/agent-scenarios.md)
- [官方资料同步实现记录](docs/tasks/official-skill-sync.md)

本节目前没有业务需求与架构文档。首次业务任务按需建立并登记；可参考 [项目说明模板](templates/project-brief.md)。
