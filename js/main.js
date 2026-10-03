/**
 * Preston Susanto — Portfolio
 * Smooth scroll, split-text reveals, magnetic/tilt interactions, project filtering + modal,
 * horizontal leadership rail, journey line, and the two RL canvases.
 */

import { registerPortfolioVisitor } from './visitors.js?v=20261003b';
import { initHeroGrid } from './hero-grid.js?v=20261003b';
import { initHero3D } from './hero3d.js?v=20261003b';
import { initLake } from './lake.js?v=20261003b';

const root = document.documentElement;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const HAS_GSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const ANIMATE = HAS_GSAP && !REDUCED;
const INTRO_PLAYING = !root.classList.contains('intro-seen');

registerPortfolioVisitor();

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis = null;
if (ANIMATE) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.Flip) gsap.registerPlugin(Flip);
    if (typeof window.Lenis !== 'undefined') {
        // lerp-based smoothing feels responsive (no long tail after the wheel stops)
        lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }
}

function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.4 });
    else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
}

$$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = href === '#top' ? document.body : $(href);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        scrollToTarget(href === '#top' ? 0 : target);
    });
});

/* ------------------------------------------------------------------ */
/* Nav: hide on scroll down, active section pill, mobile menu          */
/* ------------------------------------------------------------------ */
const nav = $('#nav');
const progress = $('#scroll-progress');
let lastY = window.scrollY;

function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (!menu.hidden) return;
    if (y > 500 && y > lastY + 4) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 500) nav.classList.remove('is-hidden');
    lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });

const pill = $('.nav-pill');
const navLinks = $$('[data-nav]');
function movePill(link) {
    if (!link) {
        pill.style.opacity = '0';
        navLinks.forEach((l) => l.classList.remove('is-active'));
        return;
    }
    navLinks.forEach((l) => l.classList.toggle('is-active', l === link));
    pill.style.opacity = '1';
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
}
const sectionMap = new Map(navLinks.map((l) => [l.getAttribute('href').slice(1), l]));
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) movePill(sectionMap.get(entry.target.id) || null);
        });
    },
    { rootMargin: '-45% 0px -50% 0px' }
);
['hero', 'now', 'work', 'research', 'experience', 'leadership', 'story', 'awards', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

const burger = $('#nav-burger');
const menu = $('#mobile-menu');
function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    lenis?.start();
}
burger.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) lenis?.stop();
    else lenis?.start();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/* ------------------------------------------------------------------ */
/* Clocks                                                              */
/* ------------------------------------------------------------------ */
const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' });
function tickClock() {
    const t = `${timeFmt.format(new Date())} PT`;
    const a = $('#local-time');
    const b = $('#footer-time');
    if (a) a.textContent = t;
    if (b) b.textContent = t;
}
tickClock();
setInterval(tickClock, 30000);

