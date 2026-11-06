# Fluid UI

Fluid UI is an Agent Skill for deliberate UI design and reliable interaction states. It helps coding agents preserve an existing design system, select an appropriate visual style, and validate changes with proportionate motion.

**Version 1.1.0 · MIT · Codex is the primary tested host.** [中文说明](README.zh-CN.md)

## Crystal Motion — full Skill guidance (development branch)

The new **Crystal Motion** Glass preset adds nearly transparent optical surfaces, fine luminous edge highlights, low blur, and velocity-preserving, interruptible spring motion. Its [implementation contract](skills/fluid-ui/references/presets/crystal-motion.md) maps the material and motion language across **all 20 interaction patterns**, while retaining the existing four styles and Liquid Glass v5.

- [Runnable Crystal Motion navigation demo](demo/crystal-motion/index.html) — interactive Web reference, not a 20-component library.
- [Crystal Motion config example](skills/fluid-ui/assets/crystal-motion.config.json)
- [Rollout and verification checklist](skills/fluid-ui/references/crystal-motion-rollout.md)

Use `style: "Glass", preset: "Crystal Motion"` when explicitly requested. This branch is **unreleased**: all-pattern guidance is present, but each pattern still needs implementation and verification before claiming production readiness. Existing Skill 1.1.0 remains the version baseline.

## Liquid Glass v5

Version 1.1.0 adds an **opt-in Liquid Glass preset under Glass**, preserving the original four styles and twenty patterns. Design v5 and Skill version 1.1.0 are different version axes. The approved [handoff](fluid-ui-v5-handoff/ACCEPTANCE.md) and [runnable reference](fluid-ui-v5-handoff/index.html) are preserved without modification. The [engineering demo](demo/liquid-glass/index.html) adds keyboard, focus, interruption, real clipboard failure and responsive safeguards while retaining all eight approved morphing interactions.

Run `npm run dev`, then open `http://127.0.0.1:4173/demo/liquid-glass/`. Use `style: "Glass", preset: "Liquid Glass"`; Auto will not force it on unrelated UI work. See [configuration](skills/fluid-ui/assets/liquid-glass.config.json), [morphing contract](skills/fluid-ui/references/morphing.md), and [1.1.0 verification](docs/verification/v1.1.0/report.md). Native/mobile equivalence is unverified. The three appearance menu items show selection state, not three separate material engines.

## Capabilities

- Four style references: Glass, Material 3, Minimal, Tech.
- Auto, Preset, Hybrid selection; independent Subtle, Balanced, Expressive intensity.
- Twenty on-demand [interaction patterns](skills/fluid-ui/references/patterns.md), each with states, interruption, accessibility, performance, platform adaptation and acceptance criteria.
- Web, Android Compose, Flutter and React Native implementation guidance. Guidance is not a compiled component library.
- Versioned project configuration, native-first implementation and minimum change scope.
- Runnable Web interaction lab with failure, cancellation, form recovery, theme switching, navigation, sheet and expandable content.

## Install

The repository is the authoritative distribution source: [ZZM112451/fluid-ui-skill](https://github.com/ZZM112451/fluid-ui-skill). Publication state and evidence are tracked in [verification](docs/verification/report.md); a URL alone does not establish a published release.

Clone the repository, inspect the scripts, then run with Node.js 22+:

```sh
git clone https://github.com/ZZM112451/fluid-ui-skill.git
cd fluid-ui-skill
node scripts/manage.mjs install --agent codex
```

The current Codex user target is `~/.agents/skills/fluid-ui`. Project installs use `--project <directory>`. A GitHub source ZIP is a source checkout; it is different from the versioned [Release package](https://github.com/ZZM112451/fluid-ui-skill/releases). Release installation requires a fixed version and its SHA256. Do not run downloaded remote scripts blindly.

See [Codex](docs/install/codex.md), [Claude Code](docs/install/claude.md), [Cursor](docs/install/cursor.md), [Gemini CLI](docs/install/gemini.md), and [distribution and rollback](docs/install/distribution.md). Only the tested host is described as verified; see the [compatibility matrix](docs/compatibility.md).

## Use in Codex

```text
使用 $fluid-ui 优化当前表单。保留已有设计系统，只改善错误、加载、取消和恢复反馈；实施后运行相关测试。
```

```text
使用 $fluid-ui 为 Web 设置页采用 Glass 和 Subtle，保留业务与路由，验证明暗、小屏、键盘和减少动态效果。
```

```text
使用 $fluid-ui 审查 Compose 底部导航与分步弹窗，优先 Material 3 原生能力；没有设备时明确区分编译与真机未验证。
```

## Architecture

`skills/fluid-ui/` is the installable root. `SKILL.md` routes to focused style, pattern, platform and verification references. `agents/openai.yaml` isolates Codex metadata. `assets/fluid-ui.config.json` records schema and fixed Skill version. `scripts/` contains optional config checks; core instructions do not depend on a particular host tool.

The repository additionally contains `demo/`, safe local management scripts, PowerShell/bash Release installers, tests, CI and evidence. There are no Web demo runtime dependencies. Development tools are locked in package-lock.json.

## Run and test

```sh
npm ci
npm run dev
# http://127.0.0.1:4173/demo/
npm test
npm run validate
npx playwright install chromium
npm run test:web
npm audit
npm run scan
npm run package
```

For an existing local Chromium, set `FLUID_CHROMIUM` to its executable. The [test report](docs/verification/report.md) distinguishes structure, execution, visual inspection, host invocation and unverified platforms. [Comparison study](docs/verification/comparison.md) retains five baseline/enhanced tasks and a representative existing-project trial; it does not promise a universal improvement.

## Limits and contributions

The twenty patterns are guidance; the demo implements a subset. Native Android/Flutter/RN and other agents require their own environments. Automated accessibility checks do not replace screen readers and human review. Headless browser timings are not device GPU guarantees. Explicit invocation does not prove automatic trigger reliability.

Contributions should include a focused change, reproducible tests, evidence and limitations. Preserve state correctness, existing tokens and user files. Use SemVer; update [CHANGELOG](CHANGELOG.md) and migration notes for breaking changes. Updates are manual and conflict protected, never automatic replacements.

## License

[MIT](LICENSE), copyright 2026 ZZM112451. See [third-party notices](THIRD_PARTY_NOTICES.md).
