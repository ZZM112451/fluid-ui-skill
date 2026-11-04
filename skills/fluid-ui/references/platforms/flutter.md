# Flutter

Liquid Glass v5：稳定 Key 保留对象状态，使用同一进度协调布局/圆角/图标，不以 AnimatedSwitcher 重挂载冒充连续形变。圆形主题扩散需要独立新主题场景与触发按钮相对坐标，ClipPath 裁剪内容而非单色圆罩。计时截止时间与 AnimationController 分离；分步布局按约束测量高度并与横向移动并发。dispose 释放控制器、取消旧请求，Semantics/系统减少动态效果提供静态等效交互。此为适配指导，Flutter 未编译/真机验证。

先读 pubspec 与 ThemeData。使用项目已采用的 Material/Cupertino 组件，Material 3 用 ColorScheme 和组件主题；不要把 Web 的 CSS 模糊方案机械转成整屏 BackdropFilter。

业务状态沿用项目方案。每个 AnimationController 只由对应 State 管理并在 dispose 释放；异步完成先检查 mounted 与请求代次。取消能力依 HTTP 客户端；无原生取消时至少拒绝迟到响应。错误与取消不作为成功。

AnimatedContainer/AnimatedSwitcher 适合局部状态变化，长列表用 builder 与稳定 key；跟手交互优先系统组件。RefreshIndicator、ExpansionTile、NavigationBar、showModalBottomSheet 满足需求时不自绘。

LayoutBuilder/MediaQuery 根据约束布局，SafeArea 与 viewInsets 处理键盘，避免固定高度。文本缩放使用系统 TextScaler，Directionality 处理 RTL；Semantics 标签、FocusTraversalGroup 和键盘 Actions 按需提供。系统 disableAnimations 时动画直接到目标状态。

验证 flutter analyze、flutter test、目标平台 build 分开记录。Widget 测试不等于真机运行。profile 模式 DevTools 检查 UI/raster 帧、内存与大图解码；用实际设备刷新周期设预算。BackdropFilter 限区域并 clip，低性能降为实色。

官方入口：[Flutter 动画](https://docs.flutter.dev/ui/animations)、[自适应响应](https://docs.flutter.dev/ui/adaptive-responsive)、[无障碍](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility)、[性能分析](https://docs.flutter.dev/perf/ui-performance)。