/* ------------------------------------------------------------------ */
/* Intro counter                                                       */
/* ------------------------------------------------------------------ */
if (INTRO_PLAYING && !REDUCED) {
    const counter = $('#intro-count');
    const t0 = performance.now();
    const tick = (now) => {
        const p = Math.min(1, (now - t0) / 1200);
        counter.textContent = String(Math.round(p * 100)).padStart(2, '0');
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}
setTimeout(() => $('#intro')?.remove(), INTRO_PLAYING ? 2400 : 0);

/* ------------------------------------------------------------------ */
/* Canvases                                                            */
/* ------------------------------------------------------------------ */
let hero3d = null;
(async () => {
    const canvas = $('#hero-grid');
    const api = await initHero3D(canvas, { reduced: REDUCED, mobile: window.matchMedia('(max-width: 640px)').matches });
    if (api) {
        hero3d = api;
        return;
    }
    // WebGL or the CDN failed: fall back to the 2D value map on a fresh canvas.
    const fresh = canvas.cloneNode(false);
    canvas.replaceWith(fresh);
    initHeroGrid(fresh, { reduced: REDUCED });
})();
initLake({
    canvas: $('#lab-canvas'),
    runBtn: $('#lab-run'),
    resetBtn: $('#lab-reset'),
    shapingInput: $('#lab-shaping'),
    episodesEl: $('#lab-episodes'),
    successEl: $('#lab-success'),
    solvedEl: $('#lab-solved'),
    sparkEl: $('#lab-spark'),
    reduced: REDUCED,
});

/* ------------------------------------------------------------------ */
/* Role swapper: old word slides up and out, new word slides in        */
/* ------------------------------------------------------------------ */
(function roles() {
    const el = $('#role-swap');
    if (!el) return;
    const roles = JSON.parse(el.dataset.roles || '[]');
    let i = 0;
    setInterval(() => {
        i = (i + 1) % roles.length;
        if (REDUCED || !el.animate) {
            el.textContent = roles[i];
            return;
        }
        const out = el.animate(
            [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-0.4em)', opacity: 0 }],
            { duration: 260, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
        );
        out.onfinish = () => {
            el.textContent = roles[i];
            el.animate(
                [{ transform: 'translateY(0.4em)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
                { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
            );
        };
    }, 2600);
})();

/* ------------------------------------------------------------------ */
/* Magnetic buttons, tilt                                              */
/* ------------------------------------------------------------------ */
if (FINE && ANIMATE) {
    $$('.magnetic').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.4);
        });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });

    // Tilt: at most one tween per animation frame (quickTo doesn't drive 3D rotation reliably)
    $$('[data-tilt], .project').forEach((el) => {
        const strength = el.classList.contains('portrait') ? 10 : 6;
        gsap.set(el, { transformPerspective: 900 });
        let rect = null;
        let pending = null;
        let raf = 0;
        const apply = () => {
            raf = 0;
            gsap.to(el, { rotateX: pending.x, rotateY: pending.y, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
        };
        const queue = (x, y) => {
            pending = { x, y };
            if (!raf) raf = requestAnimationFrame(apply);
        };
        el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
        el.addEventListener('pointermove', (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            queue((0.5 - (e.clientY - rect.top) / rect.height) * strength, ((e.clientX - rect.left) / rect.width - 0.5) * strength);
        });
        el.addEventListener('pointerleave', () => {
            rect = null;
            queue(0, 0);
        });
    });
}

/* ------------------------------------------------------------------ */
/* Split helpers                                                       */
/* ------------------------------------------------------------------ */
function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'char';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = ch === ' ' ? ' ' : ch;
        el.appendChild(span);
    }
    return $$('.char', el);
}

function splitLines(el) {
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map((p) => `<span class="line-mask"><span>${p.trim()}</span></span>`).join('');
    return $$('.line-mask > span', el);
}

/* ------------------------------------------------------------------ */
/* Leadership coverflow: cards turn and recede away from screen center */
/* ------------------------------------------------------------------ */
function coverflow(strength) {
    const scroller = $('#lead-scroller');
    const box = scroller.getBoundingClientRect();
    if (box.bottom < 0 || box.top > window.innerHeight) return;
    const mid = window.innerWidth / 2;
    const cards = $$('.lead-card');
    // Measure from layout offsets (not transformed rects) so rotation doesn't feed back into itself
    const trackLeft = $('#lead-track').getBoundingClientRect().left;
    const offsets = cards.map((card) => {
        const center = trackLeft + card.offsetLeft + card.offsetWidth / 2;
        return gsap.utils.clamp(-1.3, 1.3, (center - mid) / mid);
    });
    cards.forEach((card, i) => {
        const d = offsets[i];
        gsap.set(card, {
            rotateY: d * -26 * strength,
            z: -Math.abs(d) * 160 * strength,
            opacity: 1 - Math.min(Math.abs(d) * 0.3, 0.45),
        });
    });
}

