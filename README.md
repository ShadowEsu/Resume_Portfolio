# Preston Susanto — Portfolio

Live: https://shadowesu.github.io/Resume_Portfolio/

Personal site for Preston Susanto: founder of Unvibe, independent reinforcement-learning
researcher, 5× hackathon winner, and EECS student at Diablo Valley College. Static HTML/CSS/JS,
no build step. GitHub Pages serves it straight from `main`.

## Design
- **Palette**: text stays black, white and gray; color lives in the visuals (photos, app logos, the light-blue 3D hero and research demo). No decorative gradients
- **Type**: Inter Tight (display), Inter (body), JetBrains Mono (labels), Instrument Serif italic (gray) for accent lines
- **App logos**: Unvibe and Regrade icons float in 3D around the portrait; Unvibe's credit partners are shown under its metrics
- **Signature pieces**
  - Hero is a Three.js 3D landscape running value iteration live. The cursor is the goal, columns rise
    and light up blue as value flows toward it (around "holes"). Falls back to a 2D canvas version if WebGL or the CDN is unavailable.
  - The research section has a real, in-browser tabular Q-learning demo on a 4×4 FrozenLake,
    with a toggle for potential-based reward shaping.

## Motion
- Intro curtain (once per session, pure CSS so it can't get stuck)
- Split-character hero title, sliding role text, magnetic buttons
- 3D: headings flip up line by line, the Unvibe demo window lies back and flattens on scroll, the research
  panel swings up, project cards rise in with perspective and tilt toward the cursor, journey
  stops turn in from the side, and the leadership rail is a pinned coverflow (swipe on mobile)
- Count-up stats, scroll-velocity marquee, spinning Unvibe logo coin, GSAP Flip project filtering + modal
- `prefers-reduced-motion` disables animation; content stays visible if the CDN scripts never load

## Structure
- `index.html`: all content (hero, Unvibe, work, research, experience, leadership, story, awards, toolbox, contact)
- `style.css`: design tokens, layout, responsive rules, and the `stats.html` styles
- `js/main.js`: smooth scroll, animations, nav, filters, modal, interactions
- `js/hero3d.js`: Three.js 3D hero landscape
- `js/hero-grid.js`: 2D fallback for the hero
- `js/lake.js`: FrozenLake Q-learning demo
- `js/visitors.js`: Supabase unique-visitor counter (see `stats.html`, `supabase/`)
- `Preston_Susanto_Resume.pdf`: current résumé

## Libraries (CDN)
Three.js 0.169 (hero), GSAP 3.12 + ScrollTrigger + Flip, and Lenis for smooth scrolling.

## Local preview
```bash
npx http-server -p 4321 .
```

## Deployment
Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which copies the static files to GitHub Pages.
