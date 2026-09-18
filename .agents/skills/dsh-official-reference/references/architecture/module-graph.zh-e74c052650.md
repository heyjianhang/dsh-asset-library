> 自动同步的官方参考原文。来源：[docs/module-graph.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/docs/module-graph.zh.md)，提交：`ddefc45fbc7f8e46dd73185e68295696d1297887`。上游规则仅在其适用范围内使用；此文件不作为本仓库 AGENTS。

<!-- 由 scripts/gen-module-graph.ts 生成——请勿手工编辑。
     运行 `pnpm run gen-module-graph` 重新生成。 -->

# 共享实例依赖关系图

[English](module-graph-84f3016eec.md) | 中文

`@deepseek-ai/dsh-*` harness 包之间的 peer 依赖关系。peer 表示消费端需要提供共享实例，不包括普通运行时 dependency 或仅开发期关系。该图按 `packages/<group>/<pkg>` 层级分组；边 `a --> b` 表示包 `a` peer 依赖包 `b`。名称中的 `@deepseek-ai/dsh-` 前缀已移除。

```mermaid
flowchart TD
  subgraph group_util["packages/util"]
    pkg_atomic_write["atomic-write"]
    pkg_brand["brand"]
    pkg_chunked_list["chunked-list"]
    pkg_deque["deque"]
    pkg_home_paths["home-paths"]
    pkg_http_proxy["http-proxy"]
    pkg_launch_environment["launch-environment"]
    pkg_lazy_require["lazy-require"]
    pkg_native_command["native-command"]
    pkg_output_retention["output-retention"]
    pkg_package_manifest["package-manifest"]
    pkg_timeout["timeout"]
    pkg_util_crypto["util-crypto"]
    pkg_util_time["util-time"]
    pkg_util_values["util-values"]
    pkg_util_workspace_path["util-workspace-path"]
  end
  subgraph group_llm["packages/llm"]
    pkg_deepseek_llm_api_extensions["deepseek-llm-api-extensions"]
    pkg_llm["llm"]
    pkg_llm_deepseek["llm-deepseek"]
    pkg_llm_pi_ai["llm-pi-ai"]
    pkg_llm_retry["llm-retry"]
    pkg_plugin_package_inventory_deepseek["plugin-package-inventory-deepseek"]
    pkg_token_meter["token-meter"]
  end
  subgraph group_core["packages/core"]
    pkg_agent["agent"]
    pkg_agent_default_model["agent-default-model"]
    pkg_agent_loop["agent-loop"]
    pkg_agent_tool_presentation["agent-tool-presentation"]
    pkg_scope["scope"]
    pkg_session["session"]
    pkg_system_prompt["system-prompt"]
    pkg_tools["tools"]
  end
  subgraph group_goal["packages/goal"]
    pkg_command_goal["command-goal"]
    pkg_goal["goal"]
    pkg_goal_round_driver["goal-round-driver"]
    pkg_tool_goal["tool-goal"]
  end
  subgraph group_fs["packages/fs"]
    pkg_fs["fs"]
    pkg_fs_local["fs-local"]
    pkg_fs_observation_policy["fs-observation-policy"]
    pkg_fs_sandbox["fs-sandbox"]
    pkg_tool_fs["tool-fs"]
    pkg_tool_fs_search["tool-fs-search"]
    pkg_tool_str_replace_editor["tool-str-replace-editor"]
  end
  subgraph group_skill["packages/skill"]
    pkg_skill["skill"]
    pkg_skill_badge["skill-badge"]
    pkg_skill_filesystem["skill-filesystem"]
    pkg_skill_office["skill-office"]
    pkg_tool_skill["tool-skill"]
  end
  subgraph group_subagent["packages/subagent"]
    pkg_subagent["subagent"]
    pkg_subagent_acp["subagent-acp"]
    pkg_subagent_claude_code["subagent-claude-code"]
    pkg_subagent_codex["subagent-codex"]
    pkg_subagent_dsh_sdk["subagent-dsh-sdk"]
    pkg_subagent_fork_in_process["subagent-fork-in-process"]
    pkg_subagent_in_process_driver["subagent-in-process-driver"]
    pkg_subagent_spawn_in_process["subagent-spawn-in-process"]
    pkg_tool_subagent["tool-subagent"]
    pkg_tool_subagent_control["tool-subagent-control"]
  end
  subgraph group_web["packages/web"]
    pkg_tool_web["tool-web"]
    pkg_web["web"]
    pkg_web_fetch_http["web-fetch-http"]
    pkg_web_search_deepseek["web-search-deepseek"]
    pkg_web_search_exa["web-search-exa"]
    pkg_web_search_perplexity["web-search-perplexity"]
  end
  subgraph group_spill["packages/spill"]
    pkg_spill["spill"]
    pkg_spill_local["spill-local"]
    pkg_spill_policy["spill-policy"]
  end
  subgraph group_todo["packages/todo"]
    pkg_tool_todo["tool-todo"]
  end
  subgraph group_plan["packages/plan"]
    pkg_plan_mode["plan-mode"]
  end
  subgraph group_hooks["packages/hooks"]
    pkg_hook_protocol["hook-protocol"]
    pkg_hooks_claude_code["hooks-claude-code"]
    pkg_hooks_codex["hooks-codex"]
  end
  subgraph group_session_query["packages/session-query"]
    pkg_session_log_export["session-log-export"]
    pkg_session_query["session-query"]
    pkg_session_query_sqlite["session-query-sqlite"]
    pkg_tool_session_query["tool-session-query"]
  end
  subgraph group_acp["packages/acp"]
    pkg_acp["acp"]
  end
  subgraph group_api["packages/api"]
    pkg_api_gateway["api-gateway"]
    pkg_api_remotes["api-remotes"]
    pkg_api_session_controller["api-session-controller"]
    pkg_api_settings_controller["api-settings-controller"]
    pkg_api_terminal_controller["api-terminal-controller"]
    pkg_api_workspace_controller["api-workspace-controller"]
    pkg_api_workspace_files["api-workspace-files"]
  end
  subgraph group_attachment["packages/attachment"]
    pkg_attachment["attachment"]
    pkg_attachment_local["attachment-local"]
  end
  subgraph group_boot["packages/boot"]
    pkg_app_boot["app-boot"]
    pkg_cmdline["cmdline"]
    pkg_hmr["hmr"]
    pkg_plugin_manager["plugin-manager"]
  end
  subgraph group_browser_use["packages/browser-use"]
    pkg_browser_use["browser-use"]
  end
  subgraph group_bundle["packages/bundle"]
    pkg_acp_app["acp-app"]
    pkg_base["base"]
    pkg_headless["headless"]
    pkg_sdk_app["sdk-app"]
    pkg_sdk_minimal["sdk-minimal"]
    pkg_web_app["web-app"]
  end
  subgraph group_client["packages/client"]
    pkg_client_connection["client-connection"]
    pkg_client_file_upload["client-file-upload"]
    pkg_client_hmr["client-hmr"]
    pkg_client_locale["client-locale"]
    pkg_client_modules["client-modules"]
    pkg_client_resources["client-resources"]
    pkg_client_store["client-store"]
    pkg_client_ui_agent_preset["client-ui-agent-preset"]
    pkg_client_ui_approval["client-ui-approval"]
    pkg_client_ui_attachment["client-ui-attachment"]
    pkg_client_ui_brand_official["client-ui-brand-official"]
    pkg_client_ui_chat["client-ui-chat"]
    pkg_client_ui_commands["client-ui-commands"]
    pkg_client_ui_conversation["client-ui-conversation"]
    pkg_client_ui_deliverables["client-ui-deliverables"]
    pkg_client_ui_directory_picker_browse["client-ui-directory-picker-browse"]
    pkg_client_ui_directory_picker_native["client-ui-directory-picker-native"]
    pkg_client_ui_dockkit["client-ui-dockkit"]
    pkg_client_ui_goal["client-ui-goal"]
    pkg_client_ui_input_trigger["client-ui-input-trigger"]
    pkg_client_ui_jobs["client-ui-jobs"]
    pkg_client_ui_layout["client-ui-layout"]
    pkg_client_ui_message_feedback["client-ui-message-feedback"]
    pkg_client_ui_model_selection["client-ui-model-selection"]
    pkg_client_ui_open_in_app["client-ui-open-in-app"]
    pkg_client_ui_permission_presets["client-ui-permission-presets"]
    pkg_client_ui_plan["client-ui-plan"]
    pkg_client_ui_plugin_manager["client-ui-plugin-manager"]
    pkg_client_ui_primitives["client-ui-primitives"]
    pkg_client_ui_reference["client-ui-reference"]
    pkg_client_ui_renderer["client-ui-renderer"]
    pkg_client_ui_schedule["client-ui-schedule"]
    pkg_client_ui_session["client-ui-session"]
    pkg_client_ui_settings["client-ui-settings"]
    pkg_client_ui_settings_general["client-ui-settings-general"]
    pkg_client_ui_settings_models["client-ui-settings-models"]
    pkg_client_ui_settings_plugin_inventory["client-ui-settings-plugin-inventory"]
    pkg_client_ui_settings_plugins["client-ui-settings-plugins"]
    pkg_client_ui_settings_unarchive_sessions["client-ui-settings-unarchive-sessions"]
    pkg_client_ui_sidebar["client-ui-sidebar"]
    pkg_client_ui_sidebar_browser["client-ui-sidebar-browser"]
    pkg_client_ui_sidebar_documentpreview["client-ui-sidebar-documentpreview"]
    pkg_client_ui_sidebar_files["client-ui-sidebar-files"]
    pkg_client_ui_sidebar_right["client-ui-sidebar-right"]
    pkg_client_ui_sidebar_terminal["client-ui-sidebar-terminal"]
    pkg_client_ui_skill["client-ui-skill"]
    pkg_client_ui_slots["client-ui-slots"]
    pkg_client_ui_subagent["client-ui-subagent"]
    pkg_client_ui_theme["client-ui-theme"]
    pkg_client_ui_tool["client-ui-tool"]
    pkg_client_ui_trajectory["client-ui-trajectory"]
    pkg_client_ui_user_questions["client-ui-user-questions"]
    pkg_client_ui_workflow_run["client-ui-workflow-run"]
    pkg_client_ui_workspace["client-ui-workspace"]
    pkg_client_web["client-web"]
  end
  subgraph group_compaction["packages/compaction"]
    pkg_command_compact["command-compact"]
    pkg_compaction["compaction"]
    pkg_compaction_basic["compaction-basic"]
    pkg_compaction_image_offload["compaction-image-offload"]
    pkg_compaction_tool_result_pruner["compaction-tool-result-pruner"]
  end
  subgraph group_computer_use["packages/computer-use"]
    pkg_computer_use["computer-use"]
  end
  subgraph group_context["packages/context"]
    pkg_agent_instructions["agent-instructions"]
    pkg_file_reference["file-reference"]
    pkg_file_reference_local["file-reference-local"]
    pkg_session_reference["session-reference"]
    pkg_time_context["time-context"]
    pkg_tmux_context["tmux-context"]
  end
  subgraph group_credentials["packages/credentials"]
    pkg_authorization["authorization"]
    pkg_credentials["credentials"]
    pkg_credentials_local["credentials-local"]
  end
  subgraph group_deliverables["packages/deliverables"]
    pkg_tool_present["tool-present"]
    pkg_workspace_changes["workspace-changes"]
  end
  subgraph group_document["packages/document"]
    pkg_office_to_pdf["office-to-pdf"]
  end
  subgraph group_experimental["packages/experimental"]
    pkg_experimental_agent_team["experimental-agent-team"]
    pkg_experimental_agent_team_profile["experimental-agent-team-profile"]
    pkg_experimental_agent_team_web_profile["experimental-agent-team-web-profile"]
    pkg_experimental_auto_review["experimental-auto-review"]
    pkg_experimental_browser_use_chrome_devtools_mcp["experimental-browser-use-chrome-devtools-mcp"]
    pkg_experimental_browser_use_playwright_mcp["experimental-browser-use-playwright-mcp"]
    pkg_experimental_browser_use_runtime["experimental-browser-use-runtime"]
    pkg_experimental_browser_use_stagehand_native["experimental-browser-use-stagehand-native"]
    pkg_experimental_client_ui_agent_team["experimental-client-ui-agent-team"]
    pkg_experimental_computer_use_cua_driver_mcp["experimental-computer-use-cua-driver-mcp"]
    pkg_experimental_computer_use_cua_driver_native["experimental-computer-use-cua-driver-native"]
    pkg_experimental_inspector["experimental-inspector"]
    pkg_experimental_ptc_runtime_python["experimental-ptc-runtime-python"]
    pkg_experimental_tool_agent_team["experimental-tool-agent-team"]
    pkg_experimental_webworker_packer["experimental-webworker-packer"]
    pkg_experimental_webworker_runtime["experimental-webworker-runtime"]
  end
  subgraph group_extensions["packages/extensions"]
    pkg_client_ui_cordis["client-ui-cordis"]
    pkg_cordis_client_runner["cordis-client-runner"]
    pkg_cordis_host_runner["cordis-host-runner"]
    pkg_tool_cordis["tool-cordis"]
  end
  subgraph group_feedback["packages/feedback"]
    pkg_command_feedback["command-feedback"]
    pkg_message_feedback["message-feedback"]
  end
  subgraph group_guard["packages/guard"]
    pkg_repeat_tool_reminder["repeat-tool-reminder"]
    pkg_tool_call_timeout_policy["tool-call-timeout-policy"]
  end
  subgraph group_host["packages/host"]
    pkg_host_directory_picker["host-directory-picker"]
    pkg_host_directory_picker_auto["host-directory-picker-auto"]
    pkg_host_directory_picker_browse["host-directory-picker-browse"]
    pkg_host_directory_picker_native["host-directory-picker-native"]
    pkg_host_frontend_static["host-frontend-static"]
    pkg_host_open_in_app["host-open-in-app"]
    pkg_host_plugin_inventory["host-plugin-inventory"]
    pkg_host_webserver["host-webserver"]
  end
  subgraph group_identity["packages/identity"]
    pkg_anonymous_user_id["anonymous-user-id"]
  end
  subgraph group_interaction["packages/interaction"]
    pkg_commands["commands"]
    pkg_permission_presets["permission-presets"]
    pkg_tool_ask_user["tool-ask-user"]
    pkg_user_approval["user-approval"]
    pkg_user_questions["user-questions"]
  end
  subgraph group_jobs["packages/jobs"]
    pkg_jobs["jobs"]
    pkg_jobs_local["jobs-local"]
    pkg_tool_jobs["tool-jobs"]
  end
  subgraph group_lsp["packages/lsp"]
    pkg_lsp["lsp"]
    pkg_lsp_stdio["lsp-stdio"]
    pkg_tool_lsp["tool-lsp"]
  end
  subgraph group_mcp["packages/mcp"]
    pkg_mcp_client["mcp-client"]
    pkg_mcp_resources["mcp-resources"]
  end
  subgraph group_preset["packages/preset"]
    pkg_agent_presets["agent-presets"]
    pkg_persona["persona"]
  end
  subgraph group_ptc_runtime["packages/ptc-runtime"]
    pkg_ptc_runtime["ptc-runtime"]
    pkg_ptc_runtime_node["ptc-runtime-node"]
  end
  subgraph group_runtime_diagnostics["packages/runtime-diagnostics"]
    pkg_invariants["invariants"]
  end
  subgraph group_sandbox["packages/sandbox"]
    pkg_sandbox["sandbox"]
    pkg_sandbox_local["sandbox-local"]
    pkg_sandbox_policy["sandbox-policy"]
    pkg_sandbox_windows_acl["sandbox-windows-acl"]
  end
  subgraph group_schedule["packages/schedule"]
    pkg_schedule["schedule"]
  end
  subgraph group_sdk["packages/sdk"]
    pkg_sdk_client["sdk-client"]
    pkg_sdk_jsonrpc_server["sdk-jsonrpc-server"]
    pkg_sdk_protocol["sdk-protocol"]
  end
  subgraph group_session["packages/session"]
    pkg_session_checkpoint_policy["session-checkpoint-policy"]
    pkg_session_format["session-format"]
    pkg_session_format_catalog["session-format-catalog"]
    pkg_session_format_v0_to_v1["session-format-v0-to-v1"]
    pkg_session_format_v1_to_v2["session-format-v1-to-v2"]
    pkg_session_format_v2_to_v3["session-format-v2-to-v3"]
    pkg_session_log_deepseek["session-log-deepseek"]
    pkg_session_persistence["session-persistence"]
    pkg_session_persistence_jsonl["session-persistence-jsonl"]
    pkg_session_projection["session-projection"]
    pkg_session_projection_cache["session-projection-cache"]
    pkg_session_stats["session-stats"]
    pkg_session_telemetry["session-telemetry"]
    pkg_session_telemetry_otel["session-telemetry-otel"]
    pkg_session_title["session-title"]
    pkg_session_title_all_prompts_llm["session-title-all-prompts-llm"]
    pkg_session_title_first_prompt_llm["session-title-first-prompt-llm"]
    pkg_session_title_llm["session-title-llm"]
    pkg_session_turn_outline["session-turn-outline"]
  end
  subgraph group_settings["packages/settings"]
    pkg_settings["settings"]
    pkg_settings_file["settings-file"]
  end
  subgraph group_shell["packages/shell"]
    pkg_bash_local["bash-local"]
    pkg_bash_sandbox["bash-sandbox"]
    pkg_pwsh_local["pwsh-local"]
    pkg_pwsh_sandbox["pwsh-sandbox"]
    pkg_shell["shell"]
    pkg_shell_env["shell-env"]
    pkg_tool_bash["tool-bash"]
    pkg_tool_bash_persistent["tool-bash-persistent"]
    pkg_tool_pwsh["tool-pwsh"]
    pkg_tool_pwsh_persistent["tool-pwsh-persistent"]
  end
  subgraph group_ssh["packages/ssh"]
    pkg_fs_ssh["fs-ssh"]
    pkg_sandbox_ssh["sandbox-ssh"]
    pkg_ssh["ssh"]
    pkg_subprocess_ssh["subprocess-ssh"]
  end
  subgraph group_storage["packages/storage"]
    pkg_storage["storage"]
    pkg_storage_domain["storage-domain"]
    pkg_storage_json["storage-json"]
    pkg_storage_sqlite["storage-sqlite"]
  end
  subgraph group_subprocess["packages/subprocess"]
    pkg_subprocess["subprocess"]
    pkg_subprocess_local["subprocess-local"]
    pkg_win32_process["win32-process"]
  end
  subgraph group_terminal["packages/terminal"]
    pkg_terminal["terminal"]
    pkg_terminal_bash["terminal-bash"]
    pkg_tool_terminal["tool-terminal"]
  end
  subgraph group_test_support["packages/test-support"]
    pkg_agent_loop_testkit["agent-loop-testkit"]
    pkg_client_test_runtime["client-test-runtime"]
    pkg_llm_mock_server["llm-mock-server"]
    pkg_llm_replay["llm-replay"]
    pkg_loader_smoke["loader-smoke"]
    pkg_remote_mock["remote-mock"]
    pkg_session_snapshot["session-snapshot"]
  end
  subgraph group_typert["packages/typert"]
    pkg_typert_generator["typert-generator"]
    pkg_typert_loader["typert-loader"]
    pkg_typert_protocol["typert-protocol"]
    pkg_typert_registry["typert-registry"]
  end
  subgraph group_webhook["packages/webhook"]
    pkg_webhook["webhook"]
    pkg_webhook_github["webhook-github"]
  end
  subgraph group_workflow["packages/workflow"]
    pkg_tool_ralph["tool-ralph"]
    pkg_tool_workflow["tool-workflow"]
    pkg_workflow["workflow"]
    pkg_workflow_ptc["workflow-ptc"]
  end
  subgraph group_workspace["packages/workspace"]
    pkg_workspace["workspace"]
  end
  pkg_scope --> pkg_invariants
  pkg_web --> pkg_llm
  pkg_attachment --> pkg_brand
  pkg_browser_use --> pkg_brand
  pkg_computer_use --> pkg_brand
  pkg_credentials --> pkg_invariants
  pkg_experimental_inspector --> pkg_client_modules
  pkg_experimental_inspector --> pkg_host_webserver
  pkg_experimental_webworker_runtime --> pkg_client_connection
  pkg_experimental_webworker_runtime --> pkg_client_modules
  pkg_experimental_webworker_runtime --> pkg_host_webserver
  pkg_host_directory_picker_auto --> pkg_client_ui_directory_picker_browse
  pkg_host_directory_picker_auto --> pkg_client_ui_directory_picker_native
  pkg_host_directory_picker_auto --> pkg_host_directory_picker_browse
  pkg_host_directory_picker_auto --> pkg_host_directory_picker_native
  pkg_host_directory_picker_auto --> pkg_host_webserver
  pkg_host_frontend_static --> pkg_client_connection
  pkg_host_frontend_static --> pkg_host_webserver
  pkg_anonymous_user_id --> pkg_brand
  pkg_anonymous_user_id --> pkg_home_paths
  pkg_lsp --> pkg_brand
  pkg_lsp --> pkg_llm
  pkg_storage_domain --> pkg_invariants
  pkg_storage_domain --> pkg_storage
  pkg_storage_json --> pkg_storage
  pkg_storage_sqlite --> pkg_storage
  pkg_subprocess --> pkg_http_proxy
  pkg_typert_loader --> pkg_typert_registry
  pkg_session --> pkg_scope
  pkg_system_prompt --> pkg_invariants
  pkg_system_prompt --> pkg_llm
  pkg_system_prompt --> pkg_scope
  pkg_skill --> pkg_llm
  pkg_skill --> pkg_scope
  pkg_web_fetch_http --> pkg_http_proxy
  pkg_web_fetch_http --> pkg_timeout
  pkg_web_fetch_http --> pkg_web
  pkg_web_search_exa --> pkg_launch_environment
  pkg_web_search_exa --> pkg_web
  pkg_web_search_perplexity --> pkg_launch_environment
  pkg_web_search_perplexity --> pkg_web
  pkg_api_remotes --> pkg_scope
  pkg_api_terminal_controller --> pkg_subprocess
  pkg_attachment_local --> pkg_attachment
  pkg_attachment_local --> pkg_home_paths
  pkg_client_file_upload --> pkg_scope
  pkg_authorization --> pkg_credentials
  pkg_authorization --> pkg_invariants
  pkg_authorization --> pkg_llm
  pkg_credentials_local --> pkg_atomic_write
  pkg_credentials_local --> pkg_credentials
  pkg_credentials_local --> pkg_home_paths
  pkg_credentials_local --> pkg_launch_environment
  pkg_experimental_computer_use_cua_driver_mcp --> pkg_computer_use
  pkg_sandbox_windows_acl --> pkg_subprocess
  pkg_subprocess_local --> pkg_subprocess
  pkg_subprocess_local --> pkg_timeout
  pkg_skill_badge --> pkg_skill
  pkg_skill_office --> pkg_skill
  pkg_spill --> pkg_brand
  pkg_spill --> pkg_llm
  pkg_spill --> pkg_session
  pkg_app_boot --> pkg_home_paths
  pkg_app_boot --> pkg_launch_environment
  pkg_app_boot --> pkg_system_prompt
  pkg_persona --> pkg_system_prompt
  pkg_sandbox --> pkg_llm
  pkg_sandbox --> pkg_session
  pkg_session_format_catalog --> pkg_session
  pkg_session_log_deepseek --> pkg_deepseek_llm_api_extensions
  pkg_session_log_deepseek --> pkg_invariants
  pkg_session_log_deepseek --> pkg_session
  pkg_session_persistence --> pkg_brand
  pkg_session_persistence --> pkg_session
  pkg_session_persistence --> pkg_timeout
  pkg_session_projection --> pkg_session
  pkg_settings --> pkg_brand
  pkg_settings --> pkg_invariants
  pkg_settings --> pkg_session
  pkg_session_snapshot --> pkg_http_proxy
  pkg_session_snapshot --> pkg_session
  pkg_agent --> pkg_invariants
  pkg_agent --> pkg_llm
  pkg_agent --> pkg_scope
  pkg_agent --> pkg_session
  pkg_agent --> pkg_session_projection
  pkg_agent --> pkg_system_prompt
  pkg_agent --> pkg_typert_protocol
  pkg_agent --> pkg_util_values
  pkg_fs --> pkg_brand
  pkg_fs --> pkg_invariants
  pkg_fs --> pkg_llm
  pkg_fs --> pkg_sandbox
  pkg_spill_local --> pkg_spill
  pkg_session_log_export --> pkg_session
  pkg_session_log_export --> pkg_session_persistence
  pkg_hmr --> pkg_app_boot
  pkg_hmr --> pkg_cmdline
  pkg_ptc_runtime --> pkg_sandbox
  pkg_sandbox_local --> pkg_llm
  pkg_sandbox_local --> pkg_sandbox
  pkg_sandbox_local --> pkg_session
  pkg_session_persistence_jsonl --> pkg_session
  pkg_session_persistence_jsonl --> pkg_session_persistence
  pkg_session_projection_cache --> pkg_session
  pkg_session_projection_cache --> pkg_session_projection
  pkg_session_projection_cache --> pkg_storage_domain
  pkg_session_stats --> pkg_llm
  pkg_session_stats --> pkg_session
  pkg_session_stats --> pkg_session_projection
  pkg_session_turn_outline --> pkg_llm
  pkg_session_turn_outline --> pkg_session
  pkg_session_turn_outline --> pkg_session_projection
  pkg_settings_file --> pkg_atomic_write
  pkg_settings_file --> pkg_home_paths
  pkg_settings_file --> pkg_settings
  pkg_shell --> pkg_sandbox
  pkg_shell --> pkg_settings
  pkg_shell --> pkg_subprocess
  pkg_workspace --> pkg_invariants
  pkg_workspace --> pkg_session
  pkg_workspace --> pkg_session_persistence
  pkg_workspace --> pkg_storage
  pkg_workspace --> pkg_storage_domain
  pkg_workspace --> pkg_typert_protocol
  pkg_llm_deepseek --> pkg_anonymous_user_id
  pkg_llm_deepseek --> pkg_atomic_write
  pkg_llm_deepseek --> pkg_attachment
  pkg_llm_deepseek --> pkg_credentials
  pkg_llm_deepseek --> pkg_deepseek_llm_api_extensions
  pkg_llm_deepseek --> pkg_fs
  pkg_llm_deepseek --> pkg_home_paths
  pkg_llm_deepseek --> pkg_launch_environment
  pkg_llm_deepseek --> pkg_llm
  pkg_llm_deepseek --> pkg_settings
  pkg_llm_deepseek --> pkg_timeout
  pkg_llm_pi_ai --> pkg_attachment
  pkg_llm_pi_ai --> pkg_authorization
  pkg_llm_pi_ai --> pkg_credentials
  pkg_llm_pi_ai --> pkg_fs
  pkg_llm_pi_ai --> pkg_launch_environment
  pkg_llm_pi_ai --> pkg_llm
  pkg_llm_pi_ai --> pkg_settings
  pkg_llm_pi_ai --> pkg_timeout
  pkg_llm_retry --> pkg_agent
  pkg_llm_retry --> pkg_brand
  pkg_llm_retry --> pkg_invariants
  pkg_llm_retry --> pkg_llm
  pkg_llm_retry --> pkg_session
  pkg_llm_retry --> pkg_session_projection
  pkg_llm_retry --> pkg_timeout
  pkg_agent_default_model --> pkg_agent
  pkg_agent_default_model --> pkg_llm
  pkg_agent_default_model --> pkg_settings
  pkg_goal --> pkg_agent
  pkg_goal --> pkg_brand
  pkg_goal --> pkg_invariants
  pkg_goal --> pkg_llm
  pkg_goal --> pkg_scope
  pkg_goal --> pkg_session
  pkg_goal --> pkg_session_projection
  pkg_goal --> pkg_typert_protocol
  pkg_fs_local --> pkg_fs
  pkg_fs_observation_policy --> pkg_fs
  pkg_skill_filesystem --> pkg_fs
  pkg_skill_filesystem --> pkg_home_paths
  pkg_skill_filesystem --> pkg_skill
  pkg_web_search_deepseek --> pkg_agent
  pkg_web_search_deepseek --> pkg_credentials
  pkg_web_search_deepseek --> pkg_launch_environment
  pkg_web_search_deepseek --> pkg_session
  pkg_web_search_deepseek --> pkg_settings
  pkg_web_search_deepseek --> pkg_web
  pkg_hook_protocol --> pkg_invariants
  pkg_hook_protocol --> pkg_session
  pkg_hook_protocol --> pkg_shell
  pkg_api_workspace_controller --> pkg_api_gateway
  pkg_api_workspace_controller --> pkg_client_connection
  pkg_api_workspace_controller --> pkg_host_directory_picker
  pkg_api_workspace_controller --> pkg_session
  pkg_api_workspace_controller --> pkg_storage_domain
  pkg_api_workspace_controller --> pkg_typert_protocol
  pkg_api_workspace_controller --> pkg_workspace
  pkg_file_reference --> pkg_agent
  pkg_time_context --> pkg_agent
  pkg_time_context --> pkg_invariants
  pkg_time_context --> pkg_llm
  pkg_time_context --> pkg_session
  pkg_time_context --> pkg_session_projection
  pkg_tmux_context --> pkg_agent
  pkg_tmux_context --> pkg_session
  pkg_tmux_context --> pkg_session_projection
  pkg_tmux_context --> pkg_shell
  pkg_experimental_ptc_runtime_python --> pkg_ptc_runtime
  pkg_experimental_ptc_runtime_python --> pkg_timeout
  pkg_experimental_ptc_runtime_python --> pkg_util_values
  pkg_commands --> pkg_agent
  pkg_commands --> pkg_attachment
  pkg_commands --> pkg_brand
  pkg_commands --> pkg_invariants
  pkg_commands --> pkg_llm
  pkg_commands --> pkg_scope
  pkg_commands --> pkg_session
  pkg_commands --> pkg_typert_protocol
  pkg_user_approval --> pkg_agent
  pkg_user_approval --> pkg_brand
  pkg_user_approval --> pkg_invariants
  pkg_user_approval --> pkg_llm
  pkg_user_approval --> pkg_scope
  pkg_user_approval --> pkg_session
  pkg_user_approval --> pkg_system_prompt
  pkg_user_questions --> pkg_agent
  pkg_user_questions --> pkg_llm
  pkg_user_questions --> pkg_scope
  pkg_jobs --> pkg_agent
  pkg_jobs --> pkg_brand
  pkg_jobs --> pkg_invariants
  pkg_jobs --> pkg_session
  pkg_lsp_stdio --> pkg_brand
  pkg_lsp_stdio --> pkg_fs
  pkg_lsp_stdio --> pkg_llm
  pkg_lsp_stdio --> pkg_lsp
  pkg_lsp_stdio --> pkg_subprocess
  pkg_lsp_stdio --> pkg_timeout
  pkg_sandbox_policy --> pkg_agent
  pkg_sandbox_policy --> pkg_invariants
  pkg_sandbox_policy --> pkg_sandbox
  pkg_sandbox_policy --> pkg_session
  pkg_sandbox_policy --> pkg_session_projection
  pkg_sandbox_policy --> pkg_system_prompt
  pkg_session_telemetry --> pkg_agent
  pkg_session_telemetry --> pkg_session
  pkg_session_title --> pkg_agent
  pkg_session_title --> pkg_brand
  pkg_session_title --> pkg_invariants
  pkg_session_title --> pkg_llm
  pkg_session_title --> pkg_session
  pkg_session_title --> pkg_session_projection
  pkg_bash_local --> pkg_settings
  pkg_bash_local --> pkg_shell
  pkg_bash_local --> pkg_subprocess
  pkg_bash_local --> pkg_timeout
  pkg_pwsh_local --> pkg_settings
  pkg_pwsh_local --> pkg_shell
  pkg_pwsh_local --> pkg_subprocess
  pkg_pwsh_local --> pkg_timeout
  pkg_terminal --> pkg_agent
  pkg_terminal --> pkg_brand
  pkg_loader_smoke --> pkg_agent
  pkg_loader_smoke --> pkg_http_proxy
  pkg_loader_smoke --> pkg_llm
  pkg_loader_smoke --> pkg_session
  pkg_workflow --> pkg_agent
  pkg_workflow --> pkg_brand
  pkg_workflow --> pkg_invariants
  pkg_workflow --> pkg_llm
  pkg_workflow --> pkg_session
  pkg_tools --> pkg_agent
  pkg_tools --> pkg_invariants
  pkg_tools --> pkg_llm
  pkg_tools --> pkg_ptc_runtime
  pkg_tools --> pkg_sandbox
  pkg_tools --> pkg_sandbox_policy
  pkg_tools --> pkg_scope
  pkg_tools --> pkg_session
  pkg_tools --> pkg_system_prompt
  pkg_tools --> pkg_user_approval
  pkg_command_goal --> pkg_commands
  pkg_command_goal --> pkg_goal
  pkg_command_goal --> pkg_llm
  pkg_goal_round_driver --> pkg_agent
  pkg_goal_round_driver --> pkg_goal
  pkg_goal_round_driver --> pkg_invariants
  pkg_goal_round_driver --> pkg_llm
  pkg_goal_round_driver --> pkg_session
  pkg_fs_sandbox --> pkg_fs
  pkg_fs_sandbox --> pkg_fs_local
  pkg_fs_sandbox --> pkg_sandbox
  pkg_fs_sandbox --> pkg_sandbox_policy
  pkg_compaction --> pkg_brand
  pkg_compaction --> pkg_commands
  pkg_compaction --> pkg_invariants
  pkg_compaction --> pkg_llm
  pkg_compaction --> pkg_session
  pkg_command_feedback --> pkg_anonymous_user_id
  pkg_command_feedback --> pkg_commands
  pkg_command_feedback --> pkg_session
  pkg_command_feedback --> pkg_typert_protocol
  pkg_permission_presets --> pkg_commands
  pkg_permission_presets --> pkg_invariants
  pkg_permission_presets --> pkg_sandbox
  pkg_permission_presets --> pkg_sandbox_policy
  pkg_permission_presets --> pkg_session
  pkg_permission_presets --> pkg_session_projection
  pkg_permission_presets --> pkg_settings
  pkg_permission_presets --> pkg_shell
  pkg_permission_presets --> pkg_typert_protocol
  pkg_permission_presets --> pkg_user_approval
  pkg_jobs_local --> pkg_agent
  pkg_jobs_local --> pkg_jobs
  pkg_jobs_local --> pkg_scope
  pkg_jobs_local --> pkg_timeout
  pkg_ptc_runtime_node --> pkg_fs
  pkg_ptc_runtime_node --> pkg_ptc_runtime
  pkg_ptc_runtime_node --> pkg_sandbox
  pkg_ptc_runtime_node --> pkg_sandbox_policy
  pkg_ptc_runtime_node --> pkg_session
  pkg_ptc_runtime_node --> pkg_subprocess
  pkg_ptc_runtime_node --> pkg_timeout
  pkg_session_title_llm --> pkg_llm
  pkg_session_title_llm --> pkg_session
  pkg_session_title_llm --> pkg_session_title
  pkg_session_title_llm --> pkg_timeout
  pkg_bash_sandbox --> pkg_bash_local
  pkg_bash_sandbox --> pkg_sandbox
  pkg_bash_sandbox --> pkg_sandbox_policy
  pkg_bash_sandbox --> pkg_shell
  pkg_pwsh_sandbox --> pkg_pwsh_local
  pkg_pwsh_sandbox --> pkg_sandbox
  pkg_pwsh_sandbox --> pkg_sandbox_policy
  pkg_pwsh_sandbox --> pkg_shell
  pkg_terminal_bash --> pkg_agent
  pkg_terminal_bash --> pkg_sandbox
  pkg_terminal_bash --> pkg_sandbox_policy
  pkg_terminal_bash --> pkg_session
  pkg_terminal_bash --> pkg_session_projection
  pkg_terminal_bash --> pkg_subprocess
  pkg_terminal_bash --> pkg_terminal
  pkg_agent_loop --> pkg_agent
  pkg_agent_loop --> pkg_invariants
  pkg_agent_loop --> pkg_llm
  pkg_agent_loop --> pkg_scope
  pkg_agent_loop --> pkg_session
  pkg_agent_loop --> pkg_session_persistence
  pkg_agent_loop --> pkg_session_projection
  pkg_agent_loop --> pkg_settings
  pkg_agent_loop --> pkg_system_prompt
  pkg_agent_loop --> pkg_tools
  pkg_agent_tool_presentation --> pkg_tools
  pkg_tool_goal --> pkg_agent
  pkg_tool_goal --> pkg_goal
  pkg_tool_goal --> pkg_llm
  pkg_tool_goal --> pkg_session
  pkg_tool_goal --> pkg_session_projection
  pkg_tool_goal --> pkg_system_prompt
  pkg_tool_goal --> pkg_tools
  pkg_tool_fs --> pkg_attachment
  pkg_tool_fs --> pkg_fs
  pkg_tool_fs --> pkg_llm
  pkg_tool_fs --> pkg_sandbox
  pkg_tool_fs --> pkg_sandbox_policy
  pkg_tool_fs --> pkg_session
  pkg_tool_fs --> pkg_system_prompt
  pkg_tool_fs --> pkg_tools
  pkg_tool_fs --> pkg_user_approval
  pkg_tool_fs_search --> pkg_llm
  pkg_tool_fs_search --> pkg_output_retention
  pkg_tool_fs_search --> pkg_session
  pkg_tool_fs_search --> pkg_spill
  pkg_tool_fs_search --> pkg_subprocess
  pkg_tool_fs_search --> pkg_system_prompt
  pkg_tool_fs_search --> pkg_timeout
  pkg_tool_fs_search --> pkg_tools
  pkg_tool_str_replace_editor --> pkg_fs
  pkg_tool_str_replace_editor --> pkg_sandbox
  pkg_tool_str_replace_editor --> pkg_sandbox_policy
  pkg_tool_str_replace_editor --> pkg_tools
  pkg_tool_skill --> pkg_agent
  pkg_tool_skill --> pkg_llm
  pkg_tool_skill --> pkg_skill
  pkg_tool_skill --> pkg_tools
  pkg_tool_web --> pkg_llm
  pkg_tool_web --> pkg_system_prompt
  pkg_tool_web --> pkg_tools
  pkg_tool_web --> pkg_web
  pkg_spill_policy --> pkg_llm
  pkg_spill_policy --> pkg_output_retention
  pkg_spill_policy --> pkg_session
  pkg_spill_policy --> pkg_spill
  pkg_spill_policy --> pkg_tools
  pkg_tool_todo --> pkg_agent
  pkg_tool_todo --> pkg_invariants
  pkg_tool_todo --> pkg_session
  pkg_tool_todo --> pkg_session_projection
  pkg_tool_todo --> pkg_tools
  pkg_plan_mode --> pkg_agent
  pkg_plan_mode --> pkg_commands
  pkg_plan_mode --> pkg_invariants
  pkg_plan_mode --> pkg_llm
  pkg_plan_mode --> pkg_session
  pkg_plan_mode --> pkg_session_projection
  pkg_plan_mode --> pkg_system_prompt
  pkg_plan_mode --> pkg_tools
  pkg_plan_mode --> pkg_user_questions
  pkg_hooks_codex --> pkg_agent
  pkg_hooks_codex --> pkg_hook_protocol
  pkg_hooks_codex --> pkg_llm
  pkg_hooks_codex --> pkg_session
  pkg_hooks_codex --> pkg_session_projection
  pkg_hooks_codex --> pkg_tools
  pkg_command_compact --> pkg_commands
  pkg_command_compact --> pkg_compaction
  pkg_compaction_image_offload --> pkg_agent
  pkg_compaction_image_offload --> pkg_compaction
  pkg_compaction_image_offload --> pkg_llm
  pkg_compaction_image_offload --> pkg_session
  pkg_agent_instructions --> pkg_agent
  pkg_agent_instructions --> pkg_fs
  pkg_agent_instructions --> pkg_home_paths
  pkg_agent_instructions --> pkg_llm
  pkg_agent_instructions --> pkg_session
  pkg_agent_instructions --> pkg_session_projection
  pkg_agent_instructions --> pkg_tools
  pkg_file_reference_local --> pkg_agent
  pkg_file_reference_local --> pkg_file_reference
  pkg_file_reference_local --> pkg_system_prompt
  pkg_file_reference_local --> pkg_tools
  pkg_tool_present --> pkg_agent
  pkg_tool_present --> pkg_fs
  pkg_tool_present --> pkg_llm
  pkg_tool_present --> pkg_session
  pkg_tool_present --> pkg_session_projection
  pkg_tool_present --> pkg_tools
  pkg_workspace_changes --> pkg_agent
  pkg_workspace_changes --> pkg_session
  pkg_workspace_changes --> pkg_subprocess
  pkg_workspace_changes --> pkg_tools
  pkg_experimental_browser_use_chrome_devtools_mcp --> pkg_agent
  pkg_experimental_browser_use_chrome_devtools_mcp --> pkg_browser_use
  pkg_experimental_browser_use_chrome_devtools_mcp --> pkg_system_prompt
  pkg_experimental_browser_use_chrome_devtools_mcp --> pkg_tools
  pkg_experimental_browser_use_playwright_mcp --> pkg_agent
  pkg_experimental_browser_use_playwright_mcp --> pkg_browser_use
  pkg_experimental_browser_use_playwright_mcp --> pkg_system_prompt
  pkg_experimental_browser_use_playwright_mcp --> pkg_tools
  pkg_experimental_browser_use_runtime --> pkg_agent
  pkg_experimental_browser_use_runtime --> pkg_browser_use
  pkg_experimental_browser_use_runtime --> pkg_system_prompt
  pkg_experimental_browser_use_runtime --> pkg_tools
  pkg_experimental_browser_use_stagehand_native --> pkg_agent
  pkg_experimental_browser_use_stagehand_native --> pkg_browser_use
  pkg_experimental_browser_use_stagehand_native --> pkg_system_prompt
  pkg_experimental_browser_use_stagehand_native --> pkg_tools
  pkg_experimental_computer_use_cua_driver_native --> pkg_computer_use
  pkg_experimental_computer_use_cua_driver_native --> pkg_system_prompt
  pkg_experimental_computer_use_cua_driver_native --> pkg_tools
  pkg_cordis_host_runner --> pkg_agent
  pkg_cordis_host_runner --> pkg_brand
  pkg_cordis_host_runner --> pkg_llm
  pkg_cordis_host_runner --> pkg_scope
  pkg_cordis_host_runner --> pkg_session
  pkg_cordis_host_runner --> pkg_tools
  pkg_cordis_host_runner --> pkg_typert_protocol
  pkg_message_feedback --> pkg_brand
  pkg_message_feedback --> pkg_command_feedback
  pkg_message_feedback --> pkg_llm
  pkg_message_feedback --> pkg_session
  pkg_message_feedback --> pkg_session_persistence
  pkg_message_feedback --> pkg_typert_protocol
  pkg_repeat_tool_reminder --> pkg_agent
  pkg_repeat_tool_reminder --> pkg_tools
  pkg_tool_call_timeout_policy --> pkg_llm
  pkg_tool_call_timeout_policy --> pkg_timeout
  pkg_tool_call_timeout_policy --> pkg_tools
  pkg_tool_ask_user --> pkg_agent
  pkg_tool_ask_user --> pkg_tools
  pkg_tool_ask_user --> pkg_user_questions
  pkg_tool_jobs --> pkg_agent
  pkg_tool_jobs --> pkg_jobs
  pkg_tool_jobs --> pkg_llm
  pkg_tool_jobs --> pkg_output_retention
  pkg_tool_jobs --> pkg_system_prompt
  pkg_tool_jobs --> pkg_tools
  pkg_tool_lsp --> pkg_llm
  pkg_tool_lsp --> pkg_lsp
  pkg_tool_lsp --> pkg_system_prompt
  pkg_tool_lsp --> pkg_timeout
  pkg_tool_lsp --> pkg_tools
  pkg_mcp_resources --> pkg_llm
  pkg_mcp_resources --> pkg_scope
  pkg_mcp_resources --> pkg_system_prompt
  pkg_mcp_resources --> pkg_tools
  pkg_agent_presets --> pkg_agent
  pkg_agent_presets --> pkg_atomic_write
  pkg_agent_presets --> pkg_home_paths
  pkg_agent_presets --> pkg_invariants
  pkg_agent_presets --> pkg_scope
  pkg_agent_presets --> pkg_session
  pkg_agent_presets --> pkg_session_projection
  pkg_agent_presets --> pkg_settings
  pkg_agent_presets --> pkg_system_prompt
  pkg_agent_presets --> pkg_tools
  pkg_agent_presets --> pkg_typert_protocol
  pkg_schedule --> pkg_agent
  pkg_schedule --> pkg_brand
  pkg_schedule --> pkg_invariants
  pkg_schedule --> pkg_llm
  pkg_schedule --> pkg_session
  pkg_schedule --> pkg_session_persistence
  pkg_schedule --> pkg_session_projection
  pkg_schedule --> pkg_tools
  pkg_session_checkpoint_policy --> pkg_agent
  pkg_session_checkpoint_policy --> pkg_llm
  pkg_session_checkpoint_policy --> pkg_session
  pkg_session_checkpoint_policy --> pkg_session_persistence
  pkg_session_checkpoint_policy --> pkg_tools
  pkg_session_title_all_prompts_llm --> pkg_llm
  pkg_session_title_all_prompts_llm --> pkg_session
  pkg_session_title_all_prompts_llm --> pkg_session_title
  pkg_session_title_all_prompts_llm --> pkg_session_title_llm
  pkg_session_title_first_prompt_llm --> pkg_llm
  pkg_session_title_first_prompt_llm --> pkg_session
  pkg_session_title_first_prompt_llm --> pkg_session_title
  pkg_session_title_first_prompt_llm --> pkg_session_title_llm
  pkg_shell_env --> pkg_home_paths
  pkg_shell_env --> pkg_shell
  pkg_shell_env --> pkg_tools
  pkg_tool_bash_persistent --> pkg_agent
  pkg_tool_bash_persistent --> pkg_terminal
  pkg_tool_bash_persistent --> pkg_timeout
  pkg_tool_bash_persistent --> pkg_tools
  pkg_tool_pwsh_persistent --> pkg_agent
  pkg_tool_pwsh_persistent --> pkg_terminal
  pkg_tool_pwsh_persistent --> pkg_timeout
  pkg_tool_pwsh_persistent --> pkg_tools
  pkg_ssh --> pkg_brand
  pkg_ssh --> pkg_fs
  pkg_ssh --> pkg_fs_local
  pkg_ssh --> pkg_fs_sandbox
  pkg_ssh --> pkg_sandbox
  pkg_ssh --> pkg_sandbox_local
  pkg_ssh --> pkg_sandbox_policy
  pkg_ssh --> pkg_session_projection
  pkg_ssh --> pkg_subprocess
  pkg_ssh --> pkg_subprocess_local
  pkg_tool_terminal --> pkg_agent
  pkg_tool_terminal --> pkg_jobs
  pkg_tool_terminal --> pkg_llm
  pkg_tool_terminal --> pkg_output_retention
  pkg_tool_terminal --> pkg_system_prompt
  pkg_tool_terminal --> pkg_terminal
  pkg_tool_terminal --> pkg_tools
  pkg_llm_replay --> pkg_compaction
  pkg_llm_replay --> pkg_deepseek_llm_api_extensions
  pkg_llm_replay --> pkg_llm
  pkg_llm_replay --> pkg_session
  pkg_tool_workflow --> pkg_agent
  pkg_tool_workflow --> pkg_invariants
  pkg_tool_workflow --> pkg_llm
  pkg_tool_workflow --> pkg_session
  pkg_tool_workflow --> pkg_system_prompt
  pkg_tool_workflow --> pkg_tools
  pkg_tool_workflow --> pkg_workflow
  pkg_plugin_package_inventory_deepseek --> pkg_agent
  pkg_plugin_package_inventory_deepseek --> pkg_agent_presets
  pkg_plugin_package_inventory_deepseek --> pkg_deepseek_llm_api_extensions
  pkg_plugin_package_inventory_deepseek --> pkg_session
  pkg_token_meter --> pkg_compaction
  pkg_token_meter --> pkg_compaction_image_offload
  pkg_token_meter --> pkg_llm
  pkg_token_meter --> pkg_llm_retry
  pkg_token_meter --> pkg_session
  pkg_token_meter --> pkg_session_projection
  pkg_session_query --> pkg_brand
  pkg_session_query --> pkg_llm
  pkg_session_query --> pkg_session
  pkg_session_query --> pkg_session_persistence
  pkg_session_query --> pkg_session_projection
  pkg_session_query --> pkg_session_projection_cache
  pkg_session_query --> pkg_session_title
  pkg_session_query --> pkg_tool_todo
  pkg_api_settings_controller --> pkg_agent_presets
  pkg_api_settings_controller --> pkg_credentials
  pkg_api_settings_controller --> pkg_native_command
  pkg_api_settings_controller --> pkg_session
  pkg_api_settings_controller --> pkg_settings
  pkg_api_settings_controller --> pkg_typert_protocol
  pkg_web_app --> pkg_shell_env
  pkg_web_app --> pkg_system_prompt
  pkg_experimental_auto_review --> pkg_agent
  pkg_experimental_auto_review --> pkg_agent_instructions
  pkg_experimental_auto_review --> pkg_llm
  pkg_experimental_auto_review --> pkg_permission_presets
  pkg_experimental_auto_review --> pkg_session
  pkg_experimental_auto_review --> pkg_tools
  pkg_tool_cordis --> pkg_agent
  pkg_tool_cordis --> pkg_cordis_host_runner
  pkg_tool_cordis --> pkg_system_prompt
  pkg_tool_cordis --> pkg_tools
  pkg_host_plugin_inventory --> pkg_agent_presets
  pkg_host_plugin_inventory --> pkg_brand
  pkg_host_plugin_inventory --> pkg_typert_protocol
  pkg_mcp_client --> pkg_attachment
  pkg_mcp_client --> pkg_llm
  pkg_mcp_client --> pkg_mcp_resources
  pkg_mcp_client --> pkg_scope
  pkg_mcp_client --> pkg_subprocess
  pkg_mcp_client --> pkg_system_prompt
  pkg_mcp_client --> pkg_timeout
  pkg_mcp_client --> pkg_tools
  pkg_session_telemetry_otel --> pkg_anonymous_user_id
  pkg_session_telemetry_otel --> pkg_command_feedback
  pkg_session_telemetry_otel --> pkg_llm
  pkg_session_telemetry_otel --> pkg_message_feedback
  pkg_session_telemetry_otel --> pkg_session
  pkg_session_telemetry_otel --> pkg_session_telemetry
  pkg_tool_bash --> pkg_agent
  pkg_tool_bash --> pkg_jobs
  pkg_tool_bash --> pkg_llm
  pkg_tool_bash --> pkg_sandbox
  pkg_tool_bash --> pkg_sandbox_policy
  pkg_tool_bash --> pkg_shell
  pkg_tool_bash --> pkg_shell_env
  pkg_tool_bash --> pkg_system_prompt
  pkg_tool_bash --> pkg_tools
  pkg_tool_bash --> pkg_user_approval
  pkg_tool_pwsh --> pkg_agent
  pkg_tool_pwsh --> pkg_jobs
  pkg_tool_pwsh --> pkg_llm
  pkg_tool_pwsh --> pkg_sandbox
  pkg_tool_pwsh --> pkg_sandbox_policy
  pkg_tool_pwsh --> pkg_shell
  pkg_tool_pwsh --> pkg_shell_env
  pkg_tool_pwsh --> pkg_system_prompt
  pkg_tool_pwsh --> pkg_tools
  pkg_tool_pwsh --> pkg_user_approval
  pkg_fs_ssh --> pkg_fs
  pkg_fs_ssh --> pkg_sandbox
  pkg_fs_ssh --> pkg_sandbox_policy
  pkg_fs_ssh --> pkg_ssh
  pkg_sandbox_ssh --> pkg_sandbox
  pkg_sandbox_ssh --> pkg_ssh
  pkg_subprocess_ssh --> pkg_ssh
  pkg_subprocess_ssh --> pkg_subprocess
  pkg_subprocess_ssh --> pkg_subprocess_local
  pkg_agent_loop_testkit --> pkg_agent
  pkg_agent_loop_testkit --> pkg_agent_loop
  pkg_agent_loop_testkit --> pkg_llm
  pkg_agent_loop_testkit --> pkg_session
  pkg_agent_loop_testkit --> pkg_session_projection
  pkg_agent_loop_testkit --> pkg_system_prompt
  pkg_agent_loop_testkit --> pkg_tools
  pkg_webhook --> pkg_agent
  pkg_webhook --> pkg_agent_default_model
  pkg_webhook --> pkg_agent_presets
  pkg_webhook --> pkg_invariants
  pkg_webhook --> pkg_llm
  pkg_webhook --> pkg_permission_presets
  pkg_webhook --> pkg_session
  pkg_webhook --> pkg_session_title
  pkg_webhook --> pkg_workspace
  pkg_subagent --> pkg_agent
  pkg_subagent --> pkg_agent_presets
  pkg_subagent --> pkg_attachment
  pkg_subagent --> pkg_invariants
  pkg_subagent --> pkg_jobs
  pkg_subagent --> pkg_llm
  pkg_subagent --> pkg_permission_presets
  pkg_subagent --> pkg_sandbox
  pkg_subagent --> pkg_sandbox_policy
  pkg_subagent --> pkg_scope
  pkg_subagent --> pkg_session
  pkg_subagent --> pkg_session_persistence
  pkg_subagent --> pkg_session_projection
  pkg_subagent --> pkg_session_projection_cache
  pkg_subagent --> pkg_session_query
  pkg_subagent --> pkg_settings
  pkg_subagent --> pkg_system_prompt
  pkg_subagent --> pkg_tools
  pkg_subagent --> pkg_typert_protocol
  pkg_subagent --> pkg_user_approval
  pkg_subagent --> pkg_util_time
  pkg_session_query_sqlite --> pkg_session
  pkg_session_query_sqlite --> pkg_session_persistence
  pkg_session_query_sqlite --> pkg_session_query
  pkg_tool_session_query --> pkg_agent
  pkg_tool_session_query --> pkg_llm
  pkg_tool_session_query --> pkg_session
  pkg_tool_session_query --> pkg_session_projection
  pkg_tool_session_query --> pkg_session_query
  pkg_tool_session_query --> pkg_system_prompt
  pkg_tool_session_query --> pkg_timeout
  pkg_tool_session_query --> pkg_tools
  pkg_acp --> pkg_agent
  pkg_acp --> pkg_attachment
  pkg_acp --> pkg_llm
  pkg_acp --> pkg_mcp_client
  pkg_acp --> pkg_session
  pkg_acp --> pkg_session_persistence
  pkg_acp --> pkg_token_meter
  pkg_acp --> pkg_user_approval
  pkg_plugin_manager --> pkg_brand
  pkg_plugin_manager --> pkg_hmr
  pkg_plugin_manager --> pkg_host_plugin_inventory
  pkg_plugin_manager --> pkg_sandbox
  pkg_plugin_manager --> pkg_sandbox_policy
  pkg_plugin_manager --> pkg_subprocess
  pkg_plugin_manager --> pkg_tools
  pkg_plugin_manager --> pkg_typert_protocol
  pkg_plugin_manager --> pkg_user_approval
  pkg_headless --> pkg_agent
  pkg_headless --> pkg_agent_default_model
  pkg_headless --> pkg_fs
  pkg_headless --> pkg_llm
  pkg_headless --> pkg_session
  pkg_headless --> pkg_session_query
  pkg_compaction_tool_result_pruner --> pkg_compaction
  pkg_compaction_tool_result_pruner --> pkg_llm
  pkg_compaction_tool_result_pruner --> pkg_session
  pkg_compaction_tool_result_pruner --> pkg_token_meter
  pkg_webhook_github --> pkg_credentials
  pkg_webhook_github --> pkg_host_webserver
  pkg_webhook_github --> pkg_session
  pkg_webhook_github --> pkg_webhook
  pkg_subagent_acp --> pkg_agent
  pkg_subagent_acp --> pkg_llm
  pkg_subagent_acp --> pkg_session
  pkg_subagent_acp --> pkg_subagent
  pkg_subagent_acp --> pkg_subprocess
  pkg_subagent_acp --> pkg_timeout
  pkg_subagent_claude_code --> pkg_llm
  pkg_subagent_claude_code --> pkg_session
  pkg_subagent_claude_code --> pkg_subagent
  pkg_subagent_claude_code --> pkg_subprocess
  pkg_subagent_claude_code --> pkg_timeout
  pkg_subagent_codex --> pkg_llm
  pkg_subagent_codex --> pkg_session
  pkg_subagent_codex --> pkg_subagent
  pkg_subagent_codex --> pkg_subprocess
  pkg_subagent_codex --> pkg_timeout
  pkg_subagent_in_process_driver --> pkg_agent
  pkg_subagent_in_process_driver --> pkg_llm
  pkg_subagent_in_process_driver --> pkg_session
  pkg_subagent_in_process_driver --> pkg_subagent
  pkg_subagent_in_process_driver --> pkg_system_prompt
  pkg_subagent_in_process_driver --> pkg_tools
  pkg_tool_subagent --> pkg_agent
  pkg_tool_subagent --> pkg_invariants
  pkg_tool_subagent --> pkg_jobs
  pkg_tool_subagent --> pkg_llm
  pkg_tool_subagent --> pkg_scope
  pkg_tool_subagent --> pkg_session
  pkg_tool_subagent --> pkg_session_projection
  pkg_tool_subagent --> pkg_settings
  pkg_tool_subagent --> pkg_subagent
  pkg_tool_subagent --> pkg_system_prompt
  pkg_tool_subagent --> pkg_tools
  pkg_tool_subagent_control --> pkg_llm
  pkg_tool_subagent_control --> pkg_session
  pkg_tool_subagent_control --> pkg_subagent
  pkg_tool_subagent_control --> pkg_tools
  pkg_hooks_claude_code --> pkg_agent
  pkg_hooks_claude_code --> pkg_hook_protocol
  pkg_hooks_claude_code --> pkg_llm
  pkg_hooks_claude_code --> pkg_session
  pkg_hooks_claude_code --> pkg_session_projection
  pkg_hooks_claude_code --> pkg_subagent
  pkg_hooks_claude_code --> pkg_tools
  pkg_api_session_controller --> pkg_agent
  pkg_api_session_controller --> pkg_agent_default_model
  pkg_api_session_controller --> pkg_agent_presets
  pkg_api_session_controller --> pkg_api_gateway
  pkg_api_session_controller --> pkg_attachment
  pkg_api_session_controller --> pkg_client_connection
  pkg_api_session_controller --> pkg_client_file_upload
  pkg_api_session_controller --> pkg_commands
  pkg_api_session_controller --> pkg_file_reference
  pkg_api_session_controller --> pkg_fs
  pkg_api_session_controller --> pkg_jobs
  pkg_api_session_controller --> pkg_llm
  pkg_api_session_controller --> pkg_native_command
  pkg_api_session_controller --> pkg_scope
  pkg_api_session_controller --> pkg_session
  pkg_api_session_controller --> pkg_session_persistence
  pkg_api_session_controller --> pkg_session_projection
  pkg_api_session_controller --> pkg_session_projection_cache
  pkg_api_session_controller --> pkg_session_query
  pkg_api_session_controller --> pkg_session_title
  pkg_api_session_controller --> pkg_skill
  pkg_api_session_controller --> pkg_subagent
  pkg_api_session_controller --> pkg_typert_protocol
  pkg_api_session_controller --> pkg_typert_registry
  pkg_api_session_controller --> pkg_util_time
  pkg_api_session_controller --> pkg_util_values
  pkg_api_session_controller --> pkg_util_workspace_path
  pkg_api_session_controller --> pkg_workspace
  pkg_compaction_basic --> pkg_agent
  pkg_compaction_basic --> pkg_commands
  pkg_compaction_basic --> pkg_compaction
  pkg_compaction_basic --> pkg_compaction_tool_result_pruner
  pkg_compaction_basic --> pkg_llm
  pkg_compaction_basic --> pkg_session
  pkg_compaction_basic --> pkg_token_meter
  pkg_session_reference --> pkg_agent
  pkg_session_reference --> pkg_compaction
  pkg_session_reference --> pkg_llm
  pkg_session_reference --> pkg_output_retention
  pkg_session_reference --> pkg_session
  pkg_session_reference --> pkg_session_projection
  pkg_session_reference --> pkg_session_projection_cache
  pkg_session_reference --> pkg_session_query
  pkg_session_reference --> pkg_session_title
  pkg_session_reference --> pkg_spill
  pkg_session_reference --> pkg_subagent
  pkg_session_reference --> pkg_system_prompt
  pkg_session_reference --> pkg_typert_protocol
  pkg_experimental_agent_team --> pkg_agent
  pkg_experimental_agent_team --> pkg_invariants
  pkg_experimental_agent_team --> pkg_llm
  pkg_experimental_agent_team --> pkg_session
  pkg_experimental_agent_team --> pkg_session_persistence
  pkg_experimental_agent_team --> pkg_session_projection
  pkg_experimental_agent_team --> pkg_subagent
  pkg_experimental_agent_team --> pkg_typert_protocol
  pkg_sdk_protocol --> pkg_llm
  pkg_sdk_protocol --> pkg_session
  pkg_sdk_protocol --> pkg_subagent
  pkg_tool_ralph --> pkg_agent
  pkg_tool_ralph --> pkg_llm
  pkg_tool_ralph --> pkg_subagent
  pkg_tool_ralph --> pkg_system_prompt
  pkg_tool_ralph --> pkg_tools
  pkg_tool_ralph --> pkg_workflow
  pkg_workflow_ptc --> pkg_agent
  pkg_workflow_ptc --> pkg_llm
  pkg_workflow_ptc --> pkg_ptc_runtime
  pkg_workflow_ptc --> pkg_sandbox
  pkg_workflow_ptc --> pkg_sandbox_policy
  pkg_workflow_ptc --> pkg_session
  pkg_workflow_ptc --> pkg_subagent
  pkg_workflow_ptc --> pkg_tools
  pkg_workflow_ptc --> pkg_workflow
  pkg_subagent_fork_in_process --> pkg_agent
  pkg_subagent_fork_in_process --> pkg_session
  pkg_subagent_fork_in_process --> pkg_subagent
  pkg_subagent_fork_in_process --> pkg_subagent_in_process_driver
  pkg_subagent_spawn_in_process --> pkg_subagent
  pkg_subagent_spawn_in_process --> pkg_subagent_in_process_driver
  pkg_experimental_client_ui_agent_team --> pkg_api_remotes
  pkg_experimental_client_ui_agent_team --> pkg_api_session_controller
  pkg_experimental_client_ui_agent_team --> pkg_client_locale
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_conversation
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_primitives
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_renderer
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_session
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_slots
  pkg_experimental_client_ui_agent_team --> pkg_client_ui_workspace
  pkg_experimental_client_ui_agent_team --> pkg_experimental_agent_team
  pkg_experimental_client_ui_agent_team --> pkg_session
  pkg_experimental_client_ui_agent_team --> pkg_typert_protocol
  pkg_experimental_tool_agent_team --> pkg_agent
  pkg_experimental_tool_agent_team --> pkg_experimental_agent_team
  pkg_experimental_tool_agent_team --> pkg_session
  pkg_experimental_tool_agent_team --> pkg_system_prompt
  pkg_experimental_tool_agent_team --> pkg_tools
  pkg_sdk_client --> pkg_llm
  pkg_sdk_client --> pkg_sdk_protocol
  pkg_sdk_client --> pkg_session
  pkg_sdk_jsonrpc_server --> pkg_agent
  pkg_sdk_jsonrpc_server --> pkg_attachment
  pkg_sdk_jsonrpc_server --> pkg_llm
  pkg_sdk_jsonrpc_server --> pkg_llm_deepseek
  pkg_sdk_jsonrpc_server --> pkg_scope
  pkg_sdk_jsonrpc_server --> pkg_sdk_protocol
  pkg_sdk_jsonrpc_server --> pkg_session
  pkg_sdk_jsonrpc_server --> pkg_subagent
  pkg_client_test_runtime --> pkg_api_gateway
  pkg_client_test_runtime --> pkg_api_session_controller
  pkg_client_test_runtime --> pkg_api_workspace_controller
  pkg_client_test_runtime --> pkg_attachment
  pkg_client_test_runtime --> pkg_client_connection
  pkg_client_test_runtime --> pkg_client_hmr
  pkg_client_test_runtime --> pkg_client_modules
  pkg_client_test_runtime --> pkg_client_store
  pkg_client_test_runtime --> pkg_client_ui_chat
  pkg_client_test_runtime --> pkg_client_ui_conversation
  pkg_client_test_runtime --> pkg_client_ui_renderer
  pkg_client_test_runtime --> pkg_client_ui_session
  pkg_client_test_runtime --> pkg_client_ui_settings
  pkg_client_test_runtime --> pkg_client_ui_slots
  pkg_client_test_runtime --> pkg_client_web
  pkg_client_test_runtime --> pkg_remote_mock
  pkg_client_test_runtime --> pkg_session
  pkg_client_test_runtime --> pkg_subagent
  pkg_client_test_runtime --> pkg_typert_protocol
  pkg_subagent_dsh_sdk --> pkg_agent
  pkg_subagent_dsh_sdk --> pkg_llm
  pkg_subagent_dsh_sdk --> pkg_sdk_client
  pkg_subagent_dsh_sdk --> pkg_session
  pkg_subagent_dsh_sdk --> pkg_subagent
  pkg_subagent_dsh_sdk --> pkg_subprocess
```

