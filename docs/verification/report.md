# Fluid UI v1 交付与验证报告

日期 2026-11-04，项目状态：**v1.0.0 已正式发布，原生及跨 Agent 仍有未验证项**。本报告按已执行、静态检查、未验证与尚未完成区分。[最终发布验收](publication-report.zh-CN.md) 与 [机器可读证据](publication-verification.json) 已从 Release 下载并核验一致。固定 tag 内的本报告是发布准备快照；主分支此页记录发布后的实际结果。

## 阶段状态
| 阶段 | 状态 | 已执行 | 未完成或未验证 |
|---|---|---|---|
| P0 核心可用 | 已完成主要门槛 | Skill、四风格、20 模式、决策、配置、用户级安装、真实显式调用和自动选择样本、Web 演示 | 20 条触发用例未逐条实测；完整读屏/真机与穷尽视觉回归未验证 |
| P1 工程发布 | 可用环境发布验收已完成 | MIT、双语说明、安装更新保护、版本包、完整历史扫描、Public 仓库、Windows/Ubuntu CI、正式 Release、远程下载校验与试装 | 原生移动端 SDK 和设备环境缺失；macOS 未验证 |
| P2 跨 Agent | 文档完成，运行未验证 | 核对四 Agent 官方目录、调用与更新方式，通用核心与专属元数据隔离 | Claude 启动器损坏，Cursor/Gemini 不可用，未进行安装或调用 |

## Skill 信息
名称 fluid-ui，内容版本 1.0.0，配置 schemaVersion 1。用户级安装目录 `~/.agents/skills/fluid-ui`，实际 manifest 状态 modified=false；同版本重新安装返回 unchanged。官方 skill-creator 的 quick_validate 输出 `Skill is valid!`。官方验证器缺 PyYAML 时在隔离测试目录补充 PyYAML 6.0.3，未改用户 Python 或全局安装。

调用方式 `$fluid-ui`。 [显式调用证据](codex-invocation.txt) 记录实际读取已安装 SKILL.md 和按需参考，独立创建原生表单。生成代码归档 [index.html](../../examples/codex-smoke/index.html)，其本机 Edge 验证脚本记录 9 项通过；可在该目录运行 `node verify.cjs` 复现。 [自动选择证据](implicit-invocation.txt) 的提示不包含 Skill 名称，Agent 主动读取并使用 fluid-ui；只计一个真实样本，不推广为全体自动触发可靠性。

## 环境和命令
Windows，Node.js 24.16.0，Codex CLI 0.164.0，Playwright 1.58.2，Chromium 缓存构建 1223（UA HeadlessChrome 148），axe-core 桥接 4.11.1。演示无运行依赖，开发依赖锁定。没有 Android Compose、Flutter、RN 原生演示编译环境；只审查对应实现指南，不称编译通过。

| 验证层 | 命令/证据 | 结果 |
|---|---|---|
| 核心/管理/Release | `npm test` | 以 [本地执行记录](local-results.txt) 的最终数量为准 |
| Chromium 演示与试运行 | `npm run test:web` | 24 项通过；含弹窗旧结果、bfcache、复制失败、FAB、降级和试运行副本回归 |
| 四风格×三宽度 | 同上 | 320/768/1440，页面无明显溢出，axe 0 违规 |
| 明暗与字体 | `node scripts/capture.mjs` | 8 组风格/主题 axe 0 违规，200% 字体无页面横向溢出 |
| 增强独立样例 | 独立浏览器记录 | 39 项通过，五页与试运行前后共七页 axe 0 违规 |
| 五任务共同对照 | `node scripts/compare.mjs` | 见 [对照报告](comparison.md)，不宣称全面提升 |
| bash | Git for Windows 语法检查及 Ubuntu CI Release 安装测试 | 正常/重复/校验失败/版本冲突/路径穿越五项在 Ubuntu 已通过；macOS 未验证 |
| CI | [发布源码完整 CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/41774145035) | Windows/Ubuntu 均 success，每组 24 项核心/安装和 24 项浏览器/试运行测试通过 |
| 依赖 | `npm audit` | 升级 fflate 0.8.2→0.8.3 后 0 漏洞 |

Windows Release 测试使用真实 ZIP，覆盖正常、重复、SHA256 错误、内外版本不一致、路径穿越拒绝。管理器覆盖未受管目录、用户修改/额外文件、升级降级确认、备份、暂存失败保留旧版本。交换后的 rename 恢复分支和真实权限拒绝未单独注入验证，不能称全分支已测。网络下载失败行为有错误退出路径，但未把离线本地 ZIP 测试称为真实 GitHub Release 下载测试。

## 视觉 性能与修复
人工查看主演示桌面、小屏和 Tech 暗色，以及十组对照截图拼图；未穷尽所有状态截图。发现主题切换中按钮背景与文字过渡不同步后，去掉按钮背景颜色过渡并重新截图、扫描。独立审查发现弹窗旧 returnValue、bfcache 永久 dispose、Release 内外版本漂移；新增测试先复现，再修复后通过。

