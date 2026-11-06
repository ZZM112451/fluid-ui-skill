# 更新记录

## 未发布 — 演示站与中文文档补齐
- 新增 `site/` 演示首页与 `pages.yml` 工作流，把交互实验台、Crystal Motion 和 Liquid Glass v5 三个演示发布到 GitHub Pages，零运行时依赖。
- 中文 README 补齐到与英文同等的章节：Crystal Motion、20 种模式、Liquid Glass v5、能力、安装、Codex 用法、架构、运行测试、限制与贡献；删除「1.2.0（候选发布）」等与已发布事实不符的措辞。
- 英文 README 增加在线演示入口，并把 1.2.0 的发布状态改为链接到 Release 资产与校验和。
- 修正 `demo/index.html` 侧栏遗留的 `v1.0.0` 版本标签。
- 无 Skill 行为变更；`skills/fluid-ui/` 内容与 1.2.0 一致。

## 1.2.0 — Crystal Motion 与交互展示更新
- 在原 1.1.0 基础上新增 Crystal Motion 预设和 20 种交互的独立 SVG 概念效果图，英文/中文展示页与验收状态矩阵。
- 新增 Crystal Motion Web 导航专项 Playwright 测试，修复核心风格决策器未识别 Crystal Motion 预设的问题。
- 更新仓库、Skill、示例配置与 npm 包版本为 1.2.0；GitHub Release 资产及测试结果以 Releases 页面和验证报告为准。
- 图片是概念示意，不是浏览器截图；尚未将 20 个模式全部实现为可运行的 Crystal Motion 组件。



## Crystal Motion 规范推广（1.2.0 开发记录）
- 新增高透亮 Crystal Motion 预设，覆盖全部 20 个交互模式的材质与运动实施规范；保留原 Liquid Glass v5 和四种基础风格。
- 新增独立 Web 导航实验台、材质配置样例与分级验收清单。
- 该阶段增加规范和参考演示；20 个模式的可运行实现及多平台真机验证仍未完成。
- 该阶段保留 Skill 1.1.0 的版本号与 schemaVersion；后续版本更新记录见上方 1.2.0 条目。



## 1.1.0 2026-11-04
- 根据批准的 Fluid UI v5 handoff 增加 Glass 的可选 Liquid Glass 预设；不是第五种风格，也不强制 Auto 使用。
- 保留原四风格、20 交互模式和 1.x 配置，增加 schemaVersion 1 的可选 preset 字段与冲突检查。
- 新增连续形变合约、八交互工程示例、原始参考与运行截图/中间态验证；四平台指导明确未验证边界。
- 自然语言发现描述覆盖液态玻璃与状态形变，显式调用和隐式 UI 请求分开评测，不保证所有提示自动触发。
- 原安装、备份、更新、卸载和回滚保护保持；版本包保留原 handoff。真实发布结果以本版报告与 Release 证据为准。

### 1.0 → 1.1 迁移
旧配置无需迁移，固定 1.0.0 的项目不被自动改写。需要新预设时显式设置 style=Glass、preset=Liquid Glass 并按需固定 skillVersion=1.1.0。升级前比较安装 manifest 和用户修改；明确授权更新未修改安装时备份旧版。回滚可从完整备份或 v1.0.0 固定包恢复，仍不可覆盖用户新增内容。

## 1.0.0 2026-11-04
- 首版核心：四风格、20 模式、三强度、项目配置、四平台指导。
- Web 演示、状态与安装器测试、五任务对照和代表性项目试运行。
- Windows PowerShell 与 bash 分发方案、冲突保护、SHA256、备份回滚。
- 实际发布、CI 与各 Agent 状态以验证报告为准；不因版本号推定正式发布。

## 升级和迁移
1.x 配置 schemaVersion 为 1，固定 skillVersion。升级先对比、备份、确认、测试；降级也需要确认。同版本内容变更按冲突处理。不兼容主版本不得静默迁移。
历史发布版本及可用资产以 GitHub Releases 为准；未来重大版本须列字段迁移、行为变化和回滚到稳定 tag 的方法。
