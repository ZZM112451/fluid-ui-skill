# Fluid Bottom Navigation

## 适用与禁用
3–5 个同层主目的地；不把提交或临时操作放进导航。

## 触发与状态
当前页 → 目标页；每页保存滚动与必要草稿。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
指示器 160–220ms，标签始终可见；不用整条橡皮变形。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
快速点击以最新路由为准；动画不可阻止返回。

## 无障碍
nav+aria-current；路由链接可键盘；不冒充 tab 除非真正 tabpanel。

## 性能约束
指示器只 transform；大屏转 rail 而非拉长。

## 平台适配
各平台使用现有导航路由；Compose NavigationBar、Flutter NavigationBar；RN 保留路由栈。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
前进返回恢复当前页；快速切换和刷新路由一致。记录运行环境、命令、结果和未验证项。
