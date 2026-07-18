/**
 * Preston Susanto — Portfolio
 * Light interactions: scroll progress, timeline fills, photo parallax, project carousel.
 */

import { registerPortfolioVisitor } from './visitors.js';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

/* Site loader — percent count with hard timeout so it never sticks at 100% */
(function initSiteLoader() {
    const root = document.getElementById('site-loader');
    const pctEl = document.getElementById('site-loader-pct');
    const fillEl = document.getElementById('site-loader-fill');
    if (!root || !pctEl || !fillEl) {
        document.body.classList.remove('is-loading');
        return;
    }

    const SESSION_KEY = 'portfolio-loader-done';
    const finish = () => {
        try {
            sessionStorage.setItem(SESSION_KEY, '1');
        } catch (_) {}
        root.classList.add('is-done');
        document.body.classList.remove('is-loading');
        root.setAttribute('aria-busy', 'false');
        window.setTimeout(() => root.remove(), 700);
    };

    if (REDUCED || sessionStorage.getItem(SESSION_KEY) === '1') {
        finish();
        return;
    }

    let target = 0;
    let shown = 0;
    let assetsDone = false;
    let exited = false;
    let raf = 0;

    const hardTimeout = window.setTimeout(() => {
        target = 100;
        assetsDone = true;
    }, 2800);

    const urls = [
        ...new Set(
            [...document.querySelectorAll('img[src]')]
                .map((img) => img.getAttribute('src'))
                .filter((src) => src && !src.startsWith('data:'))
                .slice(0, 24)
        ),
    ];

    const total = Math.max(urls.length, 1);
    let loaded = 0;
    const bump = () => {
        loaded += 1;
        target = Math.min(100, Math.round((loaded / total) * 100));
        if (loaded >= total) {
            assetsDone = true;
            target = 100;
            window.clearTimeout(hardTimeout);
        }
    };

    urls.forEach((src) => {
        const img = new Image();
        img.onload = bump;
        img.onerror = bump;
        img.src = src;
    });

    if (urls.length === 0) {
        assetsDone = true;
        target = 100;
        window.clearTimeout(hardTimeout);
    }

    const tick = () => {
        shown += (target - shown) * 0.14;
        const n = Math.round(shown);
        pctEl.textContent = `${n}%`;
        fillEl.style.width = `${n}%`;

        if (!exited && assetsDone && Math.abs(100 - shown) < 0.5) {
            exited = true;
            pctEl.textContent = '100%';
            fillEl.style.width = '100%';
            window.setTimeout(finish, 180);
            return;
        }
        raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    window.addEventListener(
        'load',
        () => {
            target = Math.max(target, 92);
            window.setTimeout(() => {
                assetsDone = true;
                target = 100;
            }, 200);
        },
        { once: true }
    );
})();

gsap.registerPlugin(ScrollTrigger);

/* Smooth scroll (Lenis) — lower duration = less lag on wheel / trackpad */
let lenis;
if (!REDUCED && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 0.72,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 1.15,
        touchMultiplier: 1.35,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

/* Anchor scroll */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(target, { offset: 0, duration: 0.85 });
        } else {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    });
});

/* Scroll progress bar — compositor transform, tight scrub */
gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: true },
});

/* Section title underline draw */
document.querySelectorAll('.section-title').forEach((el) => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('is-underlined'),
    });
    if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-underlined');
    }
});

if (!REDUCED) {
    const bandPhoto = document.getElementById('band-photo');
    if (bandPhoto) {
        gsap.fromTo(
            bandPhoto,
            { yPercent: -6 },
            {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.photo-band',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );
    }

}

/* Leadership timeline — line fill + orb */
const leadTimeline = document.getElementById('lead-timeline');
const leadFill = document.getElementById('lead-track-fill');
const leadOrb = document.getElementById('lead-orb');
if (leadTimeline && leadFill && leadOrb) {
    if (REDUCED) {
        leadFill.style.transform = 'scaleY(1)';
        leadOrb.style.transform = 'translate3d(-50%, 100%, 0)';
    } else {
        ScrollTrigger.create({
            trigger: leadTimeline,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
            onUpdate: (self) => {
                leadFill.style.transform = `scaleY(${self.progress})`;
                leadOrb.style.transform = `translate3d(-50%, ${self.progress * 100}%, 0)`;
            },
        });
        document.querySelectorAll('.lead-item').forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 62%',
                onEnter: () => item.classList.add('is-lit'),
                onLeaveBack: () => item.classList.remove('is-lit'),
            });
        });
    }
}