/* ------------------------------------------------------------------ */
/* Animations                                                          */
/* ------------------------------------------------------------------ */
if (ANIMATE) {
    window.__animReady = true;
    const heroDelay = INTRO_PLAYING ? 1.45 : 0.15;

    // Hero entrance
    const heroChars = $$('[data-split]').map(splitChars);
    const tl = gsap.timeline({ delay: heroDelay, defaults: { ease: 'expo.out' } });
    gsap.set('[data-split]', { opacity: 1 });
    tl.from(heroChars[0], { yPercent: 115, rotate: 6, duration: 1.3, stagger: 0.035 })
        .from(heroChars[1], { yPercent: 115, rotate: 6, duration: 1.3, stagger: 0.035 }, '-=1.15')
        .fromTo('[data-hero]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, '-=1.0')
        .fromTo('[data-hero-visual]', { opacity: 0, y: 80, rotateY: -32, rotateX: 12, scale: 0.9, transformPerspective: 1200 }, { opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1, duration: 1.6 }, '-=1.2')
        .from('.app-tile', { opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.7')
        .from('.nav', { yPercent: -150, duration: 1 }, 0.2);

    // Hero scroll-out
    gsap.to('.hero-inner', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => hero3d?.setScroll(self.progress),
        },
    });

    // Section titles: line-by-line mask reveal
    $$('[data-reveal-title]').forEach((el) => {
        const lines = splitLines(el);
        gsap.from(lines, {
            yPercent: 110,
            rotateX: -75,
            transformOrigin: '50% 100%',
            transformPerspective: 900,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' },
        });
    });

    // Generic fade-ups
    $$('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
        });
    });
    $$('[data-reveal-stagger]').forEach((el) => {
        gsap.fromTo(el.children, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' },
        });
    });
    $$('[data-reveal-media]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
            opacity: 1, y: 0, duration: 1.4, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
        });
    });

    // Batched cards
    const batch = (selector, from = { y: 50 }) => {
        ScrollTrigger.batch(selector, {
            start: 'top 92%',
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, ...from }, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09, overwrite: false }),
        });
    };
    batch('.project', { y: 90, scale: 0.94, rotateX: -28, transformOrigin: '50% 0%' });
    batch('.award-row', { y: 30 });
    batch('.number', { y: 30 });

    // Count-ups
    $$('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(obj, {
            v: target,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
            onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
        });
    });

    // Marquee skews with scroll velocity
    const marquee = $('.marquee-track');
    if (marquee) {
        const skewTo = gsap.quickTo(marquee, 'skewX', { duration: 0.5, ease: 'power3' });
        ScrollTrigger.create({
            onUpdate: (self) => skewTo(gsap.utils.clamp(-10, 10, self.getVelocity() / -300)),
        });
    }

    // Unvibe demo window lies back in 3D, then flattens as you scroll to it
    gsap.fromTo('.window', { rotateX: 32, scale: 0.88, y: 30 }, {
        rotateX: 0, scale: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.unvibe-media', start: 'top bottom', end: 'center 60%', scrub: 0.6 },
    });

    // Journey stops turn in from the side
    $$('.stop').forEach((stop, i) => {
        gsap.from(stop, {
            rotateY: i % 2 ? 28 : -28, transformPerspective: 1200, transformOrigin: i % 2 ? '100% 50%' : '0% 50%',
            duration: 1.4, ease: 'expo.out',
            scrollTrigger: { trigger: stop, start: 'top 85%' },
        });
    });

    // Story photo parallax + journey line draw
    const storyImg = $('[data-parallax]');
    if (storyImg) {
        gsap.fromTo(storyImg, { yPercent: -12 }, {
            yPercent: 0, ease: 'none',
            scrollTrigger: { trigger: '.story-photo', start: 'top bottom', end: 'bottom top', scrub: true },
        });
    }
    const line = $('#journey-line');
    if (line) {
        line.setAttribute('pathLength', '1');
        gsap.fromTo(line, { strokeDasharray: 1, strokeDashoffset: 1 }, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: { trigger: '.journey', start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
        });
    }
    $$('.stop-flag').forEach((flag) => {
        gsap.from(flag, { scale: 0, rotate: -90, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: flag, start: 'top 80%' } });
    });

    // Leadership: pinned horizontal scroll on wide screens
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
        const scroller = $('#lead-scroller');
        const track = $('#lead-track');
        scroller.classList.add('is-pinned');
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
                trigger: scroller,
                start: 'center center',
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                onUpdate: () => coverflow(0.55),
                onRefresh: () => coverflow(0.55),
            },
        });
        // Keep cards turning while the track eases toward its scrubbed position
        // ...but only while the section is on screen
        let leadVisible = false;
        const io = new IntersectionObserver(([entry]) => { leadVisible = entry.isIntersecting; }, { rootMargin: '200px 0px' });
        io.observe($('#leadership'));
        const tick = () => { if (leadVisible) coverflow(0.55); };
        gsap.ticker.add(tick);
        tick();
        return () => {
            io.disconnect();
            gsap.ticker.remove(tick);
            scroller.classList.remove('is-pinned');
            gsap.set($$('.lead-card'), { clearProps: 'transform,opacity' });
        };
    });

    // Mobile: coverflow on native horizontal swipe
    mm.add('(max-width: 900px)', () => {
        const scroller = $('#lead-scroller');
        const onScroll = () => coverflow(1);
        scroller.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => scroller.removeEventListener('scroll', onScroll);
    });

    // Unvibe ⌘U keycap loop
    const keys = $$('[data-key]');
    if (keys.length) {
        let keyTimer = 0;
        const press = () => {
            keys.forEach((k, i) => setTimeout(() => k.classList.add('is-pressed'), i * 120));
            setTimeout(() => keys.forEach((k) => k.classList.remove('is-pressed')), 650);
        };
        ScrollTrigger.create({
            trigger: keys[0],
            start: 'top 90%',
            end: 'bottom 10%',
            onToggle: (self) => {
                clearInterval(keyTimer);
                if (self.isActive) { press(); keyTimer = setInterval(press, 2600); }
            },
        });
    }

    // Refresh once fonts/images settle so pin distances are right
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ------------------------------------------------------------------ */
/* Project filters + modal                                             */
/* ------------------------------------------------------------------ */
const projects = $$('.project');
$$('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        $$('.filter').forEach((b) => {
            b.classList.toggle('is-active', b === btn);
            b.setAttribute('aria-pressed', String(b === btn));
        });
        const state = ANIMATE && window.Flip ? Flip.getState(projects) : null;
        projects.forEach((p) => {
            const match = f === 'all' || p.dataset.tags.split(' ').includes(f);
            p.classList.toggle('is-hidden', !match);
        });
        if (state) {
            Flip.from(state, {
                duration: 0.7,
                ease: 'expo.inOut',
                scale: true,
                absolute: true,
                stagger: 0.03,
                onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }),
                onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
                onComplete: () => ScrollTrigger.refresh(),
            });
        } else {
            projects.forEach((p) => { p.style.opacity = '1'; });
        }
    });
});

