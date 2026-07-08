/**
 * Preston Susanto — Portfolio
 * Interactions: smooth scroll (Lenis), scroll-driven story animations (GSAP
 * ScrollTrigger), wandering spotlight, zigzag leadership timeline, magnetic
 * buttons, expandable project cards, and lazy-loaded Three.js hero.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   Smooth scrolling
   ------------------------------------------------------------ */
let lenis = null;
if (!REDUCED && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            scrollToTarget(href);
            closeMobileMenu();
        }
    });
});

/* ------------------------------------------------------------
   Preloader + hero intro
   ------------------------------------------------------------ */
const preloader = document.getElementById('preloader');

// safety net: remove via wall-clock timer even if the GSAP timeline never runs
setTimeout(() => preloader?.parentNode && preloader.remove(), 3000);

// wrap each hero title line in an inner span for the mask reveal
document.querySelectorAll('.hero-title-line').forEach((line) => {
    const span = document.createElement('span');
    span.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(span);
});

if (REDUCED) {
    preloader.remove();
} else {
    const tl = gsap.timeline();
    tl.to(preloader, { autoAlpha: 0, duration: 0.5, ease: 'power2.out', delay: 0.9, onComplete: () => preloader.remove() })
      .from('.hero-eyebrow', { y: 18, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=0.15')
      .from('.hero-title-line > span', { yPercent: 115, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=0.5')
      .from('.hero-sub', { y: 24, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-cta .btn', { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.55')
      .from('.hero-stats', { y: 26, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45')
      .from('.nav', { yPercent: -100, duration: 0.7, ease: 'power3.out' }, '-=0.7');
}

/* ------------------------------------------------------------
   Lazy-load the Three.js hero after first paint
   ------------------------------------------------------------ */
const heroCanvas = document.getElementById('hero-canvas');

requestAnimationFrame(() => {
    import('./hero3d.js')
        .then((mod) => {
            const hero3d = mod.initHero(heroCanvas);
            if (hero3d && !REDUCED) {
                ScrollTrigger.create({
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => hero3d.setScroll(self.progress)
                });
            }
        })
        .catch(() => { /* WebGL/CDN unavailable — dark backdrop stays */ });
});

/* ------------------------------------------------------------
   Wandering spotlight — a light that follows you down the page,
   drifting left and right as it passes each chapter of the story.
   ------------------------------------------------------------ */
const spotlight = document.getElementById('spotlight');
if (spotlight && !REDUCED && window.innerWidth > 760) {
    const setX = gsap.quickTo(spotlight, 'x', { duration: 0.9, ease: 'power2.out' });
    const setY = gsap.quickTo(spotlight, 'y', { duration: 0.9, ease: 'power2.out' });

    ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            const p = self.progress;
            // light appears once you leave the hero, wanders side to side
            spotlight.classList.toggle('is-on', p > 0.04 && p < 0.985);
            const x = window.innerWidth * (0.5 + 0.34 * Math.sin(p * Math.PI * 7));
            const y = window.innerHeight * (0.42 + 0.16 * Math.sin(p * Math.PI * 11 + 1.3));
            setX(x);
            setY(y);
        }
    });
}

/* ------------------------------------------------------------
   Scroll progress + nav behavior
   ------------------------------------------------------------ */
gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
});

const nav = document.getElementById('nav');
let lastY = 0;
ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
        const y = self.scroll();
        nav.classList.toggle('is-scrolled', y > 40);
        nav.classList.toggle('is-hidden', y > 500 && y > lastY && Math.abs(y - lastY) > 4);
        lastY = y;
    }
});

// active section highlighting
document.querySelectorAll('main section[id]').forEach((section) => {
    const link = document.querySelector(`.nav-link[data-section="${section.id}"]`);
    if (!link) return;
    ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => link.classList.toggle('is-active', self.isActive)
    });
});

/* ------------------------------------------------------------
   Mobile menu
   ------------------------------------------------------------ */
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    burger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
}

burger.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('is-open');
    burger.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
});

/* ------------------------------------------------------------
   Section reveals
   ------------------------------------------------------------ */
// marker underline draws whenever a title reaches the viewport (CSS handles the motion)
document.querySelectorAll('.section-title').forEach((el) => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('is-underlined')
    });
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-underlined');
});

