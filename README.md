# DSH Plugin Devkit

面向 AI Agent 和开发者的 DeepSeek Harness 插件开发工具箱：提供开发规范、渐进式 Skills、完整官方文档同步、文档模板与验证工具。

An agent-oriented development kit for DeepSeek Harness plugins, with progressive-disclosure skills, a complete upstream Markdown reference, and repeatable documentation sync.

当前提供开发规则、手写开发流程 Skill、自动同步的官方参考 Skill、文档模板和检查脚本。它尚不是可安装的 DSH 业务插件。

开发流程 Skill 由本仓库编写，参考并适配官方规范；官方参考 Skill 保留自动同步的原文。两者均由本仓库组织，不是官方认证或发行的 Skill。[来源映射](docs/source-map.md) 列出采用方式和本地约定。

## 快速开始

需要 Git 和 Node.js 22 或更高版本，无需安装 npm 依赖。

```sh
git clone https://github.com/heyjianhang/dsh-plugin-devkit.git
cd dsh-plugin-devkit
node scripts/check-base.mjs
node .agents/skills/dsh-official-reference/scripts/verify-local.mjs
```

然后让开发 Agent 读取根目录 [AGENTS.md](AGENTS.md)，描述你的插件需求。项目结构随需求确定，不预建业务后端、数据库或前端骨架。

## 渐进式读取

资料完整保存在仓库中，读取按任务展开：Skill 名称与描述 → Skill 入口 → 主题索引 → 来源目录索引（内容较多时）→ 具体文档。可按关键词检索，不要求一次加载全部参考资料。

- `dsh-plugin-development`：开发前准备、需求与结构决策、文档维护、实施和验收；与本仓库的规范及模板配合使用。
- `dsh-official-reference`：全部官方 Markdown/MDX、原始正文、来源哈希与覆盖报告；更新脚本随 Skill 携带，可以单独复制使用。

历史记录、提案与测试快照单独导航，不作为当前接口或项目规则。当前数量与来源提交以 [覆盖报告](.agents/skills/dsh-official-reference/coverage.md) 为准。

## 一键更新官方资料

```sh
node scripts/sync-official-skill.mjs
```

默认获取官方默认分支的最新提交，生成 [官方参考 Skill](.agents/skills/dsh-official-reference/SKILL.md)。全仓库 Markdown/MDX 均收录，保留各语言原文并检查遗漏；相同版本重复运行不会重写文件，手写规范不受影响。可用 `--check` 只检查、`--ref` 指定版本、`--transport gh` 使用已有 GitHub CLI 登录。完整说明见 [文档同步](docs/official-skill-sync.md)。

生成脚本和来源配置就在 Skill 内，整个 Skill 可单独复制使用。完整范围与当前计数见 [覆盖报告](.agents/skills/dsh-official-reference/coverage.md)。离线完整性检查：`node .agents/skills/dsh-official-reference/scripts/verify-local.mjs`。

## 开始一个项目

复制本仓库的工作文件或使用托管平台的模板功能创建自己的仓库，然后给开发 Agent 描述需求，例如：

> 请先阅读 AGENTS.md，使用仓库中的 dsh-plugin-development Skill。我要一个收藏参考链接的 DSH 插件，用户能通过页面添加，Agent 能查询。先检查环境、明确需求和验收，确定合适结构，更新必要的项目规则与文档，再继续开发。

仓库内的 `.agents/skills/` 是项目开发指导。Agent 是否自动发现取决于客户端；不支持自动发现时，明确让它读取 [AGENTS.md](AGENTS.md) 和 [Skill](.agents/skills/dsh-plugin-development/SKILL.md)。无需为了使用本仓库而安装全局 Skill。

开发流程：

1. 读取现状和需求，识别此次任务的未知点。
2. 选择实际需要的 DSH 能力，核对目标版本和可用工具。
3. 按任务规模确定文件结构，建立或更新必要文档与长期约束。
4. 实现一条可以安装和验证的完整路径，依据实际结果迭代。
5. 同步代码、文档和验证记录，使后续会话能够接续。

