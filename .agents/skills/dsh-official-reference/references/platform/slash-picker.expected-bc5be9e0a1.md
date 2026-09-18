> 自动同步的官方参考原文。来源：[apps/web/tests/expected/access-confirmation/slash-picker.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/apps/web/tests/expected/access-confirmation/slash-picker.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- textbox "筛选选项":
  - /placeholder: 搜索…
- listbox "/permission 匹配项":
  - option "仅可查看"
  - option "工作区内修改" [selected]:
    - text: 工作区内修改
    - img
  - option "完全权限"
  - option "Auto review EXP":
    - text: Auto review
    - superscript: EXP
    - text: 无沙箱运行；每次原生工具调用和 PTC 内层调用前由同一模型进行实验性审查。
