# 将完整官方文档同步为 Skill

生成器扫描 `deepseek-ai/deepseek-harness` 的完整 Git 文件树，收录全部 Markdown/MDX，而非只挑入门教程。中英文都保存，新增目录自动纳入兜底分类。文档正文不做模型摘要或自动翻译。

## 使用与独立携带

需要 Node.js 22 或更高版本及 GitHub 网络访问，无 npm 依赖或模型密钥。在 base 仓库运行兼容入口：

```sh
node scripts/sync-official-skill.mjs
```

实际生成器、来源配置、链接解析器与离线校验器都在 [官方参考 Skill 的 scripts](../.agents/skills/dsh-official-reference/scripts/sync-official-skill.mjs) 内。可把整个 `dsh-official-reference` 文件夹单独复制到任意项目；进入该 Skill 后运行：

```sh
node scripts/sync-official-skill.mjs
node scripts/sync-official-skill.mjs --check
node scripts/sync-official-skill.mjs --ref ddefc45fbc7f8e46dd73185e68295696d1297887
node scripts/sync-official-skill.mjs --transport gh --check --json
node scripts/verify-local.mjs --json
```

脚本根据自身文件位置定位 Skill，与终端当前目录或文件夹名称无关。`--check` 不写文件；首次同步或更新会原子替换生成资料。`--transport gh` 使用已有 GitHub CLI 登录；默认 HTTPS 可使用 `GH_TOKEN` / `GITHUB_TOKEN`，仅向 GitHub API 发送，不写入输出或日志。公开 API 限额返回 403 时，改用 gh 或配置已有令牌；脚本不会自动登录。

## 全量范围与覆盖检查

当前规则为：扫描官方仓库全部 `.md` / `.mdx` 文件，扩展名大小写不敏感，保留所有语言版本，无开发文档排除清单。覆盖包括：

- 全部开发教程、Cordis API 与教程、架构和子系统说明。
- 所有包的 README、AGENTS、接口说明及包内文档，包括 Client、SDK、协议、Host、MCP、存储、凭据、审批和插件管理器。
- 官方开发 Skill 的 Markdown 说明、references 和模板。
- CLI、桌面、原生平台、测试和贡献文档。
- 历史笔记、提案、事故记录、测试预期与快照，保留原文并按主题分开；它们不自动代表当前规范。

[来源配置](../.agents/skills/dsh-official-reference/scripts/dsh-docs.sources.json) 中的 groups 负责导航分类，不再决定收录白名单。兜底分类纳入以后新增的目录；即使分类配置写错，全量覆盖检查发现遗漏也会停止生成，保留旧版。`required` 用于发现关键入口被移动。全量模式要求 `preferredLanguage: all`。

[覆盖报告](../.agents/skills/dsh-official-reference/coverage.md) 显示官方文档路径总数、收录数、未收录数及主题分布；[机器可读清单](../.agents/skills/dsh-official-reference/coverage.json) 登记每条官方路径及 Git blob SHA。覆盖检查不是靠写死的文件数量通过。

“全部”指上述官方仓库文档文件，不表示镜像整个源码仓库、外部网站、截图、视频或所有非 Markdown 附件。文档中的 TypeScript 源码、脚本、图片和其他非文档资源保留固定提交链接，实际执行工具仍需目标项目环境。仓库中的许可证与声明文件另行保存。

## 生成结构与正文完整性

| 位置 | 内容 |
| --- | --- |
| `SKILL.md` | 轻量入口、主题路由、版本与资料使用边界 |
| `scripts/` | 可独立运行的同步器、来源配置、链接解析器和本地校验器 |
| `references/主题/` | 可查阅正文；增加来源、调整链接，按来源目录分级索引 |
| `originals/原路径.txt` | 未改写的原始正文，保留换行与字节；`.txt` 后缀避免上游 AGENTS 自动生效 |
| `coverage.md` / `coverage.json` | 覆盖报告与逐文件清单 |
| `upstream.json` | 固定提交、原文和产物哈希、来源文件与符号链接解析记录 |
| `LICENSE.upstream` / `licenses/` | 根许可证及仓库内的许可证、声明文件 |
| `agents/openai.yaml` | Skill 展示信息 |

下载内容先验证 Git blob SHA，再生成输出。官方符号链接仅在同一 Git 提交内解析，拒绝越界与循环，不在本地创建软链接。原始字节另外保留；链接改写后的阅读版不作为原始字节副本。索引按主题、来源目录逐层读取，不让 Agent 一次读取全部文件。

## 更新、保护与故障处理

同样的提交、配置和生成器返回 `unchanged`，不会重写生成时间或重新下载文档。更新列出新增、修改、删除。运行时修改配置和脚本会停止本次替换，避免覆盖正在编辑的输入。

`scripts/` 中登记的四个输入文件允许维护；修改后重新同步。其他生成文件若被手工修改或缺失会停止覆盖。自定义项目规则继续写到生成目录外。`verify-local.mjs` 会核验生成哈希、原文哈希、额外文件及覆盖计数，脚本输入改过但未重新同步时也会报告差异。

下载、Git 哈希、覆盖检查或生成链接校验失败时保留旧版。并发更新由锁文件阻止；替换失败尝试回退，回退异常保留备份。异常退出留下锁时确认对应进程已结束再清理，不能清理另一个正在运行的同步任务。

| 状态 | 退出码 | 含义 |
| --- | --- | --- |
| `updated` | 0 | 新版本已生成 |
| `unchanged` | 0 | 提交、配置与生成器一致 |
| `update-available` | 2 | `--check` 检测到更新，未写入 |
| `error` | 1 | 未完成，按错误修复后重试 |

## 验证

在 base 仓库运行：

```sh
node --test scripts/sync-official-skill.test.mjs scripts/check-base.test.mjs
node scripts/check-base.mjs
node .agents/skills/dsh-official-reference/scripts/verify-local.mjs --json
```

测试覆盖完整发现、新目录、多语言、漏收失败、原始字节、Git 哈希、符号链接、独立 Skill 在删除 base 后更新、失败保留、回退与本地修改。文档检查不验证所有 Markdown 方言、远端 URL 或章节锚点。资料同步不替代真实 DSH 插件的构建、安装、主题和生命周期验证。具体结果见 [实现记录](tasks/official-skill-sync.md)。