| 包 | 分组 | Peer 依赖 |
| --- | --- | --- |
| [`atomic-write`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/atomic-write) | `util` | — |
| [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand) | `util` | — |
| [`chunked-list`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/chunked-list) | `util` | — |
| [`deque`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/deque) | `util` | — |
| [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths) | `util` | — |
| [`http-proxy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/http-proxy) | `util` | — |
| [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment) | `util` | — |
| [`lazy-require`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/lazy-require) | `util` | — |
| [`native-command`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/native-command) | `util` | — |
| [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention) | `util` | — |
| [`package-manifest`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/package-manifest) | `util` | — |
| [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) | `util` | — |
| [`util-crypto`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/crypto) | `util` | — |
| [`util-time`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/time) | `util` | — |
| [`util-values`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/values) | `util` | — |
| [`util-workspace-path`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/workspace-path) | `util` | — |
| [`deepseek-llm-api-extensions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/deepseek-llm-api-extensions) | `llm` | — |
| [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm) | `llm` | — |
| [`api-gateway`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/gateway) | `api` | — |
| [`api-workspace-files`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/workspace-files) | `api` | — |
| [`cmdline`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/cmdline) | `boot` | — |
| [`acp-app`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/acp-app) | `bundle` | — |
| [`base`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/base) | `bundle` | — |
| [`sdk-app`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/sdk-app) | `bundle` | — |
| [`sdk-minimal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/sdk-minimal) | `bundle` | — |
| [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection) | `client` | — |
| [`client-hmr`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/hmr) | `client` | — |
| [`client-locale`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/locale) | `client` | — |
| [`client-modules`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/modules) | `client` | — |
| [`client-resources`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/resources) | `client` | — |
| [`client-store`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/store) | `client` | — |
| [`client-ui-agent-preset`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-agent-preset) | `client` | — |
| [`client-ui-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-approval) | `client` | — |
| [`client-ui-attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-attachment) | `client` | — |
| [`client-ui-brand-official`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-brand-official) | `client` | — |
| [`client-ui-chat`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-chat) | `client` | — |
| [`client-ui-commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-commands) | `client` | — |
| [`client-ui-conversation`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-conversation) | `client` | — |
| [`client-ui-deliverables`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-deliverables) | `client` | — |
| [`client-ui-directory-picker-browse`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-directory-picker-browse) | `client` | — |
| [`client-ui-directory-picker-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-directory-picker-native) | `client` | — |
| [`client-ui-dockkit`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-dockkit) | `client` | — |
| [`client-ui-goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-goal) | `client` | — |
| [`client-ui-input-trigger`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-input-trigger) | `client` | — |
| [`client-ui-jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-jobs) | `client` | — |
| [`client-ui-layout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-layout) | `client` | — |
| [`client-ui-message-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-message-feedback) | `client` | — |
| [`client-ui-model-selection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-model-selection) | `client` | — |
| [`client-ui-open-in-app`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-open-in-app) | `client` | — |
| [`client-ui-permission-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-permission-presets) | `client` | — |
| [`client-ui-plan`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-plan) | `client` | — |
| [`client-ui-plugin-manager`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-plugin-manager) | `client` | — |
| [`client-ui-primitives`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-primitives) | `client` | — |
| [`client-ui-reference`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-reference) | `client` | — |
| [`client-ui-renderer`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-renderer) | `client` | — |
| [`client-ui-schedule`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-schedule) | `client` | — |
| [`client-ui-session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-session) | `client` | — |
| [`client-ui-settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings) | `client` | — |
| [`client-ui-settings-general`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings-general) | `client` | — |
| [`client-ui-settings-models`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings-models) | `client` | — |
| [`client-ui-settings-plugin-inventory`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings-plugin-inventory) | `client` | — |
| [`client-ui-settings-plugins`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings-plugins) | `client` | — |
| [`client-ui-settings-unarchive-sessions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings-unarchive-sessions) | `client` | — |
| [`client-ui-sidebar`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar) | `client` | — |
| [`client-ui-sidebar-browser`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar-browser) | `client` | — |
| [`client-ui-sidebar-documentpreview`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar-documentpreview) | `client` | — |
| [`client-ui-sidebar-files`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar-files) | `client` | — |
| [`client-ui-sidebar-right`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar-right) | `client` | — |
| [`client-ui-sidebar-terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-sidebar-terminal) | `client` | — |
| [`client-ui-skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-skill) | `client` | — |
| [`client-ui-slots`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-slots) | `client` | — |
| [`client-ui-subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-subagent) | `client` | — |
| [`client-ui-theme`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-theme) | `client` | — |
| [`client-ui-tool`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-tool) | `client` | — |
| [`client-ui-trajectory`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-trajectory) | `client` | — |
| [`client-ui-user-questions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-user-questions) | `client` | — |
| [`client-ui-workflow-run`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-workflow-run) | `client` | — |
| [`client-ui-workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-workspace) | `client` | — |
| [`client-web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/web) | `client` | — |
| [`office-to-pdf`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/document/office-to-pdf) | `document` | — |
| [`experimental-agent-team-profile`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-profile) | `experimental` | — |
| [`experimental-agent-team-web-profile`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team-web-profile) | `experimental` | — |
| [`experimental-webworker-packer`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/webworker-packer) | `experimental` | — |
| [`client-ui-cordis`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/ui-cordis) | `extensions` | — |
| [`cordis-client-runner`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/cordis-client-runner) | `extensions` | — |
| [`host-directory-picker`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker) | `host` | — |
| [`host-directory-picker-browse`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker-browse) | `host` | — |
| [`host-directory-picker-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker-native) | `host` | — |
| [`host-open-in-app`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/open-in-app) | `host` | — |
| [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver) | `host` | — |
| [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants) | `runtime-diagnostics` | — |
| [`session-format`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-format) | `session` | — |
| [`session-format-v0-to-v1`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-format-v0-to-v1) | `session` | — |
| [`session-format-v1-to-v2`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-format-v1-to-v2) | `session` | — |
| [`session-format-v2-to-v3`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-format-v2-to-v3) | `session` | — |
| [`storage`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage) | `storage` | — |
| [`win32-process`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/win32-process) | `subprocess` | — |
| [`llm-mock-server`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/llm-mock-server) | `test-support` | — |
| [`remote-mock`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/remote-mock) | `test-support` | — |
| [`typert-generator`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/generator) | `typert` | — |
| [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) | `typert` | — |
| [`typert-registry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/registry) | `typert` | — |
| [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) | `core` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants) |
| [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) | `web` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm) |
| [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment) | `attachment` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand) |
| [`browser-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/browser-use) | `browser-use` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand) |
| [`computer-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use) | `computer-use` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand) |
| [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials) | `credentials` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants) |
| [`experimental-inspector`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/inspector) | `experimental` | [`client-modules`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/modules), [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver) |
| [`experimental-webworker-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/webworker-runtime) | `experimental` | [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection), [`client-modules`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/modules), [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver) |
| [`host-directory-picker-auto`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker-auto) | `host` | [`client-ui-directory-picker-browse`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-directory-picker-browse), [`client-ui-directory-picker-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-directory-picker-native), [`host-directory-picker-browse`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker-browse), [`host-directory-picker-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker-native), [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver) |
| [`host-frontend-static`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/frontend-static) | `host` | [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection), [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver) |
| [`anonymous-user-id`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/identity/anonymous-user-id) | `identity` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths) |
| [`lsp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/lsp) | `lsp` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm) |
| [`storage-domain`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-domain) | `storage` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`storage`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage) |
| [`storage-json`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-json) | `storage` | [`storage`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage) |
| [`storage-sqlite`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-sqlite) | `storage` | [`storage`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage) |
| [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess) | `subprocess` | [`http-proxy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/http-proxy) |
| [`typert-loader`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/loader) | `typert` | [`typert-registry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/registry) |
| [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) | `core` | [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) | `core` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill) | `skill` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`web-fetch-http`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web-fetch-http) | `web` | [`http-proxy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/http-proxy), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) |
| [`web-search-exa`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web-search-exa) | `web` | [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) |
| [`web-search-perplexity`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web-search-perplexity) | `web` | [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) |
| [`api-remotes`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/remotes) | `api` | [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`api-terminal-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/terminal-controller) | `api` | [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess) |
| [`attachment-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment-local) | `attachment` | [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths) |
| [`client-file-upload`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/file-upload) | `client` | [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`authorization`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/authorization) | `credentials` | [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm) |
| [`credentials-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials-local) | `credentials` | [`atomic-write`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/atomic-write), [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment) |
| [`experimental-computer-use-cua-driver-mcp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/computer-use-cua-driver-mcp) | `experimental` | [`computer-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use) |
| [`sandbox-windows-acl`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-windows-acl) | `sandbox` | [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess) |
| [`subprocess-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess-local) | `subprocess` | [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`skill-badge`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill-badge) | `skill` | [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill) |
| [`skill-office`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill-office) | `skill` | [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill) |
| [`spill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill) | `spill` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`app-boot`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/app-boot) | `boot` | [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) |
| [`persona`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/persona) | `preset` | [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) |
| [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox) | `sandbox` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-format-catalog`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-format-catalog) | `session` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-log-deepseek`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-log-deepseek) | `session` | [`deepseek-llm-api-extensions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/deepseek-llm-api-extensions), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence) | `session` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) | `session` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings) | `settings` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-snapshot`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/session-snapshot) | `test-support` | [`http-proxy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/http-proxy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent) | `core` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`util-values`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/values) |
| [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs) | `fs` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox) |
| [`spill-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill-local) | `spill` | [`spill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill) |
| [`session-log-export`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-log-export) | `session-query` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence) |
| [`hmr`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/hmr) | `boot` | [`app-boot`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/app-boot), [`cmdline`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/cmdline) |
| [`ptc-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime) | `ptc-runtime` | [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox) |
| [`sandbox-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-local) | `sandbox` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-persistence-jsonl`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence-jsonl) | `session` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence) |
| [`session-projection-cache`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection-cache) | `session` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`storage-domain`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-domain) |
| [`session-stats`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-stats) | `session` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) |
| [`session-turn-outline`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-turn-outline) | `session` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) |
| [`settings-file`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings-file) | `settings` | [`atomic-write`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/atomic-write), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings) |
| [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell) | `shell` | [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess) |
| [`workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workspace/workspace) | `workspace` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`storage`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage), [`storage-domain`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-domain), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`llm-deepseek`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm-deepseek) | `llm` | [`anonymous-user-id`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/identity/anonymous-user-id), [`atomic-write`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/atomic-write), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`deepseek-llm-api-extensions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/deepseek-llm-api-extensions), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`llm-pi-ai`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm-pi-ai) | `llm` | [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`authorization`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/authorization), [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`llm-retry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm-retry) | `llm` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`agent-default-model`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-default-model) | `core` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings) |
| [`goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/goal) | `goal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`fs-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-local) | `fs` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs) |
| [`fs-observation-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-observation-policy) | `fs` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs) |
| [`skill-filesystem`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill-filesystem) | `skill` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill) |
| [`web-search-deepseek`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web-search-deepseek) | `web` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`launch-environment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/launch-environment), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) |
| [`hook-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/hook-protocol) | `hooks` | [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell) |
| [`api-workspace-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/workspace-controller) | `api` | [`api-gateway`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/gateway), [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection), [`host-directory-picker`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/directory-picker), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`storage-domain`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/storage/storage-domain), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workspace/workspace) |
| [`file-reference`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/file-reference) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent) |
| [`time-context`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/time-context) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) |
| [`tmux-context`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/tmux-context) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell) |
| [`experimental-ptc-runtime-python`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/ptc-runtime-python) | `experimental` | [`ptc-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`util-values`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/values) |
| [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands) | `interaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) | `interaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) |
| [`user-questions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-questions) | `interaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope) |
| [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs) | `jobs` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`lsp-stdio`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/lsp-stdio) | `lsp` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`lsp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/lsp), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy) | `sandbox` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) |
| [`session-telemetry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-telemetry) | `session` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title) | `session` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) |
| [`bash-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/bash-local) | `shell` | [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`pwsh-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/pwsh-local) | `shell` | [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal) | `terminal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand) |
| [`loader-smoke`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/loader-smoke) | `test-support` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`http-proxy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/http-proxy), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`workflow`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/workflow) | `workflow` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) | `core` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`ptc-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`command-goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/command-goal) | `goal` | [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/goal), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm) |
| [`goal-round-driver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/goal-round-driver) | `goal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/goal), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`fs-sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-sandbox) | `fs` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`fs-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-local), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy) |
| [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction) | `compaction` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`command-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/feedback/command-feedback) | `feedback` | [`anonymous-user-id`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/identity/anonymous-user-id), [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`permission-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/permission-presets) | `interaction` | [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`jobs-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs-local) | `jobs` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`ptc-runtime-node`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime-node) | `ptc-runtime` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`ptc-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`session-title-llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-llm) | `session` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`bash-sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/bash-sandbox) | `shell` | [`bash-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/bash-local), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell) |
| [`pwsh-sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/pwsh-sandbox) | `shell` | [`pwsh-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/pwsh-local), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell) |
| [`terminal-bash`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal-bash) | `terminal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal) |
| [`agent-loop`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-loop) | `core` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`agent-tool-presentation`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-tool-presentation) | `core` | [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/tool-goal) | `goal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`goal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/goal/goal), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/tool-fs) | `fs` | [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`tool-fs-search`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/tool-fs-search) | `fs` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`spill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-str-replace-editor`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/tool-str-replace-editor) | `fs` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/tool-skill) | `skill` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/tool-web) | `web` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/web/web) |
| [`spill-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill-policy) | `spill` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`spill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-todo`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/todo/tool-todo) | `todo` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`plan-mode`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/plan/plan-mode) | `plan` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`user-questions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-questions) |
| [`hooks-codex`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/hooks-codex) | `hooks` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`hook-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/hook-protocol), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`command-compact`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/command-compact) | `compaction` | [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction) |
| [`compaction-image-offload`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction-image-offload) | `compaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`agent-instructions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/agent-instructions) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`file-reference-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/file-reference-local) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`file-reference`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/file-reference), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-present`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/deliverables/tool-present) | `deliverables` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`workspace-changes`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/deliverables/workspace-changes) | `deliverables` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`experimental-browser-use-chrome-devtools-mcp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/browser-use-chrome-devtools-mcp) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`browser-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/browser-use), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`experimental-browser-use-playwright-mcp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/browser-use-playwright-mcp) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`browser-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/browser-use), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`experimental-browser-use-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/browser-use-runtime) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`browser-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/browser-use), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`experimental-browser-use-stagehand-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/browser-use-stagehand-native) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`browser-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/browser-use/browser-use), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`experimental-computer-use-cua-driver-native`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/computer-use-cua-driver-native) | `experimental` | [`computer-use`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/computer-use/computer-use), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`cordis-host-runner`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/cordis-host-runner) | `extensions` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`message-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/feedback/message-feedback) | `feedback` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`command-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/feedback/command-feedback), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`repeat-tool-reminder`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/guard/repeat-tool-reminder) | `guard` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-call-timeout-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/guard/timeout-policy) | `guard` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-ask-user`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/tool-ask-user) | `interaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`user-questions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-questions) |
| [`tool-jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/tool-jobs) | `jobs` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-lsp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/tool-lsp) | `lsp` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`lsp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/lsp/lsp), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`mcp-resources`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/mcp-resources) | `mcp` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets) | `preset` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`atomic-write`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/atomic-write), [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`schedule`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/schedule/schedule) | `schedule` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`session-checkpoint-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-checkpoint-policy) | `session` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`session-title-all-prompts-llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-all-prompts-llm) | `session` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`session-title-llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-llm) |
| [`session-title-first-prompt-llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-first-prompt-llm) | `session` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`session-title-llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title-llm) |
| [`shell-env`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell-env) | `shell` | [`home-paths`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/home-paths), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-bash-persistent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/tool-bash-persistent) | `shell` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-pwsh-persistent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/tool-pwsh-persistent) | `shell` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/ssh) | `ssh` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`fs-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-local), [`fs-sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs-sandbox), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-local), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`subprocess-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess-local) |
| [`tool-terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/tool-terminal) | `terminal` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`terminal`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/terminal/terminal), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`llm-replay`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/llm-replay) | `test-support` | [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`deepseek-llm-api-extensions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/deepseek-llm-api-extensions), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`tool-workflow`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/tool-workflow) | `workflow` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`workflow`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/workflow) |
| [`plugin-package-inventory-deepseek`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/plugin-package-inventory-deepseek) | `llm` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`deepseek-llm-api-extensions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/deepseek-llm-api-extensions), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`token-meter`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/token-meter) | `llm` | [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`compaction-image-offload`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction-image-offload), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`llm-retry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm-retry), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection) |
| [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query) | `session-query` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`session-projection-cache`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection-cache), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`tool-todo`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/todo/tool-todo) |
| [`api-settings-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/settings-controller) | `api` | [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`native-command`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/native-command), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`web-app`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/web-app) | `bundle` | [`shell-env`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell-env), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt) |
| [`experimental-auto-review`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/auto-review) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-instructions`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/agent-instructions), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`permission-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/permission-presets), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-cordis`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/tool-cordis) | `extensions` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`cordis-host-runner`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/extensions/cordis-host-runner), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`host-plugin-inventory`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/plugin-inventory) | `host` | [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`mcp-client`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/mcp-client) | `mcp` | [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`mcp-resources`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/mcp-resources), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`session-telemetry-otel`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-telemetry-otel) | `session` | [`anonymous-user-id`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/identity/anonymous-user-id), [`command-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/feedback/command-feedback), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`message-feedback`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/feedback/message-feedback), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-telemetry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-telemetry) |
| [`tool-bash`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/tool-bash) | `shell` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`shell-env`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell-env), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`tool-pwsh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/tool-pwsh) | `shell` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`shell`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell), [`shell-env`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/shell/shell-env), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`fs-ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/fs-ssh) | `ssh` | [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/ssh) |
| [`sandbox-ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/sandbox-ssh) | `ssh` | [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/ssh) |
| [`subprocess-ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/subprocess-ssh) | `ssh` | [`ssh`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ssh/ssh), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`subprocess-local`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess-local) |
| [`agent-loop-testkit`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/agent-loop-testkit) | `test-support` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-loop`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-loop), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`webhook`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/webhook/webhook) | `webhook` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-default-model`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-default-model), [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`permission-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/permission-presets), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workspace/workspace) |
| [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`permission-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/permission-presets), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`session-projection-cache`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection-cache), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval), [`util-time`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/time) |
| [`session-query-sqlite`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query-sqlite) | `session-query` | [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query) |
| [`tool-session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/tool-session-query) | `session-query` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`acp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/acp/acp) | `acp` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`mcp-client`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/mcp/mcp-client), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`token-meter`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/token-meter), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`plugin-manager`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/plugin-manager) | `boot` | [`brand`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/brand), [`hmr`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/boot/hmr), [`host-plugin-inventory`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/plugin-inventory), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`user-approval`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/user-approval) |
| [`headless`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/bundle/headless) | `bundle` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-default-model`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-default-model), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query) |
| [`compaction-tool-result-pruner`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction-tool-result-pruner) | `compaction` | [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`token-meter`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/token-meter) |
| [`webhook-github`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/webhook/webhook-github) | `webhook` | [`credentials`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/credentials/credentials), [`host-webserver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/host/webserver), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`webhook`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/webhook/webhook) |
| [`subagent-acp`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-acp) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`subagent-claude-code`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-claude-code) | `subagent` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`subagent-codex`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-codex) | `subagent` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess), [`timeout`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/timeout) |
| [`subagent-in-process-driver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-in-process-driver) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/tool-subagent) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/settings/settings), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`tool-subagent-control`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/tool-subagent-control) | `subagent` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`hooks-claude-code`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/hooks-claude-code) | `hooks` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`hook-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/hooks/hook-protocol), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`api-session-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/session-controller) | `api` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`agent-default-model`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent-default-model), [`agent-presets`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/preset/agent-presets), [`api-gateway`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/gateway), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection), [`client-file-upload`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/file-upload), [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`file-reference`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/file-reference), [`fs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/fs/fs), [`jobs`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/jobs/jobs), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`native-command`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/native-command), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`session-projection-cache`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection-cache), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`skill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/skill/skill), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol), [`typert-registry`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/registry), [`util-time`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/time), [`util-values`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/values), [`util-workspace-path`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/workspace-path), [`workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workspace/workspace) |
| [`compaction-basic`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction-basic) | `compaction` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`commands`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/interaction/commands), [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`compaction-tool-result-pruner`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction-tool-result-pruner), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`token-meter`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/token-meter) |
| [`session-reference`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/context/session-reference) | `context` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`compaction`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/compaction/compaction), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`output-retention`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/util/output-retention), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`session-projection-cache`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection-cache), [`session-query`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session-query/session-query), [`session-title`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-title), [`spill`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/spill/spill), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`experimental-agent-team`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`invariants`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/runtime-diagnostics/invariants), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`session-persistence`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-persistence), [`session-projection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/session/session-projection), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`sdk-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/protocol) | `sdk` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent) |
| [`tool-ralph`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/tool-ralph) | `workflow` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`workflow`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/workflow) |
| [`workflow-ptc`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/workflow-ptc) | `workflow` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`ptc-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/ptc-runtime/ptc-runtime), [`sandbox`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox), [`sandbox-policy`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sandbox/sandbox-policy), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools), [`workflow`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/workflow/workflow) |
| [`subagent-fork-in-process`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-fork-in-process) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subagent-in-process-driver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-in-process-driver) |
| [`subagent-spawn-in-process`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-spawn-in-process) | `subagent` | [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subagent-in-process-driver`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-in-process-driver) |
| [`experimental-client-ui-agent-team`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/client-ui-agent-team) | `experimental` | [`api-remotes`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/remotes), [`api-session-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/session-controller), [`client-locale`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/locale), [`client-ui-conversation`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-conversation), [`client-ui-primitives`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-primitives), [`client-ui-renderer`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-renderer), [`client-ui-session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-session), [`client-ui-slots`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-slots), [`client-ui-workspace`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-workspace), [`experimental-agent-team`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`experimental-tool-agent-team`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/tool-agent-team) | `experimental` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`experimental-agent-team`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/experimental/agent-team), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`system-prompt`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/system-prompt), [`tools`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/tools) |
| [`sdk-client`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/client) | `sdk` | [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sdk-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/protocol), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session) |
| [`sdk-jsonrpc-server`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/server) | `sdk` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`llm-deepseek`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm-deepseek), [`scope`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/scope), [`sdk-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/protocol), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent) |
| [`client-test-runtime`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/client-runtime) | `test-support` | [`api-gateway`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/gateway), [`api-session-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/session-controller), [`api-workspace-controller`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/api/workspace-controller), [`attachment`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/attachment/attachment), [`client-connection`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/connection), [`client-hmr`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/hmr), [`client-modules`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/modules), [`client-store`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/store), [`client-ui-chat`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-chat), [`client-ui-conversation`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-conversation), [`client-ui-renderer`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-renderer), [`client-ui-session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-session), [`client-ui-settings`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-settings), [`client-ui-slots`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/ui-slots), [`client-web`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/client/web), [`remote-mock`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/test-support/remote-mock), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`typert-protocol`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/typert/protocol) |
| [`subagent-dsh-sdk`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent-dsh-sdk) | `subagent` | [`agent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/agent), [`llm`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/llm/llm), [`sdk-client`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/sdk/client), [`session`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/core/session), [`subagent`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subagent/subagent), [`subprocess`](https://github.com/deepseek-ai/deepseek-harness/blob/ddefc45fbc7f8e46dd73185e68295696d1297887/packages/subprocess/subprocess) |
