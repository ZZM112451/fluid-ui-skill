# Async Button States

## 适用与禁用
真实异步操作；不能为同步操作伪造加载。

## 触发与状态
idle → loading → success/error/cancelled → retry/reset。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
状态即时；反馈淡入 100–160ms；宽度稳定避免跳动。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
重复点击禁用或最新请求；AbortController/序号；销毁清理；失败不成功。

## 无障碍
busy 与清晰文案，取消独立按钮，错误 live，焦点不丢。

## 性能约束
不将请求绑动画结束，不轮询 UI；超时由业务策略决定。

## 平台适配
Web AbortController；Kotlin coroutine cancellation；Dart 代次/取消客户端；RN AbortController。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
失败、取消后迟到响应、快速重试、卸载期间响应验证。记录运行环境、命令、结果和未验证项。
