# Web

Liquid Glass v5 显式预设额外遵循 [连续形变](../morphing.md)：组件 key 与 DOM 恒定，高亮从布局实时边界读取；主题新场景独立绘制、保留滚动、inert/aria-hidden，clip-path 仅作用于副本。dialog 的自然内容高度与三步 transform 同时过渡，关闭事件必须同步真实业务状态而非依赖固定延时。工程示例与原始 handoff 分开，原型跑通不等于生产可用性通过。

沿用 React/Vue/其他现有框架和样式系统。普通按钮用 button，导航用 a，表单用 form/input/label；折叠优先 details，菜单优先 select，模态优先 dialog。自定义组件才承担完整 ARIA 键盘规范。

React 用稳定 key 与受控状态，useEffect cleanup 取消监听/请求；Vue 用 onUnmounted 清理。共享动画不能直接修改框架正在管理的结构。异步用 AbortController 加请求序号，卸载时屏蔽响应；CSS transitionend 不是业务成功信号。

CSS 使用逻辑属性、minmax(0,1fr)、clamp、动态视口单位和 env(safe-area-inset-*)；表格可在区域内滚动，页面不能意外横向溢出。文本可换行，200% 字体和 320px 宽测试。弹窗跟随 visualViewport/浏览器原生键盘行为，不锁死固定高度。

只动画 transform/opacity 为优先，布局动画先量成本。Web View Transition 是可选渐进增强：检测 document.startViewTransition，拒绝或不支持时直接切主题。matchMedia('(prefers-reduced-motion: reduce)')、forced-colors 与 prefers-contrast 提供静态/高对比回退。

测试：Playwright 覆盖失败/取消/连点、键盘、宽度/主题/RTL；axe 检查语义与对比，不能替代人工读屏。DevTools Performance/rAF 样本只代表当前浏览器，不声称真机帧率。记录 LCP/CLS/长任务可用性与样本条件。

官方参考：[MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)、[View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)、[减少动态效果](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)。按当前浏览器支持表核对。
