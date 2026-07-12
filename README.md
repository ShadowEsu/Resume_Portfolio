# Preston Susanto · Cinematic Editorial Portfolio

Premium editorial portfolio inspired by the interaction quality of aikawakenichi.com, rebuilt for Preston Susanto (AI engineer, builder, student founder). Not a clone - same principles, original identity and content.

Branch: `cinematic-editorial`

## Stack

- Next.js App Router
- React + TypeScript
- GSAP + ScrollTrigger + Flip
- Lenis smooth scrolling
- CSS Modules + CSS custom properties
- `next/image` + `next/font` (Inter Tight + Inter)

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Editorial home + selected work gallery |
| `/work` | Full work index with Editorial / Index modes |
| `/work/[slug]` | Project detail |
| `/about` | Profile, milestones, copy-email |
| `/experiments` | Experiment cluster |

## Add a project

Edit `src/data/projects.ts`.

1. Add a `Project` object with slug, media paths, copy, technologies.
2. Put media under `public/projects/<slug>/` (`hero.jpg`, `thumb.jpg`, optional gallery frames).
3. Route `/work/<slug>` is generated automatically via `generateStaticParams`.

## Replace media

Swap files in:

```text
public/projects/regrade/
public/projects/jayminilm/
public/projects/research/
public/projects/sos/
public/projects/car-app/
public/projects/experiments/
public/about/
```

Keep filenames referenced in `src/data/projects.ts`, or update the paths there. Prefer AVIF/WebP when you export finals; JPG/PNG placeholders work now.

## Animation system

Central files:

```text
src/lib/animation/
  motion.ts          # shared durations / easings
  gsap.ts            # plugin registration
  transitions.ts     # page / line / media presets
  splitText.ts       # line masks
  reducedMotion.ts   # preference helpers

src/components/motion/
  Preloader.tsx      # real image-aware % loader
  MediaReveal.tsx    # clip-path + scale reveals
  LineReveal.tsx     # heading line reveals
  PageTransition.tsx # route enter
  Cursor.tsx         # desktop cursor states
  SmoothScroll.tsx   # Lenis + ScrollTrigger sync
```

Work gallery Editorial ↔ Index uses GSAP Flip on shared DOM items. Project open clones the clicked media for a shared-element style transition, then navigates.

## Theme

Light / dark toggle in the header. Persists in `localStorage` (`portfolio-theme`). First visit follows `prefers-color-scheme`. Tokens live in `src/styles/tokens.css`.

## Reduced motion

When `prefers-reduced-motion: reduce`:

- Lenis disabled
- Preloader skipped after session check / immediate complete
- Flip and shared-element motion fall back to instant navigation / short fades
- Parallax-style media reveals snap to final state
- Custom cursor still hides on coarse pointers

## Legacy site

Previous static Vite/HTML portfolio is archived under `_archive/` on this branch for reference. Host this Next.js app separately (Vercel recommended).

## Notes

- Visitor stats from the old site are not wired here. Re-add if needed.
- GitHub Pages static deploy workflow in `.github/` targets the old HTML site. Use Vercel/Netlify for this branch, or replace the workflow with a Next export/deploy setup.
