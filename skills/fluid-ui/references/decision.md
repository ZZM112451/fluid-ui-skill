# 决策与配置

## Crystal Motion 选择规则

`style: "Glass"`、`preset: "Crystal Motion"` 时读取 [Crystal Motion 合约](presets/crystal-motion.md)，并对所有被实施的模式应用其统一材质、可中断弹簧、手势跟踪与可读性降级。用户明确要求其他风格时不得强制启用；Auto 不自动全局玻璃化。与原 Liquid Glass v5 并存，二者是不同预设，不可将 v5 的固定时长误认为 Crystal Motion 的弹簧参数。配置示例见 `assets/crystal-motion.config.json`；在正式发布前不应把示例中的 skillVersion 当作新版本发布证明。

## 1.1 可选预设
四个风格值不变；仅当用户明确要求或现有配置指定 `preset: "Liquid Glass"` 时读取 [v5 合约](presets/liquid-glass.md)。该预设仅与 `style: "Glass"` 配套，冲突时明确报错。Auto 未选择它时不得强制八交互或蓝色材质。项目固定 1.0.0 的旧配置继续有效；schemaVersion 仍为 1，升级不自动改写项目文件。显式预设的已批准 motion 参数优先于通用模式的起始建议，仍须无障碍降级。

## 输入与输出
收集产品类型、用户任务、场景、平台、设计系统、成熟组件与高频交互。输出不超过一段的决策依据，以及本次文件范围。

| 条件 | 决策 |
|---|---|
| 用户明确风格与强度 | 使用指定值，保留无障碍底线 |
| 已有品牌或设计系统 | 继承，不随机替换；自定义风格可沿用原名 |
| Android 原生项目无现有系统 | 优先 Material 3 |
| 数据密集、长时间使用、高频输入 | Minimal 或现有系统，通常 Subtle |
| 背景丰富且前景稀疏 | 可 Glass，先测对比度与模糊成本 |
| 工程控制台、精确信息 | 可 Tech，避免不必要光效 |
| 产品强调展示与情绪 | 可 Expressive，但不增加关键操作等待 |

Auto 表示依输入决策；Preset 表示用户明确选择；Hybrid 表示单一基础系统下有边界混用。例如 Material 3 的布局、字体和控件状态，只有媒体预览浮层采用 Glass 表面；不可同时混合两套字阶和间距。

## 强度是独立轴
以下是设计起点，不是设备性能测量。

| 强度 | 反馈时长 | 位移上限起点 | 使用原则 |
|---|---|---|---|
| Subtle | 100–160ms | 2–4px | 颜色与透明度反馈为主 |
| Balanced | 160–240ms | 4–8px | 有因果的展开与导航 |
| Expressive | 220–320ms | 8–16px | 展示情境；高频操作仍保持短反馈 |

减少动态效果关闭缩放、弹性和空间位移，状态立刻变化或短淡入。高对比度模式去掉透明与装饰阴影。强度不能改变 hit target、焦点或状态正确性。

## Token 合约
颜色按 background/surface/text/muted/accent/onAccent/border/error 语义命名，明暗各一套。常规文本对比目标 4.5:1，大文本 3:1，控件边界/焦点 3:1。间距 4/8/12/16/24/32，字阶 12/14/16/20/28。避免使用固定容器高度截断动态字体。

Motion Token 用 duration.fast/standard/slow、easing.standard、distance.small，组件读取语义值；不要把每种风格绑定到唯一强度。统一圆角层级 control/panel/overlay。图标遵循现有集，无集时优先文字。

配置 schemaVersion 表示结构，skillVersion 固定内容。读取失败或主版本变化时停止写入并报告，不覆盖。升级先 diff、备份、迁移、测试；失败回滚到备份。项目例外说明优先于默认 Token。

## 状态与生命周期
所有交互按适用性填写 idle/focus/pressed/disabled/loading/success/error/cancelled/recovery；不适用项写明原因。手势冲突让滚动与系统返回优先。动画中断应从当前呈现状态向最新目标运动，销毁时取消监听/计时器/请求。异步请求用代次与取消信号双重防护，不以动画结束代表请求成功。
