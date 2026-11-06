# Crystal Motion — 全交互设计与实现合约

Crystal Motion 是 Glass 下的高透亮液态水晶预设，不是第五种基础风格，也不覆盖已批准的 Liquid Glass v5。用户明确选择 Crystal Motion、Crystal Glass、高透亮液态玻璃，或项目配置指定该预设时使用。已有品牌设计系统优先；Auto 不应未经授权玻璃化整个应用。

## 视觉基线与可访问性

以 [可运行参考](../../../demo/crystal-motion/index.html) 为 Web 视觉起点：浅蓝、薄荷、淡紫与粉色低饱和 Aurora 背景；玻璃本体近透明，细亮边缘和局部镜面高光，少量背景模糊，冷色柔阴影。默认参考 **95% 通透 / 95% 高光 / 3px 模糊**；这些是演示控制参数，不是跨浏览器的光学或 alpha 等价保证。

材质分为 Crystal Clear（导航、浮动控制、胶囊）、Liquid Gloss（弹窗、展开容器、菜单）、Soft Glass（卡片和较大面积背景）。用语义 token，而不是全局硬编码 alpha。不要以厚白色填充、大半径磨砂或整圈粗白边替代清澈的水晶材质。背景简单或文字对比不足时，允许增加局部遮罩或转为不透明表面；可读性优先于透明度。边缘高光必须在不同背景下仍可识别，不能成为唯一的状态提示。

参考 token：surface.fillOpacity=.05、surface.blurPx=3、edge.highlight=.95、nav.radiusPx=24、panel.radiusPx=25、accent=#307eae；实际颜色依项目 token 调整。参数必须经过真实合成背景检查，WCAG 常规文字 4.5:1、大字 3:1、关键非文本边界与焦点 3:1。forced-colors、prefers-reduced-transparency（可用时）、低性能和高对比模式提供不透明回退；暗色主题独立验证。

## 运动引擎合约

同一对象必须保持稳定身份和单一状态源。位置、尺寸、圆角、裁剪、内容显隐与高光应共享进度或耦合动力学；禁止重挂载、互不关联的 timeout、突然跳终点、旧动画完成回调覆盖新目标。交互中途反向时从当前呈现位置和速度继续，最新意图胜出；手势期间直接追踪输入，松手后以当前状态进入弹簧。弹簧起点：k=270、d=29（按实现使用的积分模型和单位调参），Soft k=150/d=24，Snappy k=450/d=36；不是跨平台通用物理常数，也不是时长或帧率保证。

每帧优先 transform/opacity；涉及尺寸的动画只更新局部受控元素，避免全页 reflow；测量与写入分批。动画不影响业务时钟、异步请求与持久状态。reduced-motion 下直接完成目标几何，保留语义反馈；必要时静态高光代替流动反射。尊重触摸滚动、系统返回、安全区、键盘、字体缩放和 RTL。

## 二十模式的 Crystal Motion 映射

以下映射是 **实施要求**，不是宣称已有二十个可运行实现。每项先读取对应 `references/patterns/<slug>.md` 的状态合约，再叠加此材质/运动层。

| 模式 | Crystal Motion 表现 | 必须验证的行为 |
|---|---|---|
| Theme Reveal | 水晶光晕围绕真实触发点扩散，场景内容连续 | 双向主题、旧新主题完整性、中断清理 |
| Floating Timer Pill | 高透亮胶囊拉伸、边缘高光随宽度运动 | 计时不重置、暂停恢复、后台时间校准 |
| Adaptive Step Sheet | Liquid Gloss 面板高度与步骤内容协同变形 | 错误阻止推进、键盘安全区、关闭焦点 |
| Fluid Bottom Navigation | **唯一共享水晶镜片**位置宽度弹簧联动，文字同步展开 | 拖动、连点反向、无跳帧、键盘 |
| Scroll-aware FAB | 同一 Crystal Clear 按钮宽度/圆角连续收缩 | 方向阈值、入口持续可用 |
| Copy Success Feedback | 高亮胶囊收缩为确认态，成功后才呈现 | 真正写入成功、拒绝、恢复代次 |
| Animated Form Validation | 细亮边缘转语义错误色，错误区域平滑展开 | aria-invalid、焦点、有效输入恢复 |
| Anchored Dropdown | 从触发器边缘延展 Liquid Gloss 菜单 | 锚点、键盘、外部关闭、焦点 |
| Shared Element Transition | 同一视觉身份，形状与光泽连续传递 | 返回、中断、滚动位置 |
| Expandable Search Field | 水晶搜索胶囊扩展为输入容器 | IME、清空、取消、焦点 |
| Elastic Pull to Refresh | 跟手阻尼和释放回弹，光泽随拉伸变化 | 阈值、刷新失败、滚动冲突 |
| Swipe Actions | 玻璃内容卡跟手位移，操作面板渐露 | 误触阈值、取消、RTL |
| Skeleton Content Transition | 低对比静态水晶占位，内容渐进替换 | 无布局跳变、减少动态效果 |
| Reaction Microinteraction | 局部高光和小幅弹性反馈 | 不阻塞连续点击、可访问名称 |
| Async Button States | 单个玻璃按钮形态转加载/成功/失败 | 防重复、请求代次、取消 |
| Immersive Image Preview | 共享图片过渡，水晶控件悬浮 | 手势缩放、返回、焦点 |
| Predictive Back Transition | 随系统手势进度连续缩放/位移 | 取消返回、系统手势优先 |
| Empty and Error States | 克制的水晶行动按钮，内容层次清晰 | 重试、离线、可读性 |
| Expandable Content Card | Soft Glass 卡片扩展到 Liquid Gloss 详情 | 动态高度、滚动、快速反转 |
| Collapsing Top App Bar | 水晶标题栏跟随滚动压缩，高光不突变 | 安全区、滚动、字体缩放 |

## 平台落地

Web：优先现有 DOM/WAAPI/CSS 能力，复杂连续形变可用 rAF 弹簧；避免不必要的全局布局读写。Compose：稳定 key、Animatable/Transition 与绘制层；Flutter：稳定 Key、AnimationController/物理模拟；React Native：沿用项目现有动画方案并核实布局属性和手势线程支持。不要把 Web 的 backdrop-filter 当作 Android/Flutter/RN 已实现的折射 API；每个平台均要有可读性与性能降级。

## 证据与完成定义

对每个实际实现的模式分别检查：初态、中间 25%/50%、终态、快速连续触发、反向/取消、键盘/读屏、reduce-motion、窄屏/动态字体、亮暗背景和真实设备性能。报告区分：规范覆盖 / Demo 可运行 / 自动测试通过 / 真机验证。没有测试的模式不得标记为“已实现”或“已验收”。

已提交的独立 Web 参考仅覆盖导航和材质控制，不能据此宣称 20 个模式全部可运行。
