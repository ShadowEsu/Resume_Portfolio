/**
 * Preston Susanto — Portfolio
 * Light interactions: Three.js hero, scroll progress, timeline fills, photo parallax, project carousel.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

/* Lazy-load Three.js neural-net hero after first paint */
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
                    onUpdate: (self) => hero3d.setScroll(self.progress),
                });
            }
        })
        .catch(() => { /* WebGL/CDN unavailable — dark backdrop stays */ });
});

/* Smooth anchor scroll (native) */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
        closeMobileMenu();
    });
});

/* Scroll progress bar */
gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
});

/* Nav: scrolled state + active section */
const nav = document.getElementById('nav');
ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
        nav?.classList.toggle('is-scrolled', self.scroll() > 40);
    },
});

document.querySelectorAll('main section[id]').forEach((section) => {
    const link = document.querySelector(`.nav-link[data-section="${section.id}"]`);
    if (!link) return;
    ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
});

/* Mobile menu */
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    burger?.classList.remove('is-open');
    mobileMenu?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
}

burger?.addEventListener('click', () => {
    const open = !mobileMenu?.classList.contains('is-open');
    burger.classList.toggle('is-open', open);
    mobileMenu?.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
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
            scrub: 0.4,
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

/* Projects — infinite loop carousel (horizontal only) */
const projectZone = document.getElementById('project-scroll-zone');
const projectTrack = document.getElementById('project-track');
const projectDotsWrap = document.getElementById('project-dots');
const projectNameRail = document.getElementById('project-name-rail');
const projectActiveName = document.getElementById('project-active-name');
const projectActiveIndex = document.getElementById('project-active-index');

if (projectZone && projectTrack) {
    const originalSlides = [...projectTrack.querySelectorAll('.project-slide')];
    if (!originalSlides.length) {
        // no-op
    }

    // Duplicate once for seamless wrap
    const clones = originalSlides.map((s) => {
        const c = s.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.querySelectorAll('a, button, input, textarea, select').forEach((el) => {
            el.setAttribute('tabindex', '-1');
        });
        return c;
    });
    clones.forEach((c) => projectTrack.appendChild(c));

    const slides = [...projectTrack.querySelectorAll('.project-slide')];
    let activeIndex = 0;
    let dragStartX = 0;
    let dragScrollLeft = 0;
    let isDragging = false;
    let paused = false;
    let raf = 0;
    let lastT = 0;
    let loopWidth = 0; // width of the original set
    const SPEED_PX_PER_S = 42;

    originalSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === 0);
        const title = slide.querySelector('.project-title')?.textContent?.trim() || `Project ${i + 1}`;

        if (projectDotsWrap) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `project-dot${i === 0 ? ' is-active' : ''}`;
            dot.setAttribute('aria-label', `Go to ${title}`);
            dot.addEventListener('click', () => goTo(i));
            projectDotsWrap.appendChild(dot);
        }

        if (projectNameRail) {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = `project-name-chip${i === 0 ? ' is-active' : ''}`;
            chip.setAttribute('aria-label', `View ${title}`);
            chip.innerHTML = `<span class="mono">${String(i + 1).padStart(2, '0')}</span>${title}`;
            chip.addEventListener('click', () => goTo(i));
            projectNameRail.appendChild(chip);
        }
    });

    const dots = projectDotsWrap ? [...projectDotsWrap.querySelectorAll('.project-dot')] : [];
    const nameChips = projectNameRail ? [...projectNameRail.querySelectorAll('.project-name-chip')] : [];

    function measureLoopWidth() {
        loopWidth = originalSlides.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
        // include gaps from flex container
        const styles = getComputedStyle(projectTrack);
        const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
        loopWidth += gap * Math.max(0, originalSlides.length - 1);
    }

    function slideCenter(index) {
        const slide = originalSlides[index];
        if (!slide) return 0;
        return slide.offsetLeft - (projectZone.clientWidth - slide.clientWidth) / 2;
    }

    function syncActiveFromScroll() {
        // Wrap first so "center" is stable
        if (loopWidth > 0) {
            const s = projectZone.scrollLeft;
            if (s >= loopWidth) projectZone.scrollLeft = s - loopWidth;
            else if (s < 0) projectZone.scrollLeft = s + loopWidth;
        }

        const center = projectZone.scrollLeft + projectZone.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        originalSlides.forEach((slide, i) => {
            const slideCenterX = slide.offsetLeft + slide.clientWidth / 2;
            const dist = Math.abs(slideCenterX - center);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        setActive(closest, false);
    }

    function centerNameChip(index) {
        const chip = nameChips[index];
        if (!chip || !projectNameRail) return;
        const left =
            chip.offsetLeft - (projectNameRail.clientWidth - chip.clientWidth) / 2;
        projectNameRail.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
    }

    function updateNameDisplay(index) {
        const title = originalSlides[index]?.querySelector('.project-title')?.textContent?.trim() || '';
        if (projectActiveIndex) {
            projectActiveIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(originalSlides.length).padStart(2, '0')}`;
        }
        if (projectActiveName && title) {
            projectActiveName.textContent = title;
        }
        nameChips.forEach((chip, i) => chip.classList.toggle('is-active', i === index));
        centerNameChip(index);
    }

    function setActive(index, scroll) {
        activeIndex = index;
        originalSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        updateNameDisplay(index);
        if (scroll) {
            projectZone.scrollTo({ left: slideCenter(index), behavior: REDUCED ? 'auto' : 'smooth' });
        }
    }

    function goTo(index) {
        const next = (index + originalSlides.length) % originalSlides.length;
        setActive(next, true);
    }

    let scrollEndTimer;
    projectZone.addEventListener(
        'scroll',
        () => {
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(syncActiveFromScroll, 80);
        },
        { passive: true }
    );

    function tick(t) {
        if (!lastT) lastT = t;
        const dt = Math.min(0.05, (t - lastT) / 1000);
        lastT = t;

        if (!REDUCED && !paused && !isDragging && loopWidth > 0) {
            projectZone.scrollLeft += SPEED_PX_PER_S * dt;
            if (projectZone.scrollLeft >= loopWidth) {
                projectZone.scrollLeft -= loopWidth;
            }
        }
        raf = requestAnimationFrame(tick);
    }

    projectZone.addEventListener('mouseenter', () => (paused = true));
    projectZone.addEventListener('mouseleave', () => (paused = false));
    projectZone.addEventListener('focusin', () => (paused = true));
    projectZone.addEventListener('focusout', () => (paused = false));

    projectZone.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a')) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragScrollLeft = projectZone.scrollLeft;
        projectZone.classList.add('is-dragging');
        projectZone.setPointerCapture(e.pointerId);
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
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(activeIndex - 1);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(activeIndex + 1);
        }
    });

    measureLoopWidth();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', () => {
        measureLoopWidth();
        setActive(activeIndex, false);
    });
}
