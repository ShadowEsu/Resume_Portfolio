/**
 * Preston Susanto — Portfolio
 * Light interactions: scroll progress, timeline fills, photo parallax, project carousel.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

gsap.registerPlugin(ScrollTrigger);

/* Smooth scroll (Lenis) */
let lenis;
if (!REDUCED && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
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
            lenis.scrollTo(target, { offset: 0 });
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

/* Regrade screenshot marquee */
const regradeZone = document.getElementById('regrade-scroll-zone');
const regradeTrack = document.getElementById('regrade-track');
if (regradeZone && regradeTrack) {
    const originals = [...regradeTrack.children];
    originals.forEach((card) => {
        regradeTrack.appendChild(card.cloneNode(true));
    });

    if (REDUCED) {
        regradeZone.style.overflowX = 'auto';
        regradeZone.style.maskImage = 'none';
        regradeZone.style.webkitMaskImage = 'none';
        regradeTrack.style.transform = 'none';
        const hint = document.querySelector('.regrade-scroll-hint');
        if (hint) hint.textContent = 'Swipe through the product screens';
    } else {
        let offsetX = 0;
        let loopWidth = 0;
        let paused = false;
        let rafId = 0;
        let lastT = 0;
        const SPEED = 42;

        function measureRegradeLoop() {
            loopWidth = regradeTrack.scrollWidth / 2;
        }

        function tickRegrade(t) {
            rafId = requestAnimationFrame(tickRegrade);
            if (!lastT) lastT = t;
            const dt = Math.min((t - lastT) / 1000, 0.05);
            lastT = t;
            if (!paused && loopWidth > 0) {
                offsetX -= SPEED * dt;
                if (Math.abs(offsetX) >= loopWidth) offsetX += loopWidth;
                regradeTrack.style.transform = `translate3d(${offsetX}px, 0, 0)`;
            }
        }

        regradeZone.addEventListener('mouseenter', () => {
            paused = true;
            regradeZone.classList.add('is-paused');
        });
        regradeZone.addEventListener('mouseleave', () => {
            paused = false;
            regradeZone.classList.remove('is-paused');
        });
        regradeZone.addEventListener('focusin', () => {
            paused = true;
            regradeZone.classList.add('is-paused');
        });
        regradeZone.addEventListener('focusout', () => {
            paused = false;
            regradeZone.classList.remove('is-paused');
        });

        measureRegradeLoop();
        rafId = requestAnimationFrame(tickRegrade);
        window.addEventListener('resize', measureRegradeLoop);
    }
}

/* Projects — compact infinite horizontal rail */
const projectZone = document.getElementById('project-scroll-zone');
const projectTrack = document.getElementById('project-track');

if (projectZone && projectTrack) {
    const originals = [...projectTrack.querySelectorAll('.project-slide')];
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
        const SPEED = 16;

        function measureProjectLoop() {
            loopWidth = projectTrack.scrollWidth / 2;
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
            }, 900);
        };
        projectZone.addEventListener('pointerup', endDrag);
        projectZone.addEventListener('pointercancel', endDrag);

        projectZone.addEventListener(
            'wheel',
            (e) => {
                if (Math.abs(e.deltaX) + Math.abs(e.deltaY) < 2) return;
                e.preventDefault();
                paused = true;
                offsetX -= e.deltaX || e.deltaY;
                applyOffset();
                clearTimeout(resumeTimer);
                resumeTimer = window.setTimeout(() => {
                    paused = false;
                }, 1200);
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
