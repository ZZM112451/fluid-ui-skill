# Collapsing Top App Bar

## 适用与禁用
长列表中节省空间并保持上下文；短页面不收缩。

## 触发与状态
expanded ↔ intermediate ↔ collapsed；搜索/焦点时固定。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
随滚动进度，snap 160–220ms；标题只用一个可访问副本。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
嵌套滚动协调，返回顶部恢复；手势不能抢系统栏。

## 无障碍
标题不重复朗读，操作始终可到达；字体放大禁用过度压缩。

## 性能约束
transform/原生 nested scroll，不逐帧布局整页。

## 平台适配
Compose TopAppBar scrollBehavior、Flutter SliverAppBar；RN 依现有滚动架构；Web sticky 回退。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
列表边界、反向滚动、焦点、搜索键盘、字体放大与安全区。记录运行环境、命令、结果和未验证项。
