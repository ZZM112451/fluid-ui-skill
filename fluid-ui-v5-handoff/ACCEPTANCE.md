# Fluid UI v5 · Liquid Glass — handoff and acceptance contract

## Source of truth

`index.html` is the self-contained, runnable interactive reference supplied with this package. It is a faithful handoff reconstruction of the approved v5 conversation prototype, **not a byte-for-byte export of the ChatGPT AppBlock**. Its implemented behaviors, not screenshots or prose alone, are the primary reference. Do not claim native-platform equivalence without testing.

## Run

From this directory: `python -m http.server 4173`, then open `http://localhost:4173/index.html`. No external dependencies. Clipboard APIs generally require localhost/HTTPS and appropriate permissions.

## Eight interaction contracts

1. **Fluid bottom navigation:** persistent button DOM; selected item expands icon+label; other items shrink; one background highlight animates between live positions. Rapid taps must not cause node remount or jump.
2. **Circular theme reveal:** new theme is drawn in a separate full-scene layer and revealed by a circle centered on the actual theme button. Old theme remains outside until completion. Both directions and reduced-motion fallback.
3. **Timer pill:** compact time capsule continuously expands to show pause/play/reset; clock state independent of pill expansion.
4. **Adaptive step sheet:** 3 horizontally sliding steps; container height changes concurrently; validation blocks invalid step progression; back and success work.
5. **Scroll-aware FAB:** wide label pill compresses to circular plus on downward scroll and expands on upward scroll, with threshold.
6. **Copy success:** universal overlapping-paper icon only; real successful clipboard write triggers local button-to-green-circle-check morph plus nearby success feedback; failure never shows success; restores after ~2.2 seconds.
7. **Form validation:** red border, shake, smoothly revealed error; valid input recovers.
8. **Anchored dropdown:** menu transitions from trigger vicinity; selected item marked; supports close and selection.

## Design and motion tokens

- Light background: layered pale blue gradient with subtle blue/purple radial ambience.
- Text: deep slate-blue, muted cool grey-blue.
- Accent: restrained medium blue `#307eae`; success green `#168e76`.
- Glass: semi-transparent white, white edge, background blur, soft cool shadow; dark uses low-opacity white.
- Typical large card radius 19–25px; floating nav 25px; primary button 13–15px.
- Morph and layout transitions: approximately 420–560ms, `cubic-bezier(.22,1,.36,1)`.
- Theme reveal: approximately 720ms, same easing.
- Feedback: 300–420ms; feedback dwell ~2200ms.
- Motion values are reference starting points, not device performance guarantees.

## Non-regression

Do not replace continuous shape changes with remounts, opacity-only fades, independent toast-only copy feedback, fake circular overlays, or abrupt sheet content replacement. Preserve the other existing 20 Skill patterns and four style presets. Liquid Glass must be an opt-in preset, not forced on every UI task.

## Known limits / honest verification

- This is a web interaction reference, not Android/Flutter/React Native production code.
- The dropdown's alternative visual presets demonstrate selection state, not three complete material engines.
- Secondary pages are interaction context, not a complete productivity application.
- Clipboard write may be blocked in file:// or embedded preview contexts.
- Automated cross-browser, device GPU, accessibility and native tests are **not** included or claimed as passed.
- A coding agent should run and inspect the demo, then implement production components with platform-native primitives and tests.

## Skill integration and release requirements

Target repository: `ZZM112451/fluid-ui-skill`. Existing version: `1.0.0`; suggested compatible enhancement: `1.1.0`. Preserve existing architecture, 20 patterns, four styles, installation/update/rollback safeguards. Add Liquid Glass and explicit state-driven morphing rules to `skills/fluid-ui/SKILL.md` and focused references. Improve natural-language discovery with accurate positive/negative trigger cases; do not claim guaranteed auto-invocation. Test explicit `$fluid-ui` and implicit UI requests separately. Update changelog, demos, tests, docs and version metadata. Use a feature branch, review changes, publish using repository release procedures, and install the verified release to `~/.agents/skills/fluid-ui` with backup and version checks. Do not claim these steps occurred until actually executed.
