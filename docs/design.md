# Fluid UI v1 设计

依据用户提供的 Fluid UI 任务书完整 29 章执行。核心是按需指导现有 UI 工程，而非跨框架组件库。风格为 Glass、Material 3、Minimal、Tech；模式 Auto、Preset、Hybrid；强度 Subtle、Balanced、Expressive 独立。

仓库中的 skills/fluid-ui 是唯一可安装核心；references 按决策、风格、模式、平台、验收分层。项目配置用 schemaVersion 与 skillVersion 固定兼容性。工具使用 Node 22+ 标准库；Web 演示运行时零依赖。开发依赖仅浏览器测试、无障碍检测和 ZIP 打包。

演示是交互实验台，绿色强调、系统字体、8px 间距。四种风格由同一状态模型驱动；使用原生 button、select、dialog、details、form。异步采用请求序号与 AbortController，主题动画取消旧动画，减少动态效果保持结果。独立基线和增强样例比较五类任务；代表性既有项目使用测试副本，不改生产项目。

安装在临时目录校验后原子改名；仅管理带 manifest 的文件；同版本相同内容幂等；修改、升级、降级需要明确确认，保留备份并可回滚。Release 固定版本与 SHA256。公开前检查工作树和 Git 历史；认证缺失不绕过。

版权由用户确认使用 ZZM112451，年份 2026，MIT。外部 Agent 与移动平台缺少运行环境时标记未验证。没有真实 CI、远程读取和 Release 验证时不得报告发布完成。
