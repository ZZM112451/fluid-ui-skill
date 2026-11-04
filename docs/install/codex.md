# Codex 安装与使用

核对 2026-11-04，[官方说明](https://learn.chatgpt.com/docs/build-skills)。本机测试版本 CLI 0.164.0，Windows。

用户级官方目录 `~/.agents/skills/fluid-ui`；项目级 `<项目>/.agents/skills/fluid-ui`。本 Skill 的安装器默认使用该目录。早期 `.codex/skills` 兼容位置不作为跨版本统一事实。

检出仓库后运行 `node scripts/manage.mjs install --agent codex`。项目级加 `--project <目录>`。用 `/skills` 或 `$fluid-ui` 选择；明确调用示例：`使用 $fluid-ui 优化当前表单，保留业务并验证取消和错误恢复。`

官方说明技能变更可自动检测；未显示时重启 Codex。描述预算可能缩短或遗漏描述；显式调用与自动选择应分别测试。不要仅因复制成功声称可调用。证据见 [报告](../verification/report.md)。

查看版本 `node scripts/manage.mjs status --agent codex`。更新、降级、回滚和卸载见 [分发](distribution.md)。只允许覆盖本工具管理且审查过的安装，用户修改必须先比较与备份。