const modal = $('#project-modal');
function openProject(card) {
    const media = $('.project-media', card).cloneNode(true);
    media.removeAttribute('class');
    const mediaHost = $('#modal-media');
    mediaHost.innerHTML = '';
    if ($('img', media)) mediaHost.appendChild($('img', media));
    else {
        const type = $('.project-media', card).cloneNode(true);
        mediaHost.appendChild(type);
    }
    $('#modal-tag').textContent = $('.tag', card).textContent;
    $('#modal-tag').className = $('.tag', card).className;
    $('#modal-title').textContent = $('.project-title', card).textContent;
    $('#modal-desc').textContent = $('.project-desc', card).textContent;
    $('#modal-detail').innerHTML = $('.project-detail', card).innerHTML;
    modal.showModal();
    lenis?.stop();
}
projects.forEach((card) => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        openProject(card);
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProject(card);
        }
    });
});
$('#modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});
modal.addEventListener('close', () => lenis?.start());

/* ------------------------------------------------------------------ */
/* Experience: cursor-following image preview                          */
/* ------------------------------------------------------------------ */
if (FINE && ANIMATE) {
    const preview = $('#exp-preview');
    const img = $('img', preview);
    const px = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
    const py = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
    gsap.set(preview, { xPercent: -50, yPercent: -50 });
    $$('.exp[data-preview]').forEach((row) => {
        const summary = $('summary', row);
        summary.addEventListener('pointerenter', () => {
            img.src = row.dataset.preview;
            preview.classList.add('is-on');
            gsap.to(preview, { scale: 1, rotate: -3, duration: 0.5, ease: 'expo.out' });
        });
        summary.addEventListener('pointerleave', () => {
            preview.classList.remove('is-on');
            gsap.to(preview, { scale: 0.6, rotate: 0, duration: 0.4 });
        });
        summary.addEventListener('pointermove', (e) => {
            px(e.clientX + 200);
            py(e.clientY);
        });
    });
}
// Keep ScrollTrigger positions correct when rows expand
$$('.exp').forEach((d) => d.addEventListener('toggle', () => HAS_GSAP && ScrollTrigger.refresh()));

/* ------------------------------------------------------------------ */
/* Copy email                                                          */
/* ------------------------------------------------------------------ */
const copyBtn = $('#copy-email');
const copyHint = $('#copy-hint');
copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
        await navigator.clipboard.writeText(email);
        copyBtn.classList.add('is-copied');
        copyHint.textContent = 'Copied ✓';
        setTimeout(() => {
            copyBtn.classList.remove('is-copied');
            copyHint.textContent = 'Click to copy';
        }, 2200);
    } catch {
        window.location.href = `mailto:${email}`;
    }
});
