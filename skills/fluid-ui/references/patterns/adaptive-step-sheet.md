# Adaptive Step Sheet

## 适用与禁用
短的多步骤流程；不用于长表格或需要完整页面的编辑。

## 触发与状态
关闭 → 第一步 ↔ 第二步 → 确认/取消；错误留在当前步骤。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
160–240ms 容器变化，max-height 由视口与键盘约束。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
切步保留草稿，重复确认只提交一次；退出时明确草稿策略。

## 无障碍
原生 dialog/modal、标题、焦点圈定、Escape/系统返回、关闭后恢复焦点。

## 性能约束
不反复测量整页；长内容内部滚动；无高度动画回退。

## 平台适配
Web dialog；Compose ModalBottomSheet；Flutter showModalBottomSheet；RN 原生 Modal。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
长文字、200% 字体、键盘、横屏均能到达确认和关闭。记录运行环境、命令、结果和未验证项。
