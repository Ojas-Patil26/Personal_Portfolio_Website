# Ojas Patil — Portfolio

A single-page portfolio, engineered as much as designed. Seven sections on one continuous scroll — Hero, About, Experience, Skills, Projects, Fun, Contact — with a WebGL particle field, a hero video scrubbed by scroll position, and a loading screen whose animation *is* the progress bar. Built with React 19, Vite, and Three.js. Deployed on Vercel.

## Design & Interaction

- **French-press loading screen** — inlined in the document so it paints before the app bundle downloads. The plunger's descent maps 1:1 to real load progress (streamed hero-video bytes, font readiness, app mount), eased against a minimum duration so fast loads still read as a gesture. At completion the press pours, a drop lands, and a particle splatter hands off to the revealed page.
- **Scroll-scrubbed hero** — scroll position drives the hero video's timeline through a `requestAnimationFrame` loop with lerp smoothing, so the figurine turns with the page instead of playing on its own.
- **WebGL particle field** — a Three.js scene (via `@react-three/fiber`) behind the hero type, reactive to the active theme.
- **Orbiting project deck** — scroll progress rotates a card carousel through spring physics; each card counter-rotates to stay upright, and the active card expands into a portal-rendered detail view.
- **Masonry gallery with lightbox** — every tile reserves its exact aspect ratio before the asset loads (zero layout shift), and the lightbox is fully keyboard-operable with arrow-key navigation and a body-scroll trap.
- **Light/dark theming** — a CSS-custom-property token system with a single global transition, so every surface, border, and canvas element crossfades in one coordinated switch.

## Engineering Notes

- Entrance animations run on `IntersectionObserver`, not scroll listeners; `prefers-reduced-motion` is honored everywhere, including the loader and autoplaying media.
- No CSS framework — a deliberate vanilla-CSS system with one co-located stylesheet per component, an 8px spacing scale, and shared design tokens.
- All published media is scrubbed of EXIF/device/location metadata; only pixel data ships.
- Semantic sections, ARIA-labeled controls, and dialog semantics on modal surfaces.

## Stack

React 19 · Vite · Three.js / `@react-three/fiber` · Motion · Vanilla CSS

## Build

```bash
npm install
npm run build   # production build → dist/
```

The production build is deployed on Vercel.

## License

MIT © 2026 Ojas Patil
