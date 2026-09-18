> 自动同步的官方参考原文。来源：[snapshots/web/plan-review/review.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/plan-review/review.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- region "Approve this plan and leave plan mode?":
  - text: Plan review
  - button "Open plan in sidebar":
    - text: View full plan
    - img
  - heading "Add --greeting flag to CLI" [level=3]
  - paragraph: Locate the CLI entry point (e.g., cli.py, main.go, index.js etc.) and find the argument parser definition (argparse, click, cobra, yargs, or similar).
  - status
  - button "Request changes":
    - img
    - text: Request changes
  - button "Approve"
