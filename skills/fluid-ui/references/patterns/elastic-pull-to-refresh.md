# Elastic Pull to Refresh

## 适用与禁用
滚动顶部且确有可刷新数据；桌面提供按钮。

## 触发与状态
idle → pulling → armed → refreshing → success/error → idle。通用 focus/pressed/disabled 由原生控件承担；不适用的业务状态不伪造。

## 动画参数
弹性阻尼限制位移，回弹 180–260ms；网络时间不伪装固定。强度通过 Motion Token 调整，减少动态效果取消空间运动。

## 中断和恢复
未达阈值释放复位，刷新中不重复；滚动和横向手势优先。

## 无障碍
按钮等效操作；刷新结果文字，不把手势作为唯一入口。

## 性能约束
优先原生控件，避免每帧 JS 桥接；短列表也可触发。

## 平台适配
Compose pull refresh、Flutter RefreshIndicator、RN RefreshControl；Web 谨慎处理浏览器刷新。核对项目实际依赖版本，不假定跨框架 API 相同。

## 验收
低速/快速拉动、离线、重复刷新、不在顶部时不抢滚动。记录运行环境、命令、结果和未验证项。
