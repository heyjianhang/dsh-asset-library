> 自动同步的官方参考原文。来源：[snapshots/web/ptc-round/code.expected.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/snapshots/web/ptc-round/code.expected.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

- tabpanel "Code":
  - text: Code typescript
  - button "Wrap lines" [pressed]
  - button "Original JSON"
  - button "Copy code":
    - img
  - code: "const bashResult = await tools.bash({ command: \"echo CODE_ROUND_OK\", description: \"Echo CODE_ROUND_OK\" }); let readError = null; try { await tools.read({ file_path: \"missing.txt\" }); } catch (e) { readError = { toolName: e.toolName, message: e.message }; } return { bash: bashResult.stdout.text.trim(), readError };"
