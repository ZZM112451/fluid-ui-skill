# 启用 Fluid UI 的独立实验

日期：2026-11-04。环境：Windows、Node 24.16.0、Playwright 1.58.2、Chromium 本机缓存构建 1223、axe-core 4.11.1。模型继承主会话，未另行选择。未运行手机真机或其他 Agent。

## 共同任务原文

原生 HTML/CSS/JS 五个紧凑可操作自包含页面：form.html 邮件订阅并模拟异步失败；navigation.html 三页导航；sheet.html 两步 modal；data.html 带筛选的任务表；interactive.html 搜索与可展开任务卡。共同要求：保留业务状态、键盘可用、减少动态效果、小屏、状态反馈。已有产品约定：浅色绿色 accent、8px 间距、系统字体。不要新增外部依赖。

增强条件：读取 fluid-ui/SKILL.md，并按需参考决策、风格、平台与模式。五个增强页面没有读取基线实现。另一个代表性既有项目试运行才读取基线表单副本，具体见 trial/changes.md。

## 实际加载材料与决策

先读取 SKILL.md、references/decision.md、references/styles/minimal.md。创建页面时其他参考仍在主工程构建中；运行前后补读 references/patterns.md、references/platforms/web.md、references/verification.md，以及 animated-form-validation、async-button-states、adaptive-step-sheet、expandable-content-card、empty-and-error-states。补读后复核并补充了输入期间取消过期请求与清除旧状态反馈。

保留既有浅色绿色与系统字体。采用 Minimal、Subtle，统一 8px 间距。界面为高频工作工具，表格、导航、展开卡保持静态；仅状态反馈使用 140ms 淡入与 3px 位移，减少动态效果关闭。原生 form/button/select/dialog/details 提供基础语义和键盘行为。未增加运行依赖。

## 实际运行结果

- `node build-enhanced.mjs`：生成五个自包含 HTML。
- `node prepare-trial.mjs`：创建代表性非生产表单的前后副本，3 处局部反馈变化。
- `node run-validation.mjs`：39 项真实浏览器检查全部通过；见 browser-results.json。
- `node axe-audit.mjs`：五个增强页与试运行前后页，共 7 个页面，WCAG A/AA 自动规则报告 0 violations；见 axe-results.json。自动扫描不能替代人工读屏与完整无障碍验收。

运行测试覆盖三种宽度 320/390/1280、页面横向溢出、减少动态效果、运行异常、表单错误/失败/取消/恢复、请求中修改邮箱、导航草稿保留、两步弹窗及 Escape 焦点恢复、任务筛选计数、搜索时输入保留，以及试运行取消和失败回归。减少动态效果检查使用根元素的 computed animationName，加上实际 CSS 规则；它不是整页所有动态路径的穷尽检查。

首次浏览器运行有 1 项测试定位失败，因为纯 details 页面不存在 button；修正测试改检测 main 后通过，没有以改产品规避失败。首次 axe 工具调用使用简写 browser.newPage，不满足 axe 对显式 context 的要求；修正为 browser.newContext 后扫描完成。

## 截图与主观复核

生成 15 张初始页宽度截图与 2 张试运行失败状态截图。实际人工查看 form-390、navigation-390、sheet-390、data-320、interactive-390、trial-after：文字可读，未见页面溢出或重叠。data-320 的表格在已命名内部区域滚动，第三列需要横向滚动；这是可用的降级但可进一步改为手机卡片。未人工逐张复核全部 17 张，未把初次截图当作批准的视觉回归基准。

## 结果边界

本实验不能单独证明相对基线的提升。两组需按相同量表与浏览器条件统一评估；主观视觉分数尚未给出。基线表单本身已正确处理失败、重复提交和取消，因此试运行保留其异步实现，只改善错误 live 宣告、过期反馈清理和取消文案。未新增依赖、未改变 Token、未声称性能提高。

没有测量真机帧率、内存与长任务，没有测试暗色、RTL、动态字体或真实系统输入法。测试运行脚本中的本机浏览器路径仅用于本地证据，公开归档前应改为环境变量或 Playwright 默认浏览器发现。
