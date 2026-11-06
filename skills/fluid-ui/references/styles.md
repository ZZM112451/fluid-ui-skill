# 风格入口

只读取当前采用的一种风格。Hybrid 再读取第二种并记录边界。

- [Glass](styles/glass.md)：媒体背景和少量浮层，优先评估可读性。
- [Material 3](styles/material-3.md)：Android 原生、语义色和标准组件。
- [Minimal](styles/minimal.md)：高频操作、内容与数据密集界面。
- [Tech](styles/tech.md)：精确读数与工程工具，强调结构。

所有风格共享 [决策与配置](decision.md) 中状态、强度、Token 和无障碍合约。

Glass 的显式可选 [Liquid Glass v5](presets/liquid-glass.md) 预设有批准的八交互连续形变合约，不参与 Auto 默认选择。

Glass 新增显式可选 [Crystal Motion](presets/crystal-motion.md)：高透亮水晶材质、共享镜片、连续可中断弹簧，映射全部 20 模式。只在用户或项目明确选择时启用；[推广验收](crystal-motion-rollout.md) 区分规范与实现。
