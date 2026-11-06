# Fluid UI 1.2.0 发布与验收

日期：2026-11-06。Skill 版本 1.2.0，对应 Crystal Motion 预设与 20 种交互的概念展示。

- [正式发布](https://github.com/ZZM112451/fluid-ui-skill/releases/tag/v1.2.0)；标签提交 `7608b5f8939579b26db931ba2deb8979732b5a9a`。
- 标签触发的 [发布工作流](https://github.com/ZZM112451/fluid-ui-skill/actions/runs/42180321897)：`Verify on ubuntu-latest` 与 `Verify on windows-latest` 均成功；`Publish verified release` 失败，原因是该 Release 早于推送标签手工创建，旧工作流里的 `gh release create` 对已存在的标签报 `a release with the same tag name already exists: v1.2.0`，因此 ZIP 与 SHA256SUMS 没有上传。
- 修复：[PR #5](https://github.com/ZZM112451/fluid-ui-skill/pull/5) 把发布改为幂等——verify 阶段上传实测过的 `release-package` 工件，publish 阶段下载同一份工件、再用 `gh release view` 判断是 `upload --clobber` 还是 `create --verify-tag`，并删除重复的打包步骤。合并提交 `b80c414`。
- 补齐资产：按标签内容重新打包 `fluid-ui-skill-v1.2.0.zip`（223 文件 / 4,371,716 字节），SHA256 `d0865e60570333835cfdc905ea6dd554afea4988a03ba22cd58bf28bb12ce944`，连同 `SHA256SUMS` 上传到 v1.2.0。重新下载后逐字节比对一致，GitHub 记录的资产 digest 也是同一值。
- 与 CI 工件哈希不同是可以解释的：CI 在打包前先跑 `npm run test:web`，Playwright 会重写受版本控制的 `docs/verification/browser-results.json`，所以 CI 打的包并非标签内容的精确字节。本地按标签重新打包，得到的才是标签内容本身；两者的文件数与字节数相同（223 / 4,371,716）。
- 核心/安装测试 32/32、浏览器测试 32/32（`crystal-motion` 5、`demo` 11、`liquid-glass` 15、`trial` 1）。依赖审计与敏感信息扫描在标签 CI 中均为 0 发现。
- 20 种模式的 SVG 是概念示意图，不是实现截图；Crystal Motion 的可运行参考只有共享透镜导航，其余模式仍未做独立实现与验收。
- 本报告与 `publication-verification-v1.2.0.json` 在发布后补记到主分支，因此不在 v1.2.0 包内；包内容与标签 `7608b5f` 一一对应。

未验证：原生 Compose/Flutter/React Native、其他 Agent、macOS、人工读屏、真机 GPU；自动触发可靠性只按显式/隐式/反例样本抽查，不承诺每次自动调用。

回滚：使用固定旧版本包或完整备份，管理器默认拒绝覆盖未知内容；详见 [分发与回滚](../../install/distribution.md)。
