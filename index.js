/**
 * Preston Jay Susanto — Portfolio
 * Vanilla JS. No frameworks. No build step.
 */

const APP_DATA = {
    roles: [
        "3X Hackathon Winner",
        "Computer Science Student",
        "Software Engineer",
        "Accessibility Innovator",
        "Hackathon Builder",
        "Early College Entrant"
    ],
    journey: [
        { year: "2009 — 2021", loc: "Indonesia \uD83C\uDDEE\uD83C\uDDE9", title: "Foundations", desc: "12 years of childhood & early education. Bilingual development and global perspective." },
        { year: "2021 — 2024", loc: "Australia \uD83C\uDDE6\uD83C\uDDFA", title: "Acceleration", desc: "Wesley College. Founded Hack Clubs, Captained 3 sports. Achievement of 10 A's in Year 9 & 10." },
        { year: "Early 2025",  loc: "China \uD83C\uDDE8\uD83C\uDDF3",     title: "Immersion",    desc: "4 months intensive Mandarin Chinese immersion at Wendao School." },
        { year: "Aug 2025 — Present", loc: "USA \uD83C\uDDFA\uD83C\uDDF8", title: "Impact", desc: "CS @ DVC. Google Developer Group Officer. Alpha Gamma Sigma Webmaster. 4.0 GPA." }
    ],
    projects: [
        { title: "Cauliform", type: "Passion Project", featured: true, site: "https://github.com/ShadowEsu/Cauliform-AI", desc: "AI-powered voice agent that turns any Google Form into a phone call. Paste a form link, get called, answer conversationally—hands-free. Gemini Live API, Twilio, Firebase, auth. Built for Gemini Live Agent Challenge; partnered with ex-JP Morgan PM and top MLH Stanford hackathon winner.", tech: ["Next.js", "TypeScript", "Firebase", "Twilio", "Gemini"] },
        { title: "Sortify App", type: "3X Hackathon Winner", site: "#", desc: "SF Hacks winner: Best Hardware, Beginner Hack, Best Use of Broxi AI. Sustainability-focused sorting platform with Gemini image recognition and Google Maps bin finder. Built for global impact on education and the environment.", tech: ["JavaScript", "Gemini", "Google Maps"] },
        { title: "Access for All", type: "Hackathon Winner", site: "#", desc: "ValleyHacks accessibility-first software for color blindness & dyslexia. Built in under 48 hours.", tech: ["HTML", "CSS", "JavaScript"] },
        { title: "Aiko Matcha", type: "E-Commerce", site: "https://www.aikomatcha.com.au", desc: "Official retail site for premium matcha. High-performance custom build driving thousands in sales.", tech: ["HTML", "CSS", "JavaScript", "Python"] },
        { title: "AGS Honor Society", type: "Official Portal", site: "https://dvcags.wixstudio.com/honor-society", desc: "Webmaster for the DVC honors chapter. Built for scalability and impact.", tech: ["Wix", "Web Design"] },
        { title: "Wosado Australia", type: "Retail Hub", site: "https://wosadoaustralia.com.au", desc: "International beauty brand platform developer and maintenance lead.", tech: ["Shopify", "HTML", "CSS"] },
        { title: "Wesley Hack Club", type: "Educational", site: "https://wesley.hackclub.com", desc: "Founder. Inspired 20+ students to join and build sustainable tech communities.", tech: ["HTML", "JavaScript"] },
        { title: "Banyan Vanilla", type: "Brand Design", site: "https://www.banyanvanilla.com.au", desc: "Premium export brand digital presence and maintenance.", tech: ["HTML", "CSS", "JavaScript"] }
    ],
    awards: {
        "2024": [
            { title: "Gold Endeavour Award", desc: "Exceptional effort across all subjects and extracurricular programs." },
            { title: "Academic Excellence", desc: "10 A grades across the full academic year. Top 1% performance." },
            { title: "Computer Science Prize", desc: "Highest academic achievement in CS curriculum." },
            { title: "Duke of Edinburgh Bronze", desc: "Service, leadership, and personal resilience program." }
        ],
        "2023": [
            { title: "Academic Excellence", desc: "10 A grades across the full year for Year 9." },
            { title: "Gold Endeavour Award", desc: "Sustained high effort distinction in all disciplines." },
            { title: "Chinese Language Prize", desc: "Top performer in language immersion studies." }
        ],
        "2022": [
            { title: "Head of College Award", desc: "Top academic standing in the college division." },
            { title: "Basketball Wesley Award", desc: "Character, skill, and team discipline on the court." },
            { title: "SRC Award", desc: "Student Representative Council service and leadership." }
        ]
    },
    leadership: [
        { year: "2025", role: "GDG Software Officer",  org: "Google Developer Group",       impact: "Leading 20+ active student developers in tech projects and community initiatives." },
        { year: "2025", role: "AGS Webmaster",          org: "Alpha Gamma Sigma Honors",     impact: "Managing digital infrastructure and accessibility standards for the honors chapter." },
        { year: "2025", role: "Project Leader",         org: "Code the Change",              impact: "Leading a team concentrating on website development and social media impact for a non-profit impacting 100+ people in the slums of Borneo." },
        { year: "2024", role: "Hack Club Founder",      org: "Wesley College",               impact: "Created a sustainable tech community for 20+ members." },
        { year: "2021-2024", role: "3x Team Captain",  org: "Volleyball, Soccer, Basketball", impact: "Led diverse teams to competitive success across three sports." }
    ],
    certs: [
        { name: "Claude Code in Action: Certificate of Completion", id: "hqb5tqkobj9s", issuer: "Anthropic", date: "Mar 2026", skills: "Claude Skills" },
        { name: "Basics of Prompt Engineering", id: "56976645", issuer: "Alison", date: "Mar 2026", skills: "Prompt Writing, Prompt Engineering" },
        { name: "Learn Vibe Coding with AI Tools", id: "YMPXSGBJ", issuer: "Great Learning Support", date: "Mar 2026", skills: "Vibe Coding, Claude Skills" },
        { name: "Understanding Agentic AI", id: "67432c58827e1409ba0ccf8a", issuer: "Digital Workforce Services Plc", date: "Mar 2026", skills: "Agentic AI Development, AI Agents" },
        { name: "Sending Professional Emails", id: "NDIxMDI2", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Building Apps and Media with Google AI Studio", id: "NDIxMDYx", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Intro to Large Language Models and Responsible AI", id: "NDIxMDA1", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Introduction to Generative AI", id: "NDIwNjE5", issuer: "Google x NexusEdge", date: "Sep 2025" }
    ],
    experience: [
        { title: "Club Council Representative", org: "The InterClub Council (ICC)", type: "Part-time", dateRange: "Feb 2026 — Present", location: "Pleasant Hill, CA · Hybrid", bullets: ["Managed club meetings and coordinated payments to ensure smooth operations at Cryptoacademy DVC.", "Strengthened connections through effective collaboration updates, enhancing member engagement.", "Attended over 10 consecutive ICC meetings, gathering insights to boost club funds and membership growth."], skills: "Project Management · Student Council" },
        { title: "Computer Engineer Officer", org: "Science and Engineering Club", type: "Officer", dateRange: "Nov 2025 — Present", location: "Pleasant Hill, CA · On-site", bullets: [], skills: "Project Management · Project Planning" },
        { title: "Webmaster", org: "Alpha Gamma Sigma — Gamma Psi Chapter", type: "Seasonal", dateRange: "Sep 2025 — Present", location: "Pleasant Hill, CA · On-site", bullets: ["Maintaining and updating the official website and communicating with officers about club promotion through digital channels."], skills: "Visual Web Development · Web Design" },
        { title: "Software Engineer Officer", org: "Google Developers Group", type: "Officer", dateRange: "Sep 2025 — Present", location: "Pleasant Hill, CA · On-site", bullets: ["Collaborated with 20+ members to foster a coding community.", "Led project initiatives, enhancing teamwork and project management skills.", "Developed web applications and coding solutions, strengthening technical proficiency.", "Motivated peers to pursue coding majors and engage in challenging projects."], skills: "Website Building · Website Updating" },
        { title: "Engagement Coordinator", org: "Toastmasters International", type: "Officer", dateRange: "Sep 2025 — Present", location: "Pleasant Hill, CA · On-site", bullets: ["Engaged actively as Activities Coordinator, enhancing member participation.", "Developed public speaking and storytelling skills through regular involvement.", "Fostered a supportive environment for members to practice debating and communication."], skills: "Speech Writing · Communication" },
        { title: "Senior Web Application Developer", org: "Wosado Australia", type: "Internship", dateRange: "Jul 2025 — Present", location: "Perth, Australia · Remote", bullets: ["Developed and managed the Wosado Australia website, enhancing functionality and design.", "Collaborated with the business owner to implement new engagement strategies.", "Contributed to sales growth and promotion of products across Australia."], skills: "Visual Web Development · Shopify", site: "https://wosadoaustralia.com" },
        { title: "Senior Web Application Developer", org: "Aiko Matcha", type: "Full-time", dateRange: "Jun 2025 — Present", location: "Perth, Australia · Remote", bullets: ["Developed and maintained the website for a matcha business, enhancing online purchasing capabilities.", "Collaborated with the business owner to ensure effective communication and project coordination.", "Contributed to thousands of dollars in sales and increased customer engagement."], skills: "Web Development · Python", site: "https://www.aikomatcha.com.au" },
        { title: "Project Leader", org: "Code the Change", type: "Full-time", dateRange: "Sep 2025 — Dec 2025", location: "Pleasant Hill, CA · On-site", bullets: ["Led a team of web developers, enhancing coding skills and project management capabilities.", "Fostered collaborations emphasizing teamwork and problem-solving.", "Impacted thousands of educators by developing nonprofit websites for improved access."], skills: "CSS · HTML" }
    ]
};

/* ============================================================
   RENDER
   ============================================================ */
function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    const featuredProject = APP_DATA.projects.find(p => p.featured);
    const gridProjects    = APP_DATA.projects.filter(p => !p.featured);

    root.innerHTML = `
        <!-- NAV -->
        <nav id="navbar" aria-label="Main navigation">
            <div class="nav-inner">
                <a href="#hero" class="nav-logo" aria-label="Preston Jay Susanto — back to top">
                    <div class="nav-logo-mark" aria-hidden="true">P</div>
                    <span class="nav-logo-text">Preston Jay Susanto</span>
                </a>
                <nav class="nav-links" aria-label="Site sections">
                    <a href="#about"          class="nav-link">Journey</a>
                    <a href="#experience"     class="nav-link">Experience</a>
                    <a href="#projects"       class="nav-link">Work</a>
                    <a href="#certifications" class="nav-link">Certs</a>
                    <a href="#awards"         class="nav-link">Awards</a>
                    <a href="#leadership"     class="nav-link">Leadership</a>
                    <a href="#contact"        class="nav-link">Contact</a>
                </nav>
            </div>
        </nav>

        <!-- HERO -->
        <section id="hero" aria-label="Introduction">
            <div class="hero-bg" aria-hidden="true">
                <div class="hero-glow"></div>
                <div class="hero-grid"></div>
            </div>
            <div class="hero-inner">
                <!-- Left: content -->
                <div class="reveal">
                    <div class="hero-badges">
                        <span class="hero-badge is-accent">&#x1F3C6; 3X Hackathon Winner</span>
                        <span class="hero-badge">SF Bay Area</span>
                        <span class="hero-badge">GPA 4.0</span>
                    </div>
                    <h1 class="hero-title">
                        Building<br>the <span class="accent-word">Future.</span>
                    </h1>
                    <div class="role-rotator" aria-live="polite" aria-atomic="true">
                        <div id="role-container" class="role-container">
                            ${APP_DATA.roles.map(r => `<div class="role-item">${r}</div>`).join('')}
                        </div>
                    </div>
                    <p class="hero-desc">
                        Computer Science student at <strong>DVC</strong>. Early entrant. Global perspective from Indonesia, Australia, and China. Mentoring the next generation of builders.
                    </p>
                    <div class="hero-ctas">
                        <a href="#projects"                       class="btn-primary">View Projects &#x2192;</a>
                        <a href="mailto:prestonjaysusanto@gmail.com" class="btn-secondary">Get in Touch</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-value">3&#xD7;</span>
                            <span class="stat-label">Hackathon Wins</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">4</span>
                            <span class="stat-label">Nations</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">4.0</span>
                            <span class="stat-label">GPA</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">20+</span>
                            <span class="stat-label">Mentored</span>
                        </div>
                    </div>
                </div>

                <!-- Right: cert card -->
                <div class="hero-card reveal" style="transition-delay: 180ms" aria-hidden="true">
                    <div class="hero-card-label">Recent Certifications</div>
                    ${APP_DATA.certs.slice(0, 3).map(c => `
                        <div class="cert-item">
                            <div class="cert-icon">AI</div>
                            <div>
                                <div class="cert-name">${c.name}</div>
                                <div class="cert-id">ID: ${c.id}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- ABOUT / JOURNEY -->
        <section id="about" class="section section-alt">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">My Story</span>
                    <h2 class="section-heading">Global Journey</h2>
                    <p class="section-subtitle">Four countries. One relentless drive to build, lead, and connect.</p>
                </div>
                <div class="journey-grid">
                    ${APP_DATA.journey.map((item, i) => `
                        <div class="journey-card reveal" style="transition-delay: ${i * 80}ms">
                            <div class="journey-year">${item.year}</div>
                            <div class="journey-loc">${item.loc}</div>
                            <div class="journey-title">${item.title}</div>
                            <p class="journey-desc">${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- EXPERIENCE -->
        <section id="experience" class="section">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Work & Roles</span>
                    <h2 class="section-heading">Experience</h2>
                    <p class="section-subtitle">Engineering roles, leadership positions, and real-world product delivery.</p>
                </div>
                <div class="experience-list">
                    ${APP_DATA.experience.map((job, i) => `
                        <article class="exp-card reveal" style="transition-delay: ${i * 45}ms">
                            <div class="exp-header">
                                <div>
                                    <h3 class="exp-title">${job.title}</h3>
                                    <div class="exp-org">${job.org}</div>
                                </div>
                                <div class="exp-meta">
                                    <span class="exp-type-badge">${job.type}</span>
                                    <span class="exp-date">${job.dateRange}</span>
                                    <span class="exp-location">${job.location}</span>
                                </div>
                            </div>
                            ${job.bullets.length ? `
                                <ul class="exp-bullets">
                                    ${job.bullets.map(b => `<li>${b}</li>`).join('')}
                                </ul>
                            ` : ''}
                            ${job.skills ? `<div class="exp-skills">${job.skills}</div>` : ''}
                            ${job.site ? `<a href="${job.site}" target="_blank" rel="noopener" class="exp-site-link">Visit site &#x2197;</a>` : ''}
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- PROJECTS -->
        <section id="projects" class="projects-section">
            <div class="projects-inner">
                <header class="projects-header">
                    <div>
                        <span class="section-label">Selected Work</span>
                        <h2 class="projects-title reveal">Projects</h2>
                    </div>
                    <p class="projects-subtitle reveal">Platforms built for retail, education, AI, and social impact.</p>
                </header>

                <!-- Featured: Cauliform -->
                ${featuredProject ? `
                    <article class="project-featured reveal">
                        <div class="project-featured-inner">
                            <div class="project-featured-content">
                                <span class="project-featured-badge">&#x2605; Featured Project &mdash; ${featuredProject.type}</span>
                                <h3 class="project-featured-title">${featuredProject.title}</h3>
                                <p class="project-featured-desc">${featuredProject.desc}</p>
                                ${featuredProject.tech && featuredProject.tech.length ? `
                                    <ul class="project-tech-list project-featured-tech" aria-label="Tech stack">
                                        ${featuredProject.tech.map(t => `<li><span class="project-tech-item">${t}</span></li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                            <div class="project-featured-actions">
                                <a href="${featuredProject.site}" target="_blank" rel="noopener" class="btn-primary">
                                    View Project &#x2197;
                                </a>
                            </div>
                        </div>
                    </article>
                ` : ''}

                <!-- Grid -->
                <div class="project-grid">
                    ${gridProjects.map((p, i) => `
                        <article class="project-card reveal" style="transition-delay: ${i * 50}ms">
                            <div class="project-card-inner">
                                <div class="project-meta">
                                    <span class="project-type">${p.type}</span>
                                    <a href="${p.site}" target="_blank" rel="noopener"
                                       class="project-link-arrow"
                                       aria-label="Open ${p.title}">&#x2197;</a>
                                </div>
                                <h3 class="project-name">${p.title}</h3>
                                <p class="project-desc">${p.desc}</p>
                                ${p.tech && p.tech.length ? `
                                    <ul class="project-tech-list" aria-label="Tech stack">
                                        ${p.tech.map(t => `<li><span class="project-tech-item">${t}</span></li>`).join('')}
                                    </ul>
                                ` : ''}
                                <div class="project-actions">
                                    <a href="${p.site}" target="_blank" rel="noopener" class="project-link-btn">
                                        ${p.site && p.site !== '#' ? 'View project &#x2192;' : 'Details &#x2192;'}
                                    </a>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- CERTIFICATIONS -->
        <section id="certifications" class="section section-alt">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Verified Credentials</span>
                    <h2 class="section-heading">Licenses &amp; Certifications</h2>
                </div>
                <div class="certs-grid">
                    ${APP_DATA.certs.map((c, i) => `
                        <div class="cert-card reveal" style="transition-delay: ${i * 40}ms">
                            <div class="cert-card-name">${c.name}</div>
                            <div class="cert-card-issuer">${c.issuer} &middot; ${c.date}</div>
                            ${c.skills ? `<div class="cert-card-skills">${c.skills}</div>` : ''}
                            <div class="cert-card-id">ID: ${c.id}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- AWARDS -->
        <section id="awards" class="section">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Recognition</span>
                    <h2 class="section-heading">Awards &amp; Proof</h2>
                    <p class="section-subtitle">Consistent academic excellence and co-curricular distinction across multiple institutions.</p>
                </div>
                <div class="awards-grid">
                    ${Object.entries(APP_DATA.awards).sort((a, b) => b[0] - a[0]).map(([year, list]) => `
                        <div class="reveal">
                            <div class="awards-year">${year}</div>
                            <div>
                                ${list.map(a => `
                                    <div class="award-item">
                                        <div class="award-title">${a.title}</div>
                                        <div class="award-desc">${a.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- LEADERSHIP -->
        <section id="leadership" class="section section-alt">
            <div class="container">
                <div class="section-header reveal">
                    <span class="section-label">Community</span>
                    <h2 class="section-heading">Leadership.</h2>
                </div>
                <div class="leadership-grid">
                    <div class="leadership-list">
                        ${APP_DATA.leadership.map((l, i) => `
                            <div class="leadership-item reveal" style="transition-delay: ${i * 80}ms">
                                <div class="leadership-org">${l.org}</div>
                                <div class="leadership-role">${l.role}</div>
                                <p class="leadership-impact">${l.impact}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="leadership-card reveal" style="transition-delay: 200ms">
                        <h3 class="leadership-card-title">Mentorship Focus</h3>
                        <p class="leadership-quote">
                            "Committed to creating communities that last. In every club founded or led, I prioritize onboarding at least 20 students to ensure technical growth is accessible to all."
                        </p>
                        <div class="leadership-metrics">
                            <div>
                                <div class="leadership-metric-value">10+ A's</div>
                                <div class="leadership-metric-label">Yearly Excellence</div>
                            </div>
                            <div>
                                <div class="leadership-metric-value">3&#xD7;</div>
                                <div class="leadership-metric-label">Varsity Captaincy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT / FOOTER -->
        <footer id="contact" role="contentinfo">
            <div class="footer-inner">
                <h2 class="footer-heading reveal">
                    Let's <span class="accent-word">connect.</span>
                </h2>
                <div class="contact-cards reveal">
                    <a href="mailto:prestonjaysusanto@gmail.com" class="contact-card">
                        <span class="contact-card-label">Email</span>
                        <span class="contact-card-value">prestonjaysusanto@gmail.com</span>
                    </a>
                    <a href="tel:+19254570055" class="contact-card">
                        <span class="contact-card-label">Phone</span>
                        <span class="contact-card-value">+1 (925) 457-0055</span>
                    </a>
                </div>
                <nav class="social-links reveal" aria-label="Social media">
                    <a href="https://github.com/ShadowEsu"                                   target="_blank" rel="noopener" class="social-link">GitHub</a>
                    <a href="https://www.linkedin.com/in/preston-jay-susanto-3a589534b/"     target="_blank" rel="noopener" class="social-link">LinkedIn</a>
                    <a href="https://instagram.com/preston_susanto"                          target="_blank" rel="noopener" class="social-link">Instagram</a>
                </nav>
                <div class="footer-copy reveal">
                    Preston Jay Susanto &copy; 2025 &mdash; Professional Portfolio
                </div>
            </div>
        </footer>
    `;

    initInteractions();
}

/* ============================================================
   INTERACTIONS
   ============================================================ */
function initInteractions() {
    // 1. Role Rotator
    let roleIdx = 0;
    const roleCont = document.getElementById('role-container');
    if (roleCont) {
        setInterval(() => {
            roleIdx = (roleIdx + 1) % APP_DATA.roles.length;
            roleCont.style.transform = `translateY(-${roleIdx * 2.5}rem)`;
        }, 3000);
    }

    // 2. Navbar scroll style + Scroll Progress
    const navbar   = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollY   = window.scrollY;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll progress bar
        if (progress && scrollMax > 0) {
            progress.style.width = ((scrollY / scrollMax) * 100) + '%';
        }

        // Navbar glass on scroll
        if (navbar) {
            if (scrollY > 48) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });

    // 3. Reveal Animations (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Active Nav Link (section tracking)
    const sections  = document.querySelectorAll('section[id], footer[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObserver.observe(s));

    // 5. Smooth Scroll for nav links
    document.querySelectorAll('.nav-link, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || !href.startsWith('#') || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
            }
        });
    });
}

/* ============================================================
   INIT
   ============================================================ */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}
