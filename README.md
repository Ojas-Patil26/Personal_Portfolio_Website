# Ojas Patil — Portfolio

**Live: [ojas-patil.vercel.app](https://ojas-patil.vercel.app/)**

A single-page portfolio, engineered as much as designed. Seven sections on one continuous scroll — Hero, About, Experience, Skills, Projects, Fun, Contact — built with React 19, Vite, and Three.js, and deployed on Vercel. The interaction model favors direct manipulation over decoration: scroll position drives the hero video's timeline, spring physics steer the project carousel, and the loading screen doubles as the progress bar.

## Design & Interaction

- **French-press loading screen** — inlined in the document head so it paints before the app bundle is requested. The plunger's descent maps 1:1 to a weighted composite of real load signals: the streamed hero-video bytes (55%), a custom `site:ready` event dispatched on app mount (30%), font readiness (10%), and window load (5%). A time-gated easing floor keeps fast loads legible as a gesture, a stall-creep function keeps slow ones from ever looking frozen, and a hard failsafe guarantees the site is never blocked. At 100%, the press pours, a drop lands, and a particle splatter hands off to the revealed page.
- **Scroll-scrubbed hero** — scroll offset is remapped to the hero video's `currentTime` inside a `requestAnimationFrame` loop with lerp smoothing, so the figurine rotates with the page rather than playing on a clock.
- **WebGL particle field** — a custom-shader Three.js scene rendered through `@react-three/fiber` behind the hero typography, reactive to the active theme.
- **Orbiting project deck** — scroll progress feeds a spring-damped rotation (`useScroll` → `useTransform` → `useSpring`); each card counter-rotates to remain upright, and the active card expands into a portal-rendered detail view above the page.
- **Masonry gallery with lightbox** — every tile declares its encoded aspect ratio up front, so the grid reserves exact space before a single byte of media arrives (zero cumulative layout shift). The lightbox is portal-free, keyboard-operable (arrow keys, `Esc`), and traps body scroll while open.
- **Coordinated theming** — light/dark is a CSS-custom-property token system with one global transition rule, so every surface, border, and canvas element crossfades in a single coordinated switch.

## Architecture

- **Component-scoped styling** — no CSS framework. Each section owns a co-located stylesheet; shared design tokens (color, spacing, radius, type scale) live at the root. Inline styles are reserved for genuinely dynamic values.
- **One React, two renderers** — `@react-three/fiber` runs its own reconciler; Vite's `resolve.dedupe` pins the app and the 3D scene to a single React instance, avoiding the classic dual-renderer hook failures.
- **Motion discipline** — entrance animations trigger on `IntersectionObserver`, not scroll listeners; continuous animation is confined to the two surfaces designed for it (hero scrub, particle field). `prefers-reduced-motion` is honored everywhere, including the loader and autoplaying media, which degrade to static, controls-visible equivalents.
- **Zero-dependency boot path** — the loader is vanilla CSS/JS with no imports, so first paint depends on nothing but the HTML document itself.

## Privacy & Accessibility

- All published media is scrubbed of EXIF, device, and location metadata — only pixel data ships.
- Semantic landmarks and heading structure; ARIA-labeled controls; `role="dialog"` with `aria-modal` on overlay surfaces; full keyboard operability for the gallery and navigation.
- Media below the fold is lazy-loaded; the hero video streams progressively and its download is itself a loader progress signal rather than a blocking cost.

## Stack

React 19 · Vite · Three.js / `@react-three/fiber` · Motion · Vanilla CSS

## Build

```bash
npm install
npm run build   # production build → dist/
```

Continuous deployment via Vercel.

## License

MIT © 2026 Ojas Patil
