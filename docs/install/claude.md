# Claude Code 安装参考

核对 2026-11-04，[官方 Skills 文档](https://code.claude.com/docs/en/skills)。本机启动器指向缺失可执行文件，未完成安装、发现、调用或真实任务测试。

用户级 `~/.claude/skills/fluid-ui`，项目级 `.claude/skills/fluid-ui`。检出并审查后运行 `node scripts/manage.mjs install --agent claude`；项目级加 `--project <目录>`。也可在确认无同名目录后手动复制 `skills/fluid-ui`。

官方调用 `/fluid-ui 优化当前表单`；Agent 也会依据 description 自动选择。启动新会话检查是否列出，目录信任与工具权限仍由 Claude 决定。核心没有动态 shell 注入、专属 hook 或自动网络请求。

未出现时核对根目录包含 SKILL.md、名称冲突、目录信任与所用 Claude 版本。只检查文件不算触发成功。版本、更新、回滚与卸载见 [分发](distribution.md)，状态仍为未验证。
