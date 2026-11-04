# Reaction Microinteraction

## 适用与禁用
可逆点赞/收藏且需即时确认；不用于支付/不可逆动作。

## 触发与状态
idle ↔ selected；pending → committed/error rollback。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
100–220ms 单次 scale 轻反馈；无无限粒子。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
幂等请求/序列化，快速连点按最终意图；失败回滚到已确认状态。

## 无障碍
toggle button aria-pressed，计数文字，不逐次抢读屏。

## 性能约束
局部 transform，无粒子依赖；计数源唯一。

## 平台适配
各平台原生 toggle/语义按钮；触觉仅用户偏好允许。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
连点、请求失败、计数一致、读屏和 reduced-motion。记录运行环境、命令、结果和未验证项。
