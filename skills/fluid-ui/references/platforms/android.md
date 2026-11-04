# Android Compose

读取 Gradle/version catalog、minSdk、Compose BOM 和既有导航。优先 Material3 的 Button、TextField、ModalBottomSheet、NavigationBar、TopAppBar；不覆写组件默认语义和触控行为来获得视觉效果。状态提升到实际业务所有者；UI 用 StateFlow/collectAsStateWithLifecycle 等项目已有模式。

协程以生命周期为边界；LaunchedEffect key 对应请求身份，DisposableEffect 清理外部资源。取消协程时不要吞掉 CancellationException 后继续成功反馈。保存草稿与导航状态使用适当 SavedStateHandle/rememberSaveable，不能把敏感数据随意持久化。

动画使用 animate*AsState、AnimatedVisibility/Content 和原生 transition；复合动画统一目标状态，避免在 recomposition 中启动新动画。高频手势优先原生 nested scroll；系统 Predictive Back 仅使用项目依赖版本支持的官方 API。记录设备/API/导航版本才能声明验证。

WindowInsets、IME、安全区、可用窗口尺寸适配折叠屏与多窗口；不按手机型号硬编码。字体缩放与 RTL 用布局方向和资源；TalkBack 标签不要重复正文。检查系统动画缩放禁用、对比度、48dp 级触控目标与焦点。

验证层级：Gradle 编译、Compose UI 测试、模拟器交互、真机手势分开。性能用 Macrobenchmark/FrameTimingMetric、JankStats 或项目现有工具，基于设备刷新率设每帧预算并记录 p95/掉帧。模糊/阴影不足则实色和简单海拔。

官方入口：[Compose 动画](https://developer.android.com/develop/ui/compose/animation)、[无障碍](https://developer.android.com/develop/ui/compose/accessibility)、[预测性返回](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)、[自适应布局](https://developer.android.com/develop/ui/compose/layouts/adaptive)。
