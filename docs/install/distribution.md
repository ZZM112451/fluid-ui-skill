# 分发 更新与回滚

GitHub [仓库](https://github.com/ZZM112451/fluid-ui-skill) 是唯一权威源。克隆用于审查与开发；GitHub Code 的 ZIP 是默认分支源码快照；[Release](https://github.com/ZZM112451/fluid-ui-skill/releases) 包是固定版本交付。发布状态见 [验证](../verification/report.md)。未发布时 Release 下载失败是预期阻塞，不能用浮动 main 假装固定版本。

## 本地检出安装
需要 Node.js 22+。检查 `skills/fluid-ui/SKILL.md` 与 LICENSE 后：

Windows PowerShell：`./scripts/install.ps1 -Agent codex`。

macOS/Linux：`bash scripts/install.sh --agent codex`。

两者也可直接用 `node scripts/manage.mjs install --agent codex`。`--agent` 可选 codex/claude/cursor/gemini；用户级默认由 [各 Agent 指南](../compatibility.md) 决定。加 `--project <目录>`（PowerShell 用 `-Project`）才写入项目。

## 固定 Release 与校验
从同一已发布 tag 下载源码脚本及 ZIP，人工检查 SHA256SUMS。脚本不执行远程代码，解压暂存并校验路径与 Skill 根目录后调用已检出的本地管理器。

```powershell
./scripts/install.ps1 -Agent codex -Version 1.0.0 -SHA256 '<从已核实 SHA256SUMS 复制64位值>'
# 离线校验安装可加 -Archive ./fluid-ui-skill-v1.0.0.zip
```

```sh
bash scripts/install.sh --agent codex --version 1.0.0 --sha256 '<已核实的64位值>'
# 离线校验安装可加 --archive ./fluid-ui-skill-v1.0.0.zip
```

校验失败、网络失败、无权限时退出并保留现有安装。PowerShell 验证过流程不代表 bash/macOS 已验证；以报告为准。不要使用 curl|bash，也不要求管理员权限。

## 状态 升级 降级
`node scripts/manage.mjs status --agent codex` 输出版本与是否修改。项目配置应固定 `skillVersion` 与 `schemaVersion`。

相同内容重复安装为 unchanged。不同版本或用户修改默认拒绝；先检查 diff 和备份，再由用户明确确认执行 `--confirm-replace`（PowerShell `-ConfirmReplace`）。该标志是用户已确认后的输入，Agent 不得自行用它绕过确认。更新不会自动运行。旧目录保留为相邻 `fluid-ui.backup-<timestamp>`。

降级同样检查兼容性与确认。失败时暂存清理，交换失败恢复旧目录。回滚前先审查新目录中的修改，再以备份目录为 `--source` 重新安装，仍需明确确认，不能粗暴删除新文件。schema 主版本不兼容拒绝静默重写，先完成 CHANGELOG 规定的迁移和测试。

## 卸载与故障排查
`node scripts/manage.mjs uninstall --agent codex`（或脚本 Action/action）。仅删除 manifest 记录完全匹配的目录；有用户修改或额外文件时拒绝，人工备份与审查后处理，不删其他 Skill。手动复制的未受管目录不由卸载器处理。

权限问题检查目录可写，不自动提权；版本/校验失败重新下载已核实版本；归档根必须为 `fluid-ui-skill-v<version>/skills/fluid-ui/SKILL.md`。发现失败应确认宿主读取目录、重名与重启要求，再真实调用测试。
