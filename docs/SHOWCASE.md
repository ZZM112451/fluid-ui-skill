# Crystal Motion — 20 Interaction Showcase

[English](../README.md) · [简体中文](SHOWCASE.zh-CN.md) · [Interactive Web reference](../demo/crystal-motion/index.html)

> **Important:** The following SVG images are **individual conceptual illustrations**, not screenshots of 20 running implementations. They show intended appearance only. A visual illustration is not evidence that an interaction works.

The existing Skill includes 20 interaction specifications. Crystal Motion adds material/motion guidance to all 20. Currently the Crystal Motion Web demo provides a runnable shared-lens navigation example and material controls; the other pattern illustrations below do not represent completed Crystal Motion implementations.

| # | Interaction | Preview | Functional acceptance | Verification |
|---|---|---|---|---|
| 1 | [Theme Reveal](../skills/fluid-ui/references/patterns/theme-reveal.md) | ![Theme Reveal concept](images/patterns/theme-reveal.svg) | Bidirectional theme, cancel, reduced motion | Crystal Motion implementation not verified |
| 2 | [Floating Timer Pill](../skills/fluid-ui/references/patterns/floating-timer-pill.md) | ![Floating Timer Pill concept](images/patterns/floating-timer-pill.svg) | Timer continuity, pause, background resume | Crystal Motion implementation not verified |
| 3 | [Adaptive Step Sheet](../skills/fluid-ui/references/patterns/adaptive-step-sheet.md) | ![Adaptive Step Sheet concept](images/patterns/adaptive-step-sheet.svg) | Validation, keyboard and focus restoration | Crystal Motion implementation not verified |
| 4 | [Fluid Bottom Navigation](../skills/fluid-ui/references/patterns/fluid-bottom-navigation.md) | ![Fluid Bottom Navigation concept](images/patterns/fluid-bottom-navigation.svg) | Rapid reversal, drag, keyboard and shared lens | Automated test added; execution pending |
| 5 | [Scroll-aware FAB](../skills/fluid-ui/references/patterns/scroll-aware-fab.md) | ![Scroll-aware FAB concept](images/patterns/scroll-aware-fab.svg) | Scroll thresholds and persistent action target | Crystal Motion implementation not verified |
| 6 | [Copy Success Feedback](../skills/fluid-ui/references/patterns/copy-success-feedback.md) | ![Copy Success Feedback concept](images/patterns/copy-success-feedback.svg) | Clipboard success/failure and stale promises | Crystal Motion implementation not verified |
| 7 | [Animated Form Validation](../skills/fluid-ui/references/patterns/animated-form-validation.md) | ![Animated Form Validation concept](images/patterns/animated-form-validation.svg) | Error semantics and recovery | Crystal Motion implementation not verified |
| 8 | [Anchored Dropdown](../skills/fluid-ui/references/patterns/anchored-dropdown.md) | ![Anchored Dropdown concept](images/patterns/anchored-dropdown.svg) | Escape, focus and anchor placement | Crystal Motion implementation not verified |
| 9 | [Shared Element Transition](../skills/fluid-ui/references/patterns/shared-element-transition.md) | ![Shared Element Transition concept](images/patterns/shared-element-transition.svg) | Reverse navigation and element identity | Crystal Motion implementation not verified |
| 10 | [Expandable Search Field](../skills/fluid-ui/references/patterns/expandable-search-field.md) | ![Expandable Search Field concept](images/patterns/expandable-search-field.svg) | IME, clear and focus | Crystal Motion implementation not verified |
| 11 | [Elastic Pull to Refresh](../skills/fluid-ui/references/patterns/elastic-pull-to-refresh.md) | ![Elastic Pull to Refresh concept](images/patterns/elastic-pull-to-refresh.svg) | Threshold, cancel and scrolling | Crystal Motion implementation not verified |
| 12 | [Swipe Actions](../skills/fluid-ui/references/patterns/swipe-actions.md) | ![Swipe Actions concept](images/patterns/swipe-actions.svg) | RTL, cancellation and accidental swipe | Crystal Motion implementation not verified |
| 13 | [Skeleton Content Transition](../skills/fluid-ui/references/patterns/skeleton-content-transition.md) | ![Skeleton Content Transition concept](images/patterns/skeleton-content-transition.svg) | No layout jump and reduced motion | Crystal Motion implementation not verified |
| 14 | [Reaction Microinteraction](../skills/fluid-ui/references/patterns/reaction-microinteraction.md) | ![Reaction Microinteraction concept](images/patterns/reaction-microinteraction.svg) | Repeated taps and accessible state | Crystal Motion implementation not verified |
| 15 | [Async Button States](../skills/fluid-ui/references/patterns/async-button-states.md) | ![Async Button States concept](images/patterns/async-button-states.svg) | Loading, error, cancellation and stale response | Crystal Motion implementation not verified |
| 16 | [Immersive Image Preview](../skills/fluid-ui/references/patterns/immersive-image-preview.md) | ![Immersive Image Preview concept](images/patterns/immersive-image-preview.svg) | Zoom, back and dismissal | Crystal Motion implementation not verified |
| 17 | [Predictive Back Transition](../skills/fluid-ui/references/patterns/predictive-back-transition.md) | ![Predictive Back Transition concept](images/patterns/predictive-back-transition.svg) | System gesture cancellation | Crystal Motion implementation not verified |
| 18 | [Empty and Error States](../skills/fluid-ui/references/patterns/empty-and-error-states.md) | ![Empty and Error States concept](images/patterns/empty-and-error-states.svg) | Offline, retry and semantics | Crystal Motion implementation not verified |
| 19 | [Expandable Content Card](../skills/fluid-ui/references/patterns/expandable-content-card.md) | ![Expandable Content Card concept](images/patterns/expandable-content-card.svg) | Dynamic height and interruptions | Crystal Motion implementation not verified |
| 20 | [Collapsing Top App Bar](../skills/fluid-ui/references/patterns/collapsing-top-app-bar.md) | ![Collapsing Top App Bar concept](images/patterns/collapsing-top-app-bar.svg) | Safe area and large text | Crystal Motion implementation not verified |

## Verification protocol

1. Implement the pattern on its target platform using the original state contract plus the [Crystal Motion overlay](../skills/fluid-ui/references/presets/crystal-motion.md).
2. Record initial, 25%, 50%, final and reversed states using actual browser/device captures, not generated artwork.
3. Test touch, pointer, keyboard, reduced motion, high contrast, dynamic text and narrow screens as applicable.
4. Test error, cancellation, repeated input, asynchronous races and lifecycle cleanup.
5. Record actual command, environment, pass/fail, captured evidence and unverified platforms. Replace **concept** labels only after real capture.

Do not claim 20 independently verified components from these images.
