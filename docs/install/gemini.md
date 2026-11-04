# Gemini CLI 安装参考

核对 2026-11-04，[官方 Agent Skills](https://geminicli.com/docs/cli/skills/)。本机无 Gemini CLI，安装、触发、任务均未验证。

用户级 `~/.gemini/skills/fluid-ui`，项目级 `.gemini/skills/fluid-ui`，官方亦支持 `.agents/skills` 别名，后者在同层有优先级。安装器使用专属目录。

检出审查后 `node scripts/manage.mjs install --agent gemini`；项目级加 `--project <目录>`。官方支持 `gemini skills install <本地目录>` 等管理入口，但与本安装器的 manifest 管理不能混用覆盖。

使用 `gemini skills list --all`、交互命令 `/skills list` 检查发现；`/skills reload` 或 `/skills refresh` 刷新。任务提示中明确要求使用 fluid-ui，Agent 按官方机制调用 activate_skill，并可能要求用户确认目录访问。不要照搬 Codex 的 `$` 或 Claude 的 `/fluid-ui` 为通用保证。

排查：安装层级、别名优先级、禁用列表与信任确认。更新卸载见 [分发](distribution.md)。完成真实测试前保留未验证状态。
