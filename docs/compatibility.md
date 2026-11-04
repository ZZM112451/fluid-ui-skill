# 跨 Agent 兼容矩阵

核对日期 2026-11-04。开放 Agent Skills 规范没有本项目可据以声明的固定协议版本号，记录为当日在线规范；Skill 格式版本 1、内容版本 1.0.0。共同行为量表：Token 一致、状态正确、无障碍、性能、最小侵入、适度动效、需求符合度。

| Agent | 环境/版本 | 官方安装核对 | 安装 | 发现与调用 | 实际 UI 任务 | 结论 |
|---|---|---|---|---|---|---|
| Codex | Windows / CLI 0.164.0 | [官方](https://learn.chatgpt.com/docs/build-skills) | 用户级已执行 | 显式调用实际读取已安装 Skill | 独立生成表单，见验证报告 | 显式路径已验证；自动触发另行记录 |
| Claude Code | Windows 启动器损坏 | [官方](https://code.claude.com/docs/en/skills) | 未执行 | 未验证 | 未验证 | 安装参考，未验证 |
| Cursor | 未安装可用 CLI/桌面测试环境 | [官方](https://cursor.com/docs/skills) | 未执行 | 未验证 | 未验证 | 安装参考，未验证 |
| Gemini CLI | 未安装 | [官方](https://geminicli.com/docs/cli/skills/) | 未执行 | 未验证 | 未验证 | 安装参考，未验证 |

核心 SKILL.md 仅依赖普通文件读取与宿主现有工程工具，不要求某一家 MCP。Node.js 22+ 仅用于可选配置检查、管理脚本和本仓库演示服务。跨 Agent 指南不等于真实兼容保证，不在未知宿主安装目录自动写入。

用户目录依据当日官方文档：Codex `~/.agents/skills`；Claude `~/.claude/skills`；Cursor `~/.cursor/skills`（也支持 `.agents`）；Gemini `~/.gemini/skills`（也支持 `.agents`）。各 Agent 的激活、同名优先级及信任确认可能不同，详见 [安装目录](install/distribution.md)。

测试证据：[总报告](verification/report.md)、[触发评测](../tests/trigger-evals/README.md)、[对照实验](verification/comparison.md)。没有环境的行不能用结构校验升级为“已验证”。
