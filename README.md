# Preston Susanto — Portfolio

Live: https://shadowesu.github.io/Resume_Portfolio/

Personal site for Preston Susanto: founder of Unvibe, independent reinforcement-learning
researcher, 5× hackathon winner, and EECS student at Diablo Valley College. Static HTML/CSS/JS,
no build step. GitHub Pages serves it straight from `main`.

## Design
- **Palette**: warm ink `#0c0b0a`, cream `#f2ede4`, and Golden Gate orange `#ff5b24`
- **Type**: Bricolage Grotesque (display), Geist (body), Geist Mono (labels)
- **Signature pieces**
  - Hero background is a live gridworld running value iteration. The cursor is the goal,
    value ripples outward around "holes", and small agents follow the greedy policy.
  - The research section has a real, in-browser tabular Q-learning demo on a 4×4 FrozenLake,
    with a toggle for potential-based reward shaping.

## Motion
- Intro curtain (once per session, pure CSS so it can't get stuck)
- Split-character hero title, scrambling role text, magnetic buttons, 3D tilt cards, cursor follower
- Line-mask section title reveals, count-up stats, scroll-velocity marquee
- GSAP Flip project filtering with a detail modal
- Pinned horizontal leadership rail on desktop (swipe on mobile)
- Parallax Golden Gate photo and a journey line that draws on scroll
- `prefers-reduced-motion` disables animation; content stays visible if the CDN scripts never load

## Structure
- `index.html`: all content (hero, Unvibe, work, research, experience, leadership, story, awards, toolbox, contact)
- `style.css`: design tokens, layout, responsive rules, and the `stats.html` styles
- `js/main.js`: smooth scroll, animations, nav, filters, modal, interactions
- `js/hero-grid.js`: hero value-iteration canvas
- `js/lake.js`: FrozenLake Q-learning demo
- `js/visitors.js`: Supabase unique-visitor counter (see `stats.html`, `supabase/`)
- `Preston_Susanto_Resume.pdf`: current résumé

## Libraries (CDN)
GSAP 3.12 + ScrollTrigger + Flip, and Lenis for smooth scrolling.

## Local preview
```bash
npx http-server -p 4321 .
```

## Deployment
Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which copies the static files to GitHub Pages.