[visual-metrics.json](visual-metrics.json) 分别记录空闲和连续六次主题切换的 89 个帧间隔样本、长任务与可用 JS heap。当前样本 p95 约 6.2ms，无 >50ms 长任务；只适用于此次无头浏览器，不代表真机刷新率、GPU、绘制层或内存预算已达标。低性能开关移除 Glass 模糊；forced-colors 与减少动态效果提供静态等效交互。人工读屏、设备键盘、折叠屏与移动平台预测性返回未验证。

设计检查使用 design-taste-frontend app 流程，抽取方向 Data terminal / seed 916752658。任务指定四风格与系统字体，保留绿色产品色与系统字，不强套单一终端视觉。lint 与浏览器 inspector 均 0 FAIL；剩余告警有明确用途：当前视图标签用于定位，编号对应交互分组，Glass 模糊是任务要求且可降级，面板边框保持分组可读性，独立模块高度随内容变化。桌面标题已收敛至 32px。

## 安全 许可与 GitHub
MIT 完整文本，版权 2026 ZZM112451 经用户确认。无第三方图片、字体、商业组件和个人文档入库；开发依赖授权见 [授权记录](../../THIRD_PARTY_NOTICES.md)。fflate 的已知 ZIP64 漏洞已修复，依赖源码不包含于发布包。

Gitleaks 8.30.1 从官方 Release 下载并核对 SHA256。对拟公开文件的暂存副本执行扫描，无泄漏；完整 Git 历史在本地提交后扫描，结果单独归档。附加规则扫描检查凭据与本机路径；原始 Agent JSONL 留在忽略的 .eval-work，公开证据只保留脱敏命令与结果。扫描通过不是未知秘密的绝对保证。

仓库 [ZZM112451/fluid-ui-skill](https://github.com/ZZM112451/fluid-ui-skill) 已实际创建并核验为 Public，默认分支 main；GitHub API 已将根 LICENSE 识别为 MIT。用户完成 gh 本机认证后，已正常推送并读取远程 Skill、安装说明和验证报告，真实克隆及 GitHub 默认分支源码 ZIP 均验证根目录正确。没有强推或覆盖既有历史。

首次 [CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/41773558500) 的 Ubuntu 浏览器测试暴露弹窗 close 事件与测试直接改写 DOM 的竞态，未作正式发布。改为等待真实创建和保存结果后重开取消，修复提交 a037853326f13c36e3905951241823586c628cf9。[第二次 CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/41773841458) 暴露同毫秒升级/降级生成相同备份名的问题；新增固定时间回归后使用 timestamp+UUID 保留独立备份。[第三次完整 CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/41774145035) 的 Windows/Ubuntu 均成功，随后才创建正式版本。

正式 [v1.0.0 Release](https://github.com/ZZM112451/fluid-ui-skill/releases/tag/v1.0.0) 已发布，固定源码提交 `1fb2636d6a58228dcebced5f811cd956f31cdd27`。远程 ZIP SHA256 为 `22de8671d571aafbf677340a6fb0f1864e8e992c6c0223dcf1070e75eef3db52`。已真实下载并比对 SHA256SUMS；使用该提交下载且内容一致的安装脚本完成 Release 在线安装、同版本重复安装 unchanged、受管卸载。试装目标是隔离测试项目，原用户级 Skill modified=false。GitHub tag 源码 ZIP 和最终克隆也已核验结构与提交。报告和 JSON 验收附件均已重新下载比对哈希。

后续正常提交使用已有 origin；[首次发布辅助脚本](../../scripts/publish.ps1) 对非空仓库停止，避免覆盖。主分支可继续记录文档证据，不移动已发布 tag。

## 下载 更新和使用
已验证 GitHub 克隆、tag 源码 ZIP 与 [v1.0.0 版本包](https://github.com/ZZM112451/fluid-ui-skill/releases/download/v1.0.0/fluid-ui-skill-v1.0.0.zip)，[SHA256SUMS](https://github.com/ZZM112451/fluid-ui-skill/releases/download/v1.0.0/SHA256SUMS) 可单独下载。源码 ZIP 与版本包根目录不同，分别按安装指南处理。升级固定版本+SHA256，先 diff/备份和确认；失败保留旧版；不兼容配置停止写入。跨 Agent 真实状态见 [兼容矩阵](../compatibility.md)。

三个可直接复制的 Codex 示例：
```text
使用 $fluid-ui 优化当前表单，保留现有设计系统，只改善错误、异步失败、取消与恢复反馈，并运行测试。
使用 $fluid-ui 为 Web 设置页采用 Glass 和 Subtle，保留业务与路由，验证明暗、小屏、键盘和减少动态效果。
使用 $fluid-ui 审查 Compose 底部导航与分步弹窗，优先 Material 3 原生能力；明确区分编译验证和真机未验证。
```

后续未完成工作：在可用原生与其他 Agent 环境逐个测试；补充人工读屏、macOS 安装和更多独立触发样本。需求范围冻结为本任务书 v1，不因本次局限新增无关功能。