小修复可在原文档内完成准备；只有复杂或跨会话任务才需要单独计划。准备完成后继续开发，不等待额外的“开始”指令。

## 本 base 的内容

| 入口 | 用途 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | 稳定约束、工作入口和当前可用命令 |
| [开发 Skill](.agents/skills/dsh-plugin-development/SKILL.md) | 根据任务阶段选择流程与资料 |
| [官方参考 Skill](.agents/skills/dsh-official-reference/SKILL.md) | 按主题读取自动同步的官方原文 |
| [文档同步](docs/official-skill-sync.md) | 更新、固定版本、来源配置与故障处理 |
| [文档规范](docs/documentation-standard.md) | 文档职责、开发前记录、接口说明、状态证据和更新要求 |
| [来源映射](docs/source-map.md) | 哪些来自官方、如何适配、哪些由本仓库自行约定 |
| [上游资料](docs/upstream.md) | 固定提交的官方文档与有边界的社区参考 |
| [完整准备示例](examples/preparation-reference.md) | 展示需求如何对应设计、文件影响和验收，不是业务实现 |
| [项目说明模板](templates/project-brief.md) | 需求、边界、结构、兼容基线和验收合并记录 |
| [变更计划模板](templates/change-plan.md) | 非简单任务的范围、步骤、验证与接续位置 |
| [项目规则模板](templates/project-rules.md) | 将长期约束补充到 AGENTS.md 的示例字段 |
| [插件使用说明模板](templates/plugin-readme.md) | 按真实包类型说明安装、使用、模型能力与限制 |
| [Agent 场景](docs/agent-scenarios.md) | 检验流程能否应对不同任务，而非只检验文档格式 |
| [状态](docs/base-status.md) | 已做检查、未覆盖范围和后续工作 |

这些是开发资料的位置，不规定插件必须有 `src/`、`client/`、数据库或后端服务。业务文件按需求产生；本仓库也没有预建插件 manifest、包管理器锁文件或空业务目录。

## 检查这个 base

需要 Node.js 22 或更高版本。脚本只使用 Node 标准库，无需安装 npm 依赖。

```sh
node scripts/check-base.mjs
node scripts/check-base.mjs --json
node --test scripts/check-base.test.mjs
node --test scripts/sync-official-skill.test.mjs
```

检查脚本覆盖 Markdown 内联文件链接、引用定义、HTML 文件链接、根开发入口和 Skill 的基本发现字段；忽略代码块、行内代码、外部 URL 和页内锚点，不检查远端页面、锚点存在性或完整 YAML schema。检查范围为工作树中的 Markdown，跳过依赖、构建、版本库和本地运行数据目录，不跟随符号链接。

脚本从自身位置定位仓库，允许从其他工作目录运行。失败返回非零状态，`--json` 提供机器可读结果。未来插件的构建、安装和业务测试需在选定宿主后另行建立；本检查不能替代它们。

## 维护和使用边界

更新官方资料时记录提交和适用范围，检查受影响的接口；无需每次开发追逐最新版本。社区资料作为可选参考，先核对版本、许可和适用场景，不批量安装或复制。

开发 Skill 与业务运行内容分开。后续制作发布包时显式选择运行所需文件；如果业务插件需要向最终用户提供 Skill，按目标宿主的发现机制单独设计。

当前可复用的是开发流程与资料；真实宿主加载、主题表现、Agent 行为测试和跨平台运行分别记录验证结果，不能由文档检查通过推断。

## 许可与来源

本项目原创代码、流程和模板采用 [MIT 许可证](LICENSE)。同步的 DeepSeek Harness 资料保留原作者归属及上游许可，详见 [第三方声明](THIRD_PARTY_NOTICES.md)。本项目由社区维护，与 DeepSeek 官方无隶属关系。
