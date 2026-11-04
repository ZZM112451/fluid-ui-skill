# Animated Form Validation

## 适用与禁用
提交或失焦后的字段错误；不在每个输入字符时打断。

## 触发与状态
pristine → touched → invalid/valid → submitting → success/error；取消返回可编辑。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
错误淡入 100–160ms；通常不摇晃，错误预留/回流空间。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
新输入撤销过期错误，取消/旧响应不得覆盖新值。

## 无障碍
label、aria-invalid、aria-describedby；提交聚焦首错；错误可读文字。

## 性能约束
只校验受影响字段；远程验证防抖并取消；不强制动画布局。

## 平台适配
Web 原生 form；Compose/Flutter/RN 使用对应输入组件与键盘类型。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
提交无效值不发请求；修复错误后描述同步；动态字体不截断。记录运行环境、命令、结果和未验证项。
