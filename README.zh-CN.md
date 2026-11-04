# Fluid UI

面向编程 Agent 的 UI 设计与交互增强 Skill。优先保留项目既有设计系统与业务，只在有价值的位置使用动效。名称 fluid-ui，版本 1.0.0，许可证 MIT。

## 能力与边界
四风格 Glass、Material 3、Minimal、Tech；三模式 Auto/Preset/Hybrid；独立三档强度 Subtle/Balanced/Expressive。[20 种模式](skills/fluid-ui/references/patterns.md) 按需读取，涵盖状态、动画参数、中断、无障碍、性能、平台与验收。

提供 Web、Compose、Flutter、React Native 指导，不建立庞大跨平台组件库。Web 演示只实现部分模式，不能据此声称四平台已编译或所有 Agent 已兼容。

## 安装与调用
Node.js 22+，检出本仓库后运行 `node scripts/manage.mjs install --agent codex`。默认用户目录为 `~/.agents/skills/fluid-ui`。项目级加 `--project <项目目录>`。同版本相同内容重复安装不改文件；已有修改或版本变化拒绝覆盖，必须比较、备份并明确确认。

在 Codex 输入 `使用 $fluid-ui 优化当前界面，保留现有设计系统和业务；先给出风格与动效依据，再实施最小范围修改并验证。` 自动触发受宿主描述预算与选择影响，实际调用结果见报告。若技能列表未刷新，重启 Codex。

[各 Agent 安装](docs/compatibility.md) · [版本固定、更新与回滚](docs/install/distribution.md) · [真实验证](docs/verification/report.md) · [效果对照](docs/verification/comparison.md)

## 开发与测试
`npm ci` 安装开发依赖，`npm run dev` 后打开 `http://127.0.0.1:4173/demo/`。`npm test` 测配置与异步、安装安全；`npm run test:web` 跑浏览器；`npm run validate` 检查结构链接；`npm run scan` 做替代敏感信息与 Git 历史规则扫描；`npm run package` 生成 ZIP 与 SHA256。

详细架构、五类使用案例、贡献说明与限制见 [主说明](README.md)。更新遵循 SemVer、CHANGELOG 和迁移说明，不自动替换用户技能。请为贡献附实际测试证据，保持最小改动。

[MIT LICENSE](LICENSE) 使用用户确认的版权名 ZZM112451，年份 2026。无外部字体、图标、图片与商业组件；第三方开发依赖见 [授权记录](THIRD_PARTY_NOTICES.md)。
