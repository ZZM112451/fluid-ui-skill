---
name: fluid-ui
description: Use when creating or refining UI screens, components, interaction states, or motion in Web, Compose, Flutter, or React Native projects. Supports Glass, Material 3, Minimal, and Tech. Not for backend-only or document-formatting tasks.
license: MIT
metadata:
  version: "1.0.0"
---

# Fluid UI

在项目原有业务、导航与设计系统上改善界面质量。风格选择和动画数量不是质量证据。

## 工作流程

1. 读取项目指令、相关页面、组件、依赖和现有设计 Token。优先读取 `fluid-ui.config.json` 或 `docs/design-system.md`；记录产品目标、用户任务、平台、现有组件成熟度和使用频率。只列本次关联文件。
2. 判定范围：组件级、页面级或项目级，选择满足请求的最小范围。用户明确要求 > 项目既有设计系统 > 产品定位 > 平台规范 > 默认。纯后端或文档整理不采用本工作流。
3. 给出简洁决策：风格、强度、需要增强的交互、保持静态的部分和理由。模式 `Auto/Preset/Hybrid` 与强度 `Subtle/Balanced/Expressive` 独立，默认 Balanced。Hybrid 必须指明基础风格、混用组件、统一 Token 和禁区。详见 [决策与配置](references/decision.md)。
4. 按需加载 [风格入口](references/styles.md) 中当前风格，以及 [交互目录](references/patterns.md) 中本次需要的模式，不加载整个模式库。按当前平台加载 [平台入口](references/platforms.md) 中一个指南。
5. 先建立状态与行为，再添加动效。异步必须区分 loading/success/error/cancelled；使用请求序号或取消信号屏蔽过期响应。定义重复点击、动画中断、销毁恢复、手势优先级。反馈不能只靠颜色或动画。
6. 沿用项目框架和原生组件；不为轻量交互引入新动画依赖。保留业务数据流、网络接口、系统返回、键盘、弹窗与平台手势。根据安全区、字体、RTL 和设备尺寸用弹性约束布局。
7. 用 [验证基线](references/verification.md) 验证实际运行结果，包括快速操作、失败与取消、主题、小屏、键盘、减少动态效果。记录环境与实际性能样本；无设备时标注未验证。
8. 交付修改文件与原因、运行命令、实际通过/失败数、截图和未验证内容。新建或更新设计配置时先检查兼容性和已有规则，不静默重写。没有实测数据不宣称提升。

## 项目配置

可复制 [配置样例](assets/fluid-ui.config.json) 并仅保留项目用到的内容。`schemaVersion: 1`；`skillVersion` 固定已发布版本。主版本不兼容时暂停修改配置并说明迁移步骤。使用 `node scripts/check-config.mjs <项目配置>` 检查（路径相对本 Skill）。核心知识无需 Node；脚本仅作辅助。

## 常见边界

- 用户仅调整按钮反馈：只修改按钮及必要测试，不替换导航、主题或依赖。
- 高密度工具、长时间操作、无障碍偏好：减少装饰与空间运动，保留信息反馈。
- Glass 不可损害对比度；Material 3 优先平台官方组件；Tech 不使用闪烁；Minimal 不隐藏关键操作。
- 演示覆盖选定模式的 Web 实现，不代表所有模式或移动平台已经测试。以仓库验证报告为准。
