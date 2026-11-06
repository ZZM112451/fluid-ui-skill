# Crystal Motion — standalone interactive reference

Open `index.html` directly in a modern browser, or run the repository's existing dev server and visit `/demo/crystal-motion/`.

This is the approved **Crystal Motion direction** implemented as a runnable Web demo: translucent optical material, bright edge highlights, 95% transparency reference, 3px blur, a single shared lens, spring-driven position and width, pointer drag, rapid interruption, keyboard navigation, and reduced-motion support.

**Important:** This demo does not replace the existing Liquid Glass v5 implementation or the published Skill 1.1.0. It is a reference implementation, not a physics-accurate refraction engine. Visual/performance verification on real devices is still required.

## Manual acceptance
1. Tap all four tabs rapidly and reverse direction mid-animation; the shared lens should not jump to a reset position.
2. Drag across tabs and release; the lens should settle on the closest destination.
3. Adjust transparency (default 95%), highlight (95%), and blur (3px); verify text remains readable.
4. Compare Soft, Fluid, and Snappy response.
5. Test keyboard arrows and focus, narrow screens, and reduced-motion preference.

Avoid claiming 60/120 FPS without real measurements.
