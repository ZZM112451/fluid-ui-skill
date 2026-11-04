# Fluid UI 1.1.0 Liquid Glass v5 验证报告

日期 2026-11-04。设计版本 v5，Skill SemVer 1.1.0。已通过 Windows/Ubuntu CI 并[正式发布 v1.1.0](https://github.com/ZZM112451/fluid-ui-skill/releases/tag/v1.1.0)。源码提交 `777578e4339bf467c975b4c3be6108d0055f3aa2`；发布包下载校验、本地备份升级、幂等与回滚试验、用户级新进程实际读取均已完成，详见[发布与安装验收](publication-report-v1.1.0.zh-CN.md)及[机器记录](publication-verification-v1.1.0.json)。

## 依据和实施范围
用户提供的 [index.html](../../../fluid-ui-v5-handoff/index.html)、[ACCEPTANCE.md](../../../fluid-ui-v5-handoff/ACCEPTANCE.md)、[CODEX_TASK.md](../../../fluid-ui-v5-handoff/CODEX_TASK.md) 原样保留。先在 localhost 实际操作全部八交互并保存 [原型观察](reference/observations.json)，再添加 [工程示例](../../../demo/liquid-glass/index.html)。原型是批准设计的行为重建，不宣称 AppBlock 字节级导出。

Glass、Material 3、Minimal、Tech 四风格与 20 模式保留。Liquid Glass 是 `style=Glass` 下的显式 preset，不强迫 Auto 或已有项目换风格。配置 schemaVersion=1，原 1.0.0 项目配置仍可读取；不自动重写项目固定版本。

## 八交互证据
| 交互 | 实际实现与检查 |
|---|---|
| 流体导航 | 同一组按钮、唯一背景；每帧跟随 live flex 边界，快速切换最终状态、位置与节点身份检查 |
| 主题扩散 | 独立完整新主题场景，实际按钮圆心，旧主题在圆外保留，两方向中间帧与终态；副本 inert，保留滚动，完成/偏好变化清理动画 |
| 计时胶囊 | 宽度与圆角中间态，展开/收起不暂停业务时钟，播放/暂停/重置；截止时间与呈现独立 |
| 三步弹窗 | 横向滑动与实际高度并发，校验阻止推进、返回、单次保存和成功；自然内容测量，长文本与受限视口内部滚动 |
| Scroll FAB | 同节点从标签宽胶囊到圆形加号，方向/阈值控制，向上恢复 |
| 复制 | 通用双纸图标；真实浏览器剪贴板写入及读回；受控 pending/拒绝/旧 Promise，成功局部绿圆勾+附近文字，2.2 秒恢复 |
| 表单 | 红边、shake 和展开错误；有效输入清错与 aria-invalid 同步，减少动态效果不抖动 |
| 下拉 | 触发按钮实测定位、缩放/位移中间帧、当前项标记、选择/外部/Escape 关闭、焦点与方向键 |

原型中的 CSS .01ms 减少动态效果、复制异步与布局边界不作为生产保证。工程示例将减少动态效果设为直接目标状态，补齐焦点与隐藏控件 inert，修正文字对比、窄屏胶囊换行和动态字体。三项外观只表示选中状态，未实现三套独立材质引擎。

## 实测结果
- Node.js 24.16.0 / Windows / Codex CLI 0.164.0 / Playwright 1.58.2 / Chromium 148，本地 Edge 用于生成组件验证。
- `npm test`：29/29（原 24 + 5 个 preset/兼容用例）。
- `npm run test:web`：原 24 + 新 17，共 41/41 项；本地与最终两组 CI 均通过。包括导航首帧无跳跃、实际剪贴板、失败/竞态、BFCache 恢复、滚动菜单锚点、遮罩关闭、320/390/768 明暗 axe、200% 字体/短窗口/RTL、减少动态效果。
- `examples/liquid-generated` 中 `node verify.cjs`：9/9；单独调用新版 Skill 生成的组件，不混入工程 demo 的通过数。
- 官方 skill-creator `quick_validate.py`：Skill is valid；核心文件低于 500 行，四风格与20模式结构未变。
- [中间帧与性能采样](visual-metrics.json)，截图在 production/；原型截图在 reference/。样本只代表本机无头 Web，不代表真机 GPU 或移动平台性能。

本地第一次测试发现计时器断言应等待真实时间更新而非假定恰好在 1200ms tick，改为观察状态。axe 发现页脚对比和 landmark，已修正。独立只读工程审查实际复现 BFCache 返回后复制反馈不复原，新增回归先失败再修复；离开时同时清理成功类、文字和计时器。发布前复核又发现内容滚动后菜单未跟随实际触发按钮；回归先复现 60px 偏移，再在滚动时重新定位。没有忽略失败来发布。

## 触发评测
[真实日志摘要](trigger-evals.json) 使用隔离项目级新版，不提前覆盖用户级旧版。显式 `$fluid-ui` 实际读取新版并生成 ui.html/config；不含 Skill 名称的自然语言 UI 请求实际读取新版与预设/形变参考；纯后端反例未读。各一条独立上下文，不能外推为所有请求保证自动调用。

[新增静态提示案例](../../../tests/trigger-evals/liquid-glass-cases.json) 给出正反预期、边界与观察方法；未运行的案例明确标记静态。`allow_implicit_invocation: true` 保持，不将开启开关等同于实际激活。

## 版本与安装发布门槛
使用特性分支 codex/fluid-ui-v5-liquid-glass，独立审查后 PR、Windows/Ubuntu CI、正常合并，保留 1.0.0 tag/Release。新增 1.1.0 ZIP/SHA256、原始 handoff 和测试证据；在远程下载验证后，比较当前用户安装 manifest，只有无自定义修改才依据用户本次明确授权备份升级，不覆盖未知内容。

用户级目标 `~/.agents/skills/fluid-ui` 已升级至 1.1.0；完整旧版备份已移出扫描目录。升级后新进程实际读取用户级新版及预设、形变参考，版本确认为 1.1.0。备份及实际调用结果在发布验收附件记录。回滚用完整旧版备份或固定 1.0.0 包，需先检查新增用户内容。源代码快照不包含凭据、原始 Agent 会话或本机绝对路径。

## 未验证边界
Android/Flutter/RN 只更新实现指导，未编译或真机等价验收；其他 Agent 的实际发现和执行未验证。macOS、人工读屏、设备键盘、GPU/绘制层性能未验证。主题过渡使用单次串行保护；不是承诺所有运行时都支持任意并发主题切换。后退缓存回归用真实浏览器派发事件检查恢复逻辑，不冒充完整浏览器导航缓存命中率测试。
