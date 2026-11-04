# Copy Success Feedback

## 适用与禁用
可复制的短文本、代码、ID；不用于假定成功的网络写入。

## 触发与状态
idle → copying → success/error → idle；取消需恢复。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
成功文案保持约 1500ms，图标反馈 100–160ms。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
await clipboard 成功才确认；旧复原计时器清理；快速重复保持最新。

## 无障碍
aria-live polite 文本，失败提供手动选取；不要只改图标。

## 性能约束
不添加全屏 toast 层；不在日志输出复制的敏感内容。

## 平台适配
Web Clipboard API 权限/安全上下文；移动端原生剪贴板。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
权限拒绝不显示已复制；键盘及连续复制通过。记录运行环境、命令、结果和未验证项。
