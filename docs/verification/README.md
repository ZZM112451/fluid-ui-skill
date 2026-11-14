# 验证索引 / Verification index

当前已发布 Skill：**1.2.0 — Crystal Motion**。本站与主分支可包含发布后的修复；`v1.2.0` 标签和版本包保持原发布内容。

| 范围 | 权威证据 | 状态 |
|---|---|---|
| v1.2.0 发布 | [发布报告及勘误](v1.2.0/publication-report-v1.2.0.zh-CN.md)、[JSON](v1.2.0/publication-verification-v1.2.0.json)、[Release](https://github.com/ZZM112451/fluid-ui-skill/releases/tag/v1.2.0) | 标签 CI 两平台均为核心 32、浏览器 46；最终 ZIP 为标签重建包，不能称同一工件经过测试 |
| Crystal Motion 导航 | [标签 CI](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/42180321897)、[20 模式状态](../SHOWCASE.zh-CN.md) | 导航专项 5/5；其余模式没有独立 Crystal Motion 实现验收 |
| 主分支 / Pages 修复 | 对应提交的 CI `evidence-*` 与 Pages 的 `pages-verification` 工件 | 使用部署目录和 `/fluid-ui-skill/` 子路径测试；结果随各次运行保存，不能从旧报告推定当前通过 |
| v1.1.0 Liquid Glass | [历史报告](v1.1.0/report.md) | 保留原范围与限制 |
| v1.0.0 | [历史报告](report.md) | 保留原范围与限制 |
| 2026-11-04 浏览器快照 | [历史 JSON](browser-results.json) | 41 项旧记录，不包含 Crystal Motion；不是当前 1.2.0 报告 |

## 复现当前检查

```sh
npm ci
npx playwright install chromium
npm test
npm run validate
npm run test:web
npm run test:site
npm run package
npm run test:package
```

- `test:web` 将 JSON 写入 `test-results/browser/results.json`，不再重写包内历史记录。
- `test:site` 先组装 `_site/`，校验 HTML、CSS 和模块引用，再测试实际部署子路径的保存、失败、取消、弹窗、材质切换、导航、图片与小屏。
- `test:package` 校验 ZIP 的 SHA256，解压同一份 ZIP，使用锁定的开发依赖重跑核心、引用与浏览器测试；记录在 `test-results/package-verification.json`。
- CI 上传报告；Release 工作流只上传完成解压测试的原始 ZIP，不重新打包。本站修复不会自动创建新版本。

## 展示与限制

20 张 SVG 仍是概念示意图。已实现演示的真实浏览器截图见 [运行展示](../RUNTIME_SHOWCASE.md)，不能从这些截图推定 20 个模式、移动原生平台或全部 Agent 均可用。

原生 Compose / Flutter / React Native、macOS、其他 Agent、人工读屏和真机 GPU 仍未验证。显式调用已有样本证据；自动触发不保证每次成功。
