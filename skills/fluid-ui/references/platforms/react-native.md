# React Native

先检查 RN/Expo 版本、架构、导航与动画依赖。Pressable、TextInput、Modal、RefreshControl、FlatList 优先；已有 Reanimated 才按当前版本使用，不为简单反馈新增依赖。

动画优先 Animated 的 transform/opacity 与 useNativeDriver（仅支持属性）；不要对不支持的高度属性强开 native driver。布局动画和手势库按平台/架构验证，不能用 Web 演示代替 Android/iOS 运行。页面卸载停止动画和订阅，useEffect cleanup 取消请求并用请求序号守卫。

按钮用 accessibilityRole、accessibilityState、明确 label；错误文本与 live region 依平台能力提供。AccessibilityInfo 的减少动态效果与变化事件需清理；动态字体不禁用 font scaling。RTL 用逻辑边距与 I18nManager，触摸区域保持合理尺寸。

KeyboardAvoidingView、项目安全区组件和屏幕约束协同；不要在嵌套 ScrollView 中破坏 FlatList 虚拟化。路由返回交给现有导航库；预测性返回需在对应 RN/导航版本和 Android 真机验证。

验证 tsc/ESLint、组件测试、Metro bundle、原生编译和真机分别记录。性能在 release/profile 条件检查 JS/UI 线程帧时、长列表重渲染、内存与图像解码，低性能降级关闭模糊与布局动画。

官方入口：[Animated](https://reactnative.dev/docs/animated)、[无障碍](https://reactnative.dev/docs/accessibility)、[性能](https://reactnative.dev/docs/performance)、[键盘](https://reactnative.dev/docs/keyboardavoidingview)。
