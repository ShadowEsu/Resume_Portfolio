/**
 * Preston Susanto — Portfolio
 * Interactions: smooth scroll (Lenis), scroll-driven story animations (GSAP
 * ScrollTrigger), wandering spotlight, zigzag leadership timeline, magnetic
 * buttons, project carousel, and lazy-loaded Three.js hero.
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
   Projects — full-bleed auto-scroll carousel
   ------------------------------------------------------------ */
const projectZone = document.getElementById('project-scroll-zone');
const projectTrack = document.getElementById('project-track');
const projectDotsWrap = document.getElementById('project-dots');
const projectNameRail = document.getElementById('project-name-rail');
const projectActiveName = document.getElementById('project-active-name');
const projectActiveIndex = document.getElementById('project-active-index');

if (projectZone && projectTrack) {
    const slides = [...projectTrack.querySelectorAll('.project-slide')];
    let activeIndex = 0;
    let paused = false;
    let userInteracting = false;
    let autoplayTimer = null;
    let resumeTimer = null;
    let dragStartX = 0;
    let dragScrollLeft = 0;
    let isDragging = false;

    slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === 0);
        const title = slide.querySelector('.project-title')?.textContent.trim() || `Project ${i + 1}`;

        if (projectDotsWrap) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `project-dot${i === 0 ? ' is-active' : ''}`;
            dot.setAttribute('aria-label', `Go to ${title}`);
            dot.addEventListener('click', () => goTo(i, true));
            projectDotsWrap.appendChild(dot);
        }

        if (projectNameRail) {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = `project-name-chip${i === 0 ? ' is-active' : ''}`;
            chip.setAttribute('aria-label', `View ${title}`);
            chip.innerHTML = `<span class="mono">${String(i + 1).padStart(2, '0')}</span>${title}`;
            chip.addEventListener('click', () => goTo(i, true));
            projectNameRail.appendChild(chip);
        }
    });

    const dots = projectDotsWrap ? [...projectDotsWrap.querySelectorAll('.project-dot')] : [];
    const nameChips = projectNameRail ? [...projectNameRail.querySelectorAll('.project-name-chip')] : [];

    function slideCenter(index) {
        const slide = slides[index];
        if (!slide) return 0;
        return slide.offsetLeft - (projectZone.clientWidth - slide.clientWidth) / 2;
    }

    function syncActiveFromScroll() {
        const center = projectZone.scrollLeft + projectZone.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        slides.forEach((slide, i) => {
            const slideCenterX = slide.offsetLeft + slide.clientWidth / 2;
            const dist = Math.abs(slideCenterX - center);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        setActive(closest, false);
    }

    function updateNameDisplay(index) {
        const title = slides[index]?.querySelector('.project-title')?.textContent.trim() || '';
        if (projectActiveIndex) {
            projectActiveIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        }
        if (projectActiveName && title) {
            if (REDUCED || projectActiveName.textContent === title) {
                projectActiveName.textContent = title;
            } else {
                projectActiveName.classList.add('is-changing');
                setTimeout(() => {
                    projectActiveName.textContent = title;
                    projectActiveName.classList.remove('is-changing');
                }, 180);
            }
        }
        nameChips.forEach((chip, i) => chip.classList.toggle('is-active', i === index));
        nameChips[index]?.scrollIntoView({ inline: 'center', behavior: REDUCED ? 'auto' : 'smooth', block: 'nearest' });
    }

    function setActive(index, scroll) {
        activeIndex = index;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        updateNameDisplay(index);
        if (scroll) {
            projectZone.scrollTo({ left: slideCenter(index), behavior: REDUCED ? 'auto' : 'smooth' });
        }
    }

    function goTo(index, fromUser = false) {
        const next = (index + slides.length) % slides.length;
        if (fromUser) pauseTemporarily();
        setActive(next, true);
    }

    function pauseTemporarily(ms = 8000) {
        userInteracting = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { userInteracting = false; }, ms);
    }

    function startAutoplay() {
        clearInterval(autoplayTimer);
        if (REDUCED) return;
        autoplayTimer = setInterval(() => {
            if (paused || userInteracting || isDragging) return;
            goTo(activeIndex + 1);
        }, 5500);
    }

    projectZone.addEventListener('mouseenter', () => { paused = true; projectZone.classList.add('is-paused'); });
    projectZone.addEventListener('mouseleave', () => { paused = false; projectZone.classList.remove('is-paused'); });
    projectZone.addEventListener('focusin', () => pauseTemporarily());
    projectZone.addEventListener('scroll', () => {
        if (isDragging) syncActiveFromScroll();
    }, { passive: true });

    let scrollEndTimer;
    projectZone.addEventListener('scroll', () => {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(syncActiveFromScroll, 80);
    }, { passive: true });

    projectZone.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a')) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragScrollLeft = projectZone.scrollLeft;
        projectZone.classList.add('is-dragging');
        projectZone.setPointerCapture(e.pointerId);
        pauseTemporarily();
    });
    projectZone.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        projectZone.scrollLeft = dragScrollLeft - (e.clientX - dragStartX);
    });
    projectZone.addEventListener('pointerup', () => {
        isDragging = false;
        projectZone.classList.remove('is-dragging');
        syncActiveFromScroll();
    });
    projectZone.addEventListener('pointercancel', () => {
        isDragging = false;
        projectZone.classList.remove('is-dragging');
    });

    projectZone.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndex - 1, true); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndex + 1, true); }
    });

    startAutoplay();
    window.addEventListener('resize', () => setActive(activeIndex, true));
}
