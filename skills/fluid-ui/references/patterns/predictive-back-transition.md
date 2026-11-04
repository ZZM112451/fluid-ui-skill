# Predictive Back Transition

## 适用与禁用
平台真实支持的返回预览；不在 Web 伪造 Android 系统手势。

## 触发与状态
idle → progress → commit/cancel → settled。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
跟随系统进度，不再施加独立 easing；取消回原状态。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
系统返回优先；编辑未保存按现有业务约定，不破坏栈。

## 无障碍
减少动态效果尊重平台；提供可见返回按钮。

## 性能约束
不在每帧跨 JS 桥更新大型布局。

## 平台适配
Compose 使用目标版本官方 predictive back API；Flutter/RN 核对路由版本；Web 用浏览器返回。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
真机验证提交/取消/快速重做和嵌套路由；缺设备明确未验证。记录运行环境、命令、结果和未验证项。