if (!REDUCED) {
    // Only pre-hide elements that start below the initial viewport. Anything
    // already visible (e.g. after an anchor deep-link like /#projects) renders
    // statically, so content never depends on a scroll event to appear.
    const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

    // split section titles into masked words
    document.querySelectorAll('[data-split]').forEach((el) => {
        if (!belowFold(el)) return;
        el.innerHTML = el.textContent.trim().split(/\s+/)
            .map((w) => `<span class="word"><span>${w}</span></span>`)
            .join(' ');
        gsap.from(el.querySelectorAll('.word > span'), {
            yPercent: 115,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    document.querySelectorAll('.section-index, .section-sub').forEach((el) => {
        if (!belowFold(el)) return;
        gsap.from(el, {
            y: 16, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // generic reveals, staggered within their parent container
    const groups = new Map();
    document.querySelectorAll('.reveal').forEach((el) => {
        if (!belowFold(el)) return;
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });
    groups.forEach((els) => {
        gsap.from(els, {
            y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: els[0], start: 'top 88%' }
        });
    });

    // timeline cards slide in from their own side
    document.querySelectorAll('.reveal-side').forEach((el) => {
        if (!belowFold(el)) return;
        gsap.from(el, {
            x: el.dataset.side === 'left' ? -70 : 70,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // Golden Gate photo band parallax
    const bandPhoto = document.getElementById('band-photo');
    if (bandPhoto) {
        gsap.fromTo(bandPhoto, { yPercent: -8 }, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: '.photo-band', start: 'top bottom', end: 'bottom top', scrub: true }
        });
    }
}

/* ------------------------------------------------------------
   Leadership timeline — the line fills and the orb travels with you
   ------------------------------------------------------------ */
const leadTimeline = document.getElementById('lead-timeline');
const leadFill = document.getElementById('lead-track-fill');
const leadOrb = document.getElementById('lead-orb');
if (leadTimeline && leadFill && leadOrb) {
    if (REDUCED) {
        leadFill.style.transform = 'scaleY(1)';
        leadOrb.style.top = '100%';
    } else {
        ScrollTrigger.create({
            trigger: leadTimeline,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.4,
            onUpdate: (self) => {
                leadFill.style.transform = `scaleY(${self.progress})`;
                leadOrb.style.top = `${self.progress * 100}%`;
            }
        });
        // light up each card's connector as the orb passes
        document.querySelectorAll('.lead-item').forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 62%',
                onEnter: () => item.classList.add('is-lit'),
                onLeaveBack: () => item.classList.remove('is-lit')
            });
        });
    }
}

/* ------------------------------------------------------------
   Animated counters (hero stats)
   ------------------------------------------------------------ */
document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (REDUCED) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
    }
    const state = { v: 0 };
    gsap.to(state, {
        v: target,
        duration: 1.6,
        delay: 1.2,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = state.v.toFixed(decimals) + suffix; }
    });
});

/* ------------------------------------------------------------
   Magnetic buttons
   ------------------------------------------------------------ */
if (FINE_POINTER && !REDUCED) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.3);
        });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
}

/* ------------------------------------------------------------
   Experience timeline — fill line as you scroll
   ------------------------------------------------------------ */
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
            scrub: 0.4,
            onUpdate: (self) => {
                expFill.style.transform = `scaleY(${self.progress})`;
            }
        });
        document.querySelectorAll('.exp-node').forEach((node) => {
            ScrollTrigger.create({
                trigger: node,
                start: 'top 68%',
                onEnter: () => node.classList.add('is-lit'),
                onLeaveBack: () => node.classList.remove('is-lit')
            });
        });
    }
}

/* ------------------------------------------------------------
   Project showcase — rail + stage switcher
   ------------------------------------------------------------ */
const projectShowcase = document.getElementById('project-showcase');
if (projectShowcase) {
    const pills = [...projectShowcase.querySelectorAll('.project-pill')];
    const panes = [...projectShowcase.querySelectorAll('.project-pane')];
    const prevBtn = document.getElementById('project-prev');
    const nextBtn = document.getElementById('project-next');
    let activeIndex = 0;

    function showProject(index, direction = 0) {
        const next = (index + panes.length) % panes.length;
        if (next === activeIndex) return;

        const current = panes[activeIndex];
        const incoming = panes[next];

        pills.forEach((pill, i) => {
            const on = i === next;
            pill.classList.toggle('is-active', on);
            pill.setAttribute('aria-selected', String(on));
        });

        if (REDUCED) {
            current.hidden = true;
            current.classList.remove('is-active');
            incoming.hidden = false;
            incoming.classList.add('is-active');
        } else {
            const outX = direction >= 0 ? -40 : 40;
            const inX = direction >= 0 ? 40 : -40;
            gsap.timeline()
                .to(current, {
                    x: outX,
                    autoAlpha: 0,
                    duration: 0.35,
                    ease: 'power2.in',
                    onComplete: () => {
                        current.hidden = true;
                        current.classList.remove('is-active');
                        gsap.set(current, { x: 0 });
                    }
                })
                .add(() => {
                    incoming.hidden = false;
                    incoming.classList.add('is-active');
                    gsap.fromTo(incoming,
                        { x: inX, autoAlpha: 0 },
                        { x: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }
                    );
                });
        }

        activeIndex = next;
    }

    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const target = parseInt(pill.dataset.project, 10);
            showProject(target, target > activeIndex ? 1 : -1);
        });
    });

    prevBtn?.addEventListener('click', () => showProject(activeIndex - 1, -1));
    nextBtn?.addEventListener('click', () => showProject(activeIndex + 1, 1));

    projectShowcase.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); showProject(activeIndex - 1, -1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); showProject(activeIndex + 1, 1); }
    });
}
