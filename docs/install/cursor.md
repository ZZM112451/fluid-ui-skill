# Cursor 安装参考

核对 2026-11-04，[官方 Skills 文档](https://cursor.com/docs/skills)。当前未提供可用 Cursor 环境，未执行安装、发现、调用和 UI 任务。

用户级 `~/.cursor/skills/fluid-ui`，项目级 `.cursor/skills/fluid-ui`；官方也列出 `.agents/skills` 别名和兼容目录。安装器选择 Cursor 专属目录，避免无意影响其他宿主。

检出审查后 `node scripts/manage.mjs install --agent cursor`；项目级加 `--project <目录>`。新会话中输入 `/` 搜索 fluid-ui 并附加到消息；也可让 Agent 根据 description 选择。用户级本地技能不等于自动同步到云端会话。

排查：检查所用版本支持 Skills、SKILL.md 根目录、重名与 Settings 的技能发现列表。重启/新会话后再做最小触发和任务测试。升级卸载见 [分发](distribution.md)。未实测不能宣称已兼容。
