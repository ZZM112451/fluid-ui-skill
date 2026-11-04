# Expandable Content Card

## 适用与禁用
二级详情可按需展开；关键决策信息保留概要。

## 触发与状态
collapsed ↔ expanded；内部异步独立管理。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
160–240ms，高度不可测时使用原生 details，无动画等效。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
快速展开收起以最新意图；收起前将内部焦点移回触发器。

## 无障碍
button aria-expanded/controls 或 details summary；不嵌套冲突按钮。

## 性能约束
不同时动画大量卡片；长内容懒加载且保留用户输入。

## 平台适配
Web details 优先；Compose AnimatedVisibility；Flutter ExpansionTile；RN 布局动画需平台核对。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
键盘、快速切换、长内容、内部焦点、状态保留和小屏。记录运行环境、命令、结果和未验证项。
