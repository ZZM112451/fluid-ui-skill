# Fluid UI 1.1.0 发布与安装验收

日期：2026-11-04。设计 v5，对应兼容增强版本 1.1.0。

- [正式发布](https://github.com/ZZM112451/fluid-ui-skill/releases/tag/v1.1.0)；源码提交 `777578e4339bf467c975b4c3be6108d0055f3aa2`；[Windows / Ubuntu CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/41811735451)：成功。
- [主要升级 PR](https://github.com/ZZM112451/fluid-ui-skill/pull/1)；[交互回归修复 PR](https://github.com/ZZM112451/fluid-ui-skill/pull/2)。保留 v1.0.0 标签和发布。
- 发布 ZIP 已重新下载，SHA256：`abc602f8a5e3782940fcfd50f681140ac035114cc0c6307c4d92621478d76b9d`，与 SHA256SUMS 相符。
- 本地用户级 Skill 已由 1.0.0 升至 1.1.0，旧安装无自定义修改；完整备份位于 `~/.agents/skill-backups/fluid-ui-1.0.0-cdc0df2e-d2a9-45ac-8c22-0b4f989e0a44`，移出技能扫描目录。新旧 manifest 完整，重复安装无变化，临时目录旧版回滚和重新升级试验通过。
- 核心/安装 29/29、浏览器 41/41、独立生成组件 9/9。三个范围分别计数。依赖审计和完整 Git 历史泄漏扫描均 0 发现。
- 项目级独立上下文：显式调用、自然语言 UI、纯后端反例各一条；前两条读取新版，后端未读取。升级后新进程又实际读取用户级 1.1.0 及对应参考。保留 `allow_implicit_invocation: true`，不承诺每次自动调用。

详细八交互、原型与工程示例中间帧、无障碍和布局证据见 [实现报告](https://github.com/ZZM112451/fluid-ui-skill/blob/v1.1.0/docs/verification/v1.1.0/report.md)。原始 handoff 原样包含在发布包。

未验证：原生 Compose/Flutter/React Native、其他 Agent、macOS、人工读屏、真机 GPU；BFCache 回归只检查浏览器恢复事件逻辑。

回滚应先检查升级后用户修改，使用扫描目录外的完整 1.0.0 备份或固定旧版本包；管理器默认拒绝覆盖未知内容。
