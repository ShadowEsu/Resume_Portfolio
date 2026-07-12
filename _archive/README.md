# Preston Susanto — 3D Portfolio

Live: https://shadowesu.github.io/Resume_Portfolio/

An interactive 3D portfolio in a red & black handwritten style, built with vanilla
JavaScript, Three.js, and GSAP. No build step required — the site is served as
static files straight from `main`.

## Design
- **One typeface**: Caveat (handwriting), used everywhere
- **Red & black**: crimson `#c1121f` accent on near-black surfaces
- **Story-driven motion**: a wandering light follows you down the page, the
  leadership timeline fills with a traveling orb, and the Golden Gate photo
  band parallaxes as you pass

## Stack
- **Three.js** (CDN ES module, lazy-loaded) — red neural-network particle hero that reacts to mouse and scroll
- **GSAP + ScrollTrigger** (CDN) — scroll-driven reveals, split-text headings, counters, timeline orb
- **Lenis** (CDN) — smooth scrolling
- **Vanilla JS + CSS** — magnetic buttons, expandable project cards, zigzag leadership timeline

## Structure
- `index.html` — all content: hero / about (with portrait) / journey / photo band / research / projects / experience / leadership / awards / contact
- `style.css` — design tokens, layout, responsive rules
- `js/main.js` — interactions and scroll animations
- `js/hero3d.js` — Three.js hero scene (lazy-loaded after first paint)
- `images/` — project screenshots, club logos, and photos

## Performance & accessibility
- Three.js loads after first paint; the hero pauses when offscreen or the tab is hidden
- Node/particle counts and pixel ratio scale down on mobile; spotlight disabled on small screens
- `prefers-reduced-motion` renders static content and disables animations
- Preloader has a CSS-only fallback so content is never blocked if JS stalls
- Elements already in view on load (e.g. anchor deep-links) render statically instead of waiting for scroll animations

## Development
```bash
npm install
npm run dev   # vite dev server on :3000
```

## Deployment
GitHub Pages serves the repository root from `main`. Push to `main` and the site updates —
no build required.