/* Experience timeline — line fill */
const expTimeline = document.getElementById('exp-timeline');
const expFill = document.getElementById('exp-track-fill');
if (expTimeline && expFill) {
    if (REDUCED) {
        expFill.style.transform = 'scaleY(1)';
    } else {
        ScrollTrigger.create({
            trigger: expTimeline,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
            onUpdate: (self) => {
                expFill.style.transform = `scaleY(${self.progress})`;
            },
        });
        document.querySelectorAll('.exp-node').forEach((node) => {
            ScrollTrigger.create({
                trigger: node,
                start: 'top 68%',
                onEnter: () => node.classList.add('is-lit'),
                onLeaveBack: () => node.classList.remove('is-lit'),
            });
        });
    }
}

/* Projects — compact infinite horizontal rail */
const projectZone = document.getElementById('project-scroll-zone');
const projectTrack = document.getElementById('project-track');

if (projectZone && projectTrack) {
    const originals = [...projectTrack.querySelectorAll('.project-slide')];
    const projectRatings = {
        'UNVIBE': { overall: 92, role: 'AI PRODUCT', stats: [['BLD', 94], ['UX', 91], ['AI', 93], ['SHP', 90], ['GRW', 88], ['SYS', 89]] },
        'Sortify': { overall: 89, role: 'HACK WINNER', stats: [['BLD', 90], ['UX', 88], ['AI', 91], ['SHP', 89], ['AWD', 96], ['SYS', 84]] },
        'Regrade': { overall: 91, role: 'MOBILE APP', stats: [['BLD', 93], ['UX', 90], ['AI', 92], ['SHP', 92], ['GRW', 86], ['SYS', 90]] },
        'Cauliform': { overall: 88, role: 'VOICE AGENT', stats: [['BLD', 89], ['UX', 85], ['AI', 91], ['SHP', 87], ['API', 92], ['SYS', 88]] },
        'LifeTap': { overall: 87, role: 'HARDWARE', stats: [['BLD', 90], ['UX', 86], ['HW', 94], ['SHP', 86], ['GPS', 91], ['SYS', 87]] },
        'Jarvis': { overall: 86, role: 'LOCAL AI', stats: [['BLD', 87], ['UX', 81], ['AI', 92], ['SHP', 83], ['RL', 94], ['SYS', 88]] },
        'PitchNest': { overall: 85, role: 'FOUNDER TOOL', stats: [['BLD', 86], ['UX', 84], ['AI', 88], ['SHP', 84], ['BIZ', 90], ['SYS', 85]] },
        'Access for All': { overall: 84, role: 'A11Y TOOL', stats: [['BLD', 85], ['UX', 91], ['A11Y', 96], ['SHP', 83], ['WEB', 86], ['SYS', 81]] },
        'ScholarisApp': { overall: 83, role: 'EDTECH', stats: [['BLD', 84], ['UX', 87], ['FIT', 89], ['SHP', 82], ['WEB', 84], ['SYS', 80]] }
    };
    originals.forEach((slide) => {
        const title = slide.querySelector('.project-title')?.textContent.trim();
        const rating = projectRatings[title];
        if (!rating) return;
        const visual = slide.querySelector('.project-slide-visual');
        const titleElement = slide.querySelector('.project-title');
        if (visual) visual.insertAdjacentHTML('beforeend', `<span class="project-card-overall">${rating.overall}<small>OVR</small></span><span class="project-card-role">${rating.role}</span>`);
        if (titleElement) titleElement.insertAdjacentHTML('afterend', `<div class="project-card-stats" aria-label="Project ratings">${rating.stats.map(([label, value]) => `<span class="project-card-stat"><b>${value}</b>${label}</span>`).join('')}</div>`);
    });
    originals.forEach((slide) => {
        projectTrack.appendChild(slide.cloneNode(true));
    });

    if (REDUCED) {
        projectZone.style.overflowX = 'auto';
        projectZone.style.maskImage = 'none';
        projectZone.style.webkitMaskImage = 'none';
        projectTrack.style.transform = 'none';
        const hint = document.querySelector('.project-rail-hint');
        if (hint) hint.textContent = 'Swipe through projects';
    } else {
        let offsetX = 0;
        let loopWidth = 0;
        let paused = false;
        let inView = true;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartOffset = 0;
        let rafId = 0;
        let lastT = 0;
        let resumeTimer = 0;
        let hasInitialOffset = false;
        const SPEED = 26;
        const WHEEL_GAIN = 1.75;
        const RESUME_AFTER_DRAG_MS = 450;
        const RESUME_AFTER_WHEEL_MS = 550;

        function measureProjectLoop() {
            loopWidth = projectTrack.scrollWidth / 2;
            if (!hasInitialOffset && loopWidth > 0) {
                offsetX = -loopWidth / 2;
                hasInitialOffset = true;
                applyOffset();
            }
        }

        function applyOffset() {
            if (loopWidth > 0) {
                while (offsetX > 0) offsetX -= loopWidth;
                while (Math.abs(offsetX) >= loopWidth) offsetX += loopWidth;
            }
            projectTrack.style.transform = `translate3d(${offsetX}px, 0, 0)`;
        }

        function tickProject(t) {
            rafId = requestAnimationFrame(tickProject);
            if (!lastT) lastT = t;
            const dt = Math.min((t - lastT) / 1000, 0.05);
            lastT = t;
            if (!paused && !isDragging && inView && loopWidth > 0) {
                offsetX -= SPEED * dt;
                applyOffset();
            }
        }

        projectZone.addEventListener('mouseenter', () => {
            paused = true;
        });
        projectZone.addEventListener('mouseleave', () => {
            if (!isDragging) paused = false;
        });
        projectZone.addEventListener('focusin', () => {
            paused = true;
        });
        projectZone.addEventListener('focusout', () => {
            paused = false;
        });

        projectZone.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return;
            isDragging = true;
            paused = true;
            dragStartX = e.clientX;
            dragStartOffset = offsetX;
            projectZone.setPointerCapture(e.pointerId);
            projectZone.classList.add('is-dragging');
        });
        projectZone.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            offsetX = dragStartOffset + (e.clientX - dragStartX);
            applyOffset();
        });
        const endDrag = (e) => {
            if (!isDragging) return;
            isDragging = false;
            projectZone.classList.remove('is-dragging');
            if (e && e.pointerId !== undefined) {
                try {
                    projectZone.releasePointerCapture(e.pointerId);
                } catch (_) {
                    /* ignore */
                }
            }
            clearTimeout(resumeTimer);
            resumeTimer = window.setTimeout(() => {
                paused = false;
            }, RESUME_AFTER_DRAG_MS);
        };
        projectZone.addEventListener('pointerup', endDrag);
        projectZone.addEventListener('pointercancel', endDrag);

        projectZone.addEventListener(
            'wheel',
            (e) => {
                if (Math.abs(e.deltaX) + Math.abs(e.deltaY) < 2) return;
                e.preventDefault();
                paused = true;
                const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
                offsetX -= delta * WHEEL_GAIN;
                applyOffset();
                clearTimeout(resumeTimer);
                resumeTimer = window.setTimeout(() => {
                    paused = false;
                }, RESUME_AFTER_WHEEL_MS);
            },
            { passive: false }
        );

        const projectObserver = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
            },
            { threshold: 0.08 }
        );
        projectObserver.observe(projectZone);

        measureProjectLoop();
        rafId = requestAnimationFrame(tickProject);
        window.addEventListener('resize', measureProjectLoop);
    }
}

/* Hero 3D network */
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
    import('./hero3d.js').then(({ initHero }) => {
        const hero = initHero(heroCanvas);
        if (!hero) return;
        ScrollTrigger.create({
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => hero.setScroll(self.progress),
        });
    });
}

if (!REDUCED) {
    /* Image scale reveals */
    gsap.utils.toArray('.img-reveal, .photo-band img, .project-slide-visual img, .regrade-shot-card img').forEach((img) => {
        gsap.fromTo(
            img,
            { scale: 1.08 },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: img,
                    start: 'top 88%',
                    end: 'top 40%',
                    scrub: true,
                },
            }
        );
    });

    /* Magnetic buttons (desktop only) */
    if (!MOBILE) {
        document.querySelectorAll('.btn-primary').forEach((btn) => {
            const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });
            btn.addEventListener('pointermove', (e) => {
                const r = btn.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.14);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.14);
            });
            btn.addEventListener('pointerleave', () => {
                xTo(0);
                yTo(0);
            });
        });
    }
}

registerPortfolioVisitor();
