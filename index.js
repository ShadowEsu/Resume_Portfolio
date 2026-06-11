/**
 * Preston Susanto — Portfolio
 */

const ICONS = {
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12" y2="18.01" stroke-width="2.5" stroke-linecap="round"/></svg>',
    research: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M9 3h6v7l5 9H4l5-9V3z"/><line x1="9" y1="3" x2="15" y2="3"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M5 5H3v1a3 3 0 003 3M19 5h2v1a3 3 0 01-3 3"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/><path d="M5 19l1 2 2 1-1 2-2 1 1-2-2-1 2-1 1-2z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 4a4 4 0 00-4 4v1a3 3 0 00-3 3 3 3 0 003 3h8a3 3 0 003-3 3 3 0 00-3-3V8a4 4 0 00-4-4z"/><path d="M9 14v2a3 3 0 006 0v-2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-8 0 15 15 0 014-10z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M22 10l-10 5L2 10l10-6 10 6z"/><path d="M6 12v5c0 0 3 3 6 3s6-3 6-3v-5"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
    chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v1a7 7 0 01-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
};

const APP_DATA = {
    roles: [
        "Independent RL Researcher",
        "EECS Student · 4.0 GPA",
        "Regrade Founder",
        "Lead AI System Architect",
        "Applied Alignment Researcher",
        "Hackathon Builder"
    ],

    highlights: [
        { icon: "app", label: "Regrade", value: "Live iOS app", sub: "Claude Opus 4.7 + Gemini 2.5 dual-model backend", prestige: true },
        { icon: "research", label: "RL Research", value: "Under review", sub: "USA Junior Student Research · arXiv Sep 2026", prestige: true },
        { icon: "trophy", label: "SF Hacks 2026", value: "3× Winner", sub: "Best Hardware · Beginner · Boxi AI — 250+ hackers", prestige: true },
        { icon: "spark", label: "Gemini Hackathon", value: "Top 1%", sub: "12,000+ participants · Cauliform voice agent", prestige: true }
    ],

    education: [
        {
            school: "Diablo Valley College",
            location: "Pleasant Hill, CA",
            period: "Aug 2025 — Present",
            degree: "A.S. Electrical Engineering & Computer Science",
            gpa: "4.0",
            note: "Transfer target: UC Berkeley EECS (Fall 2027)",
            coursework: "Data Structures, Algorithms, Discrete Math, Calculus I–II, Physics for Engineers",
            selfStudy: "UC Berkeley CS285 (Deep RL), Stanford CS234 (RL), 3Blue1Brown Linear Algebra",
            scholarships: "Phillip Howe Scholarship ($2,000), Manuel Gonzales Merit Scholarship ($350)"
        },
        {
            school: "Wesley College",
            location: "Perth, Australia",
            period: "Mar 2021 — Dec 2025",
            degree: "Secondary Education",
            note: "Ranked #1 private school in Australia",
            activities: "Co-President, Wesley Coding Club (founded first CS club; 30+ members opening week); Captain of 3rd-Division Volleyball, Soccer & Basketball",
            honors: "Computer Science Prize (top 1% of 110), Academic Excellence (×2), Gold Endeavour (×3), Duke of Edinburgh Bronze"
        }
    ],

    research: {
        title: "Reward Shaping for Accessible AI Tutoring in Community Colleges",
        role: "Independent Researcher",
        org: "Diablo Valley College",
        advisor: "Prof. Kyu Woong Lee",
        period: "Jan 2026 — Present",
        status: "Under review — USA Junior Student Research",
        targets: "arXiv (Sep 2026) · Journal of Student Research (Oct 2026)",
        bullets: [
            "Investigating Q-learning with adaptive reward shaping to improve convergence speed in sparse-reward environments on consumer hardware (MacBook, no GPU, no cloud budget). Designed reward-shaping heuristics motivated by potential-based shaping theorems.",
            "Built an RL training and evaluation pipeline from scratch in Python; benchmarking convergence against baseline Q-learning across gridworld and tutoring-simulation tasks. Designed ablations to isolate the contribution of shaping signals.",
            "Reproduced and extended core results from UC Berkeley CS285 and Stanford CS234 independently from problem-set baselines; targeting first-author arXiv submission Sep 2026."
        ]
    },

    skills: [
        { icon: "code", category: "Languages", items: ["Python", "C/C++", "JavaScript", "TypeScript"] },
        { icon: "brain", category: "AI / ML", items: ["Reinforcement Learning", "Q-Learning", "Deep RL", "Reward Shaping", "NLP", "Computer Vision", "Generative AI", "Prompt Engineering"] },
        { icon: "chip", category: "Frameworks & APIs", items: ["TensorFlow", "OpenCV", "Claude API", "Gemini API", "OpenAI API", "Twilio", "Firebase", "Supabase", "Vercel"] },
        { icon: "link", category: "Tools", items: ["Git/GitHub", "React Native", "Node.js", "Cursor", "n8n"] }
    ],

    projectDirs: [
        {
            dir: "Shipped Products",
            icon: "app",
            projects: [
                {
                    title: "Regrade",
                    type: "Live · App Store",
                    featured: true,
                    site: "https://regradeapp.tech",
                    desc: "Solo-built production iOS & web app that ingests rubrics and graded work, runs multi-step LLM analysis, and surfaces recoverable marks with rubric-grounded evidence in under 60 seconds.",
                    bullets: [
                        "Dual-model orchestration: Claude Opus 4.7 for high-stakes reasoning, Gemini 2.5 for throughput.",
                        "Prompt evaluation harness benchmarked against ground-truth rubrics."
                    ],
                    tech: ["React Native", "TypeScript", "Claude API", "Gemini API", "Supabase"]
                },
                {
                    title: "Aiko Matcha",
                    type: "E-Commerce · Live",
                    site: "https://www.aikomatcha.com.au",
                    desc: "Official retail site for premium matcha. Custom build driving thousands in sales across Australia.",
                    tech: ["HTML", "CSS", "JavaScript", "Python"]
                },
                {
                    title: "Wosado Australia",
                    type: "Beauty Brand · Live",
                    site: "https://wosadoaustralia.com.au",
                    desc: "Full e-commerce platform for an international beauty brand — architected, shipped, and maintained end-to-end.",
                    tech: ["Shopify", "Wix", "Automation"]
                },
                {
                    title: "Banyan Vanilla",
                    type: "Export Brand",
                    site: "https://www.banyanvanilla.com.au",
                    desc: "Premium export brand digital presence — design, build, and ongoing maintenance.",
                    tech: ["HTML", "CSS", "JavaScript"]
                }
            ]
        },
        {
            dir: "AI & Agents",
            icon: "brain",
            projects: [
                {
                    title: "Cauliform",
                    type: "Top 1% · 12,000+ hackers",
                    site: "https://github.com/ShadowEsu/Cauliform-AI",
                    desc: "Autonomous voice agent that calls users, conducts natural conversations, and fills Google Forms with a reinforced memory layer. Co-built with a Stanford MLH multi-winner.",
                    tech: ["Gemini API", "Twilio", "Google Cloud", "Next.js"]
                },
                {
                    title: "Jarvis",
                    type: "Local-first RL",
                    site: "https://github.com/ShadowEsu",
                    desc: "Modular RL personal AI agent using Q-learning for on-device adaptive decision-making — research thesis testbed, no GPU or cloud.",
                    tech: ["Python", "Q-Learning", "NLP"]
                },
                {
                    title: "Pitchnest AI",
                    type: "Gemini Live Agent",
                    site: "https://pitchnest-528505551794.us-central1.run.app/",
                    desc: "AI interviewer that observes experience stories via Gemini Live Agents — unlimited behavioral questions, clarity scoring, and professionalism feedback.",
                    tech: ["Gemini", "Google Cloud", "TypeScript", "Python"]
                }
            ]
        },
        {
            dir: "Hackathon Wins",
            icon: "trophy",
            projects: [
                {
                    title: "Sortify",
                    type: "SF Hacks 2026 · 3 Awards",
                    site: "https://github.com/ShadowEsu/Sortify_App",
                    desc: "CV classifier on embedded hardware for live waste sorting in 48 hours. Best Hardware, Beginner, and Boxi AI (250+ participants).",
                    tech: ["Python", "TensorFlow", "OpenCV", "Embedded"]
                },
                {
                    title: "Access for All",
                    type: "ValleyHacks Winner",
                    site: "https://github.com/ShadowEsu",
                    desc: "Accessibility-first software for color blindness & dyslexia — built in under 48 hours.",
                    tech: ["HTML", "CSS", "JavaScript"]
                },
                {
                    title: "Headspace",
                    type: "FigBuild 2026",
                    site: "https://pitchnest-528505551794.us-central1.run.app/",
                    desc: "Pitch-deck collaboration platform streamlining startup storytelling and investor presentation workflows.",
                    tech: ["Next.js", "TypeScript", "Figma API"]
                }
            ]
        },
        {
            dir: "Community & Education",
            icon: "users",
            projects: [
                {
                    title: "Wesley Hack Club",
                    type: "Founder",
                    site: "https://wesley.hackclub.com",
                    desc: "Founded the school's first CS club at Australia's #1 private school — 30+ members in opening week.",
                    tech: ["HTML", "JavaScript"]
                },
                {
                    title: "AGS Honor Society",
                    type: "Official Portal",
                    site: "https://dvcags.wixstudio.com/honor-society",
                    desc: "Webmaster for the DVC honors chapter — scalable portal for officers and members.",
                    tech: ["Wix", "Web Design"]
                },
                {
                    title: "PERMIAS National",
                    type: "National Org",
                    site: "https://permias.org",
                    desc: "Publish and maintain the PERMIAS National website — central hub for Indonesian students across the U.S.",
                    tech: ["Web Publishing", "Content Strategy"]
                }
            ]
        }
    ],

    experience: [
        {
            icon: "brain",
            title: "Lead AI System Architect",
            org: "AI Business Consulting Group (AIBCG), Parinama Group",
            pinned: true,
            type: "Contract",
            dateRange: "May 2026 — Present",
            location: "Remote",
            bullets: [
                "Architecting agentic AI systems and retrieval-augmented (RAG) pipelines for business consulting clients.",
                "Owning end-to-end design from data ingestion through model integration and deployment."
            ],
            skills: "Agentic AI · RAG · System Architecture"
        },
        {
            icon: "globe",
            title: "Senior Web Application Developer",
            org: "PERMIAS National",
            pinned: true,
            type: "National Org",
            dateRange: "Jan 2026 — Present",
            location: "United States · Remote",
            bullets: [
                "Publish and maintain the PERMIAS National website as a central hub for Indonesian students across the U.S.",
                "Continuously improve usability, accessibility, and performance for national-level audiences."
            ],
            skills: "Web Publishing · Content Strategy"
        },
        {
            icon: "cart",
            title: "Lead Software Developer & Architect",
            org: "Wosado Australia",
            pinned: false,
            type: "Contract",
            dateRange: "Jul — Dec 2025",
            location: "Perth, Australia · Remote",
            bullets: [
                "Architected and shipped a full e-commerce platform on Shopify and Wix for a live consumer beauty brand.",
                "Cut backend operations time ~30% through workflow automation."
            ],
            skills: "Shopify · Wix · Workflow Automation",
            site: "https://wosadoaustralia.com.au"
        },
        {
            icon: "cart",
            title: "Senior Web Application Developer",
            org: "Aiko Matcha",
            pinned: false,
            type: "Contract",
            dateRange: "Jun 2025 — Present",
            location: "Perth, Australia · Remote",
            bullets: [
                "Developed and maintained the matcha e-commerce site — thousands in sales and increased customer engagement.",
                "Collaborated with the business owner on product strategy and online purchasing flows."
            ],
            skills: "Web Development · Python",
            site: "https://www.aikomatcha.com.au"
        },
        {
            icon: "users",
            title: "Software Engineer Officer",
            org: "Google Developers Group · DVC",
            pinned: false,
            type: "Officer",
            dateRange: "Sep 2025 — Present",
            location: "Pleasant Hill, CA",
            bullets: [
                "Leading 20+ student developers in tech projects and community initiatives.",
                "Motivated peers to pursue coding majors and engage in challenging builds."
            ],
            skills: "Community Building · Web Apps"
        },
        {
            icon: "code",
            title: "Project Leader",
            org: "Code the Change",
            pinned: false,
            type: "Leadership",
            dateRange: "Sep — Dec 2025",
            location: "Pleasant Hill, CA",
            bullets: [
                "Led a team building nonprofit websites impacting thousands of educators in Borneo.",
                "Fostered collaborations emphasizing teamwork and problem-solving."
            ],
            skills: "HTML · CSS · Project Management"
        }
    ],

    awards: {
        "2026": [
            { title: "Best Hardware / Beginner / Boxi AI", winner: true, desc: "SF Hacks 2026 — three category wins among 250+ participants for Sortify." },
            { title: "Best Gaming Hack", winner: true, desc: "Mega Hackathon 2026, solo — top 1% of 950+ participants." },
            { title: "Gemini AI Live Agent Hackathon", winner: true, desc: "Top 1% of 12,000+ participants for Cauliform." }
        ],
        "2025": [
            { title: "Phillip Howe Scholarship", winner: false, desc: "$2,000 merit scholarship at DVC." },
            { title: "Manuel Gonzales Merit Scholarship", winner: false, desc: "$350 academic merit award." },
            { title: "Perfect 4.0 GPA", winner: false, gpaHighlight: true, desc: "Perfect GPA while leading clubs, shipping products, and conducting RL research." }
        ],
        "2024": [
            { title: "Computer Science Prize", winner: true, desc: "Top 1% of 110 students at Wesley College." },
            { title: "Gold Endeavour Award", winner: true, desc: "Exceptional effort across all subjects and extracurriculars." },
            { title: "Academic Excellence", winner: false, desc: "Distinguished performance across the full academic year." },
            { title: "Duke of Edinburgh Bronze", winner: false, desc: "Service, leadership, and personal resilience." }
        ]
    },

    leadership: [
        { icon: "users", year: "2021–2025", role: "Co-President, Wesley Coding Club", org: "Wesley College", impact: "Founded the school's first CS club; 30+ members in opening week.", primary: true },
        { icon: "trophy", year: "2021–2025", role: "3× Team Captain", org: "Volleyball, Soccer, Basketball", impact: "Led 3rd-division teams at Australia's #1 private school.", primary: true },
        { icon: "code", year: "2025", role: "GDG Software Officer", org: "Google Developer Group · DVC", impact: "Leading 20+ student developers in tech projects." },
        { icon: "grad", year: "2025", role: "AGS Webmaster", org: "Alpha Gamma Sigma Honors", impact: "Digital infrastructure and accessibility for the honors chapter." }
    ]
};

function icon(name, cls = "icon") {
    return `<span class="${cls}" aria-hidden="true">${ICONS[name] || ICONS.spark}</span>`;
}

function renderProjectCard(p, i, delayBase = 50) {
    return `
        <article class="project-card reveal" style="transition-delay: ${i * delayBase}ms">
            <div class="project-card-inner">
                <div class="project-meta">
                    <span class="project-type">${p.type}</span>
                    <a href="${p.site}" target="_blank" rel="noopener" class="project-link-arrow" aria-label="Open ${p.title}">${icon("link", "icon-sm")}</a>
                </div>
                <h3 class="project-name">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>
                ${p.bullets ? `<ul class="project-bullets">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
                <ul class="project-tech-list" aria-label="Tech stack">
                    ${p.tech.map(t => `<li><span class="project-tech-item">${t}</span></li>`).join('')}
                </ul>
                <div class="project-actions">
                    <a href="${p.site}" target="_blank" rel="noopener" class="project-link-btn">View project →</a>
                </div>
            </div>
        </article>
    `;
}

function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    const featured = APP_DATA.projectDirs.flatMap(d => d.projects).find(p => p.featured);

    root.innerHTML = `
        <div class="announce-bar reveal">
            ${icon("research", "icon-xs")}
            <span>Research under review — <strong>USA Junior Student Research</strong> · Regrade founder · Applying to YC W26</span>
        </div>

        <nav id="navbar" aria-label="Main navigation">
            <div class="nav-inner">
                <a href="#hero" class="nav-logo" aria-label="Preston Susanto — back to top">
                    <span class="nav-logo-mark" aria-hidden="true">PS</span>
                    <span class="nav-logo-text">Preston Susanto</span>
                </a>
                <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle navigation">
                    <span></span><span></span>
                </button>
                <nav class="nav-links" id="nav-menu" aria-label="Site sections">
                    <a href="#about" class="nav-link">About</a>
                    <a href="#research" class="nav-link">Research</a>
                    <a href="#experience" class="nav-link">Experience</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#education" class="nav-link">Education</a>
                    <a href="#awards" class="nav-link">Awards</a>
                    <a href="#contact" class="nav-link nav-link-cta">Contact</a>
                </nav>
            </div>
        </nav>

        <section id="hero" aria-label="Introduction">
            <div class="hero-inner hero-centered">
                <div class="hero-content reveal">
                    <div class="hero-eyebrow">
                        <span class="hero-badge is-accent">${icon("grad", "icon-xs")} EECS · 4.0 GPA</span>
                        <span class="hero-badge">${icon("globe", "icon-xs")} Pleasant Hill, CA</span>
                    </div>
                    <h1 class="hero-title">
                        The research is rigorous.<br>
                        <em class="accent-word">The products ship.</em>
                    </h1>
                    <div class="role-rotator" aria-live="polite" aria-atomic="true">
                        <div id="role-container" class="role-container">
                            ${APP_DATA.roles.map(r => `<div class="role-item">${r}</div>`).join('')}
                        </div>
                    </div>
                    <p class="hero-desc">
                        First-year EECS student reproducing <strong>UC Berkeley CS285</strong> and <strong>Stanford CS234</strong>
                        from scratch on a MacBook — no GPU, no cloud budget.
                        Solo-shipped <a href="https://regradeapp.tech" target="_blank" rel="noopener" class="inline-link">Regrade</a>,
                        a live iOS app with dual-model AI. Research currently under review by
                        <strong>USA Junior Student Research</strong>.
                    </p>
                    <div class="hero-ctas">
                        <a href="#projects" class="btn-primary btn-pill">View work →</a>
                        <a href="#research" class="btn-secondary btn-pill">Read research</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-value">4.0</span>
                            <span class="stat-label">GPA</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">3×</span>
                            <span class="stat-label">Hackathon wins</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value stat-value-accent">Live</span>
                            <span class="stat-label">App Store product</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">Top 1%</span>
                            <span class="stat-label">12,000+ hackers</span>
                        </div>
                    </div>
                </div>

                <div class="focus-section reveal" style="transition-delay: 100ms" aria-label="Current focus">
                    <h2 class="focus-heading">Current focus</h2>
                    <div class="focus-grid">
                        ${APP_DATA.highlights.map(h => `
                            <div class="focus-card ${h.prestige ? 'focus-card-prestige' : ''}">
                                <div class="focus-icon-wrap">${icon(h.icon, "icon-lg")}</div>
                                <div class="focus-label">${h.label}</div>
                                <div class="focus-value">${h.value}</div>
                                <div class="focus-sub">${h.sub}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="about" class="section">
            <div class="container container-center">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("spark", "icon-xs")} About</span>
                    <h2 class="section-heading">Research meets shipped products.</h2>
                    <p class="section-subtitle section-subtitle-center">
                        I build under real constraints — consumer hardware, no GPU budget — and ship production AI
                        systems students actually use.
                    </p>
                </div>
                <div class="about-grid reveal">
                    <div class="about-card">
                        <div class="about-card-icon">${icon("research", "icon-md")}</div>
                        <span class="about-num">01</span>
                        <h3 class="about-card-title">Empirical RL research</h3>
                        <p class="about-card-desc">Reproducing CS285 & CS234 independently. Paper under review by <strong>USA Junior Student Research</strong>; arXiv target Sep 2026.</p>
                    </div>
                    <div class="about-card">
                        <div class="about-card-icon">${icon("app", "icon-md")}</div>
                        <span class="about-num">02</span>
                        <h3 class="about-card-title">Production AI systems</h3>
                        <p class="about-card-desc">Dual-model orchestration for <strong>Regrade</strong> and agentic RAG pipelines for enterprise consulting clients.</p>
                    </div>
                    <div class="about-card">
                        <div class="about-card-icon">${icon("brain", "icon-md")}</div>
                        <span class="about-num">03</span>
                        <h3 class="about-card-title">Applied alignment</h3>
                        <p class="about-card-desc">Reward-shaping heuristics and evaluation harnesses that ground model outputs in <strong>verifiable evidence</strong>.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="research" class="section section-alt">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("research", "icon-xs")} Research</span>
                    <h2 class="section-heading section-heading-wide">${APP_DATA.research.title}</h2>
                    <p class="section-subtitle section-subtitle-center">${APP_DATA.research.role} · ${APP_DATA.research.org} · Advisor: ${APP_DATA.research.advisor}</p>
                </div>
                <article class="research-card reveal">
                    <div class="research-status-banner">
                        ${icon("research", "icon-sm")}
                        <span><strong>${APP_DATA.research.status}</strong></span>
                    </div>
                    <div class="research-meta">
                        <span class="exp-type-badge">${APP_DATA.research.period}</span>
                        <span class="research-target">${APP_DATA.research.targets}</span>
                    </div>
                    <ul class="exp-bullets">
                        ${APP_DATA.research.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </article>
            </div>
        </section>

        <section id="experience" class="section">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("briefcase", "icon-xs")} Experience</span>
                    <h2 class="section-heading">Roles with real ownership.</h2>
                </div>
                <div class="experience-list">
                    ${APP_DATA.experience.map((job, i) => `
                        <article class="exp-card ${job.pinned ? 'exp-card-pinned' : ''} reveal" style="transition-delay: ${i * 50}ms">
                            <div class="exp-card-top">
                                <div class="exp-icon-wrap">${icon(job.icon, "icon-md")}</div>
                                <div class="exp-card-main">
                                    ${job.pinned ? `<div class="exp-pin-badge">● Current</div>` : ''}
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
                                    <ul class="exp-bullets">
                                        ${job.bullets.map(b => `<li>${b}</li>`).join('')}
                                    </ul>
                                    ${job.skills ? `<div class="exp-skills">${job.skills}</div>` : ''}
                                    ${job.site ? `<a href="${job.site}" target="_blank" rel="noopener" class="exp-site-link">${icon("link", "icon-xs")} Visit site</a>` : ''}
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="projects" class="projects-section">
            <div class="projects-inner">
                <header class="projects-header section-header-center reveal">
                    <span class="section-label">${icon("code", "icon-xs")} Projects</span>
                    <h2 class="projects-title">Work &amp; shipped products</h2>
                    <p class="projects-subtitle projects-subtitle-center">13 projects across live products, AI agents, hackathon wins, and community platforms.</p>
                </header>

                ${featured ? `
                    <article class="project-featured reveal">
                        <div class="project-featured-badge-row">
                            ${icon("app", "icon-sm")}
                            <span class="project-featured-badge">${featured.type}</span>
                        </div>
                        <div class="project-featured-inner">
                            <div class="project-featured-content">
                                <h3 class="project-featured-title">${featured.title}</h3>
                                <p class="project-featured-desc">${featured.desc}</p>
                                <ul class="project-bullets">
                                    ${featured.bullets.map(b => `<li>${b}</li>`).join('')}
                                </ul>
                                <ul class="project-tech-list project-featured-tech">
                                    ${featured.tech.map(t => `<li><span class="project-tech-item">${t}</span></li>`).join('')}
                                </ul>
                            </div>
                            <div class="project-featured-actions">
                                <a href="${featured.site}" target="_blank" rel="noopener" class="btn-primary btn-pill btn-dark">
                                    Visit regradeapp.tech ↗
                                </a>
                            </div>
                        </div>
                    </article>
                ` : ''}

                ${APP_DATA.projectDirs.map((dir, di) => `
                    <div class="project-directory reveal" style="transition-delay: ${di * 80}ms">
                        <div class="directory-header">
                            <div class="directory-icon">${icon(dir.icon, "icon-md")}</div>
                            <h3 class="directory-title">${dir.dir}</h3>
                            <span class="directory-count">${dir.projects.length} projects</span>
                        </div>
                        <div class="project-grid">
                            ${dir.projects.filter(p => !p.featured).map((p, i) => renderProjectCard(p, i)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="skills" class="section section-alt">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("chip", "icon-xs")} Technical skills</span>
                    <h2 class="section-heading">Stack &amp; tooling</h2>
                </div>
                <div class="skills-grid">
                    ${APP_DATA.skills.map((group, i) => `
                        <div class="skill-group reveal" style="transition-delay: ${i * 50}ms">
                            <div class="skill-group-header">
                                ${icon(group.icon, "icon-sm")}
                                <h3 class="skill-category">${group.category}</h3>
                            </div>
                            <div class="skill-tags">
                                ${group.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="education" class="section">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("grad", "icon-xs")} Education</span>
                    <h2 class="section-heading">Academic foundation</h2>
                </div>
                <div class="edu-list">
                    ${APP_DATA.education.map((edu, i) => `
                        <article class="edu-card reveal" style="transition-delay: ${i * 70}ms">
                            <div class="edu-card-icon">${icon("grad", "icon-md")}</div>
                            <div class="edu-card-body">
                                <div class="edu-header">
                                    <div>
                                        <h3 class="edu-school">${edu.school}</h3>
                                        <div class="edu-location">${edu.location}</div>
                                    </div>
                                    <div class="edu-meta">
                                        <span class="exp-date">${edu.period}</span>
                                        ${edu.gpa ? `<span class="edu-gpa">GPA ${edu.gpa}</span>` : ''}
                                    </div>
                                </div>
                                <div class="edu-degree">${edu.degree}</div>
                                ${edu.note ? `<p class="edu-note">${edu.note}</p>` : ''}
                                ${edu.coursework ? `<p class="edu-detail"><strong>Coursework:</strong> ${edu.coursework}</p>` : ''}
                                ${edu.selfStudy ? `<p class="edu-detail"><strong>Self-study:</strong> ${edu.selfStudy}</p>` : ''}
                                ${edu.scholarships ? `<p class="edu-detail"><strong>Scholarships:</strong> ${edu.scholarships}</p>` : ''}
                                ${edu.activities ? `<p class="edu-detail"><strong>Activities:</strong> ${edu.activities}</p>` : ''}
                                ${edu.honors ? `<p class="edu-detail"><strong>Honors:</strong> ${edu.honors}</p>` : ''}
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="leadership" class="section section-alt">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("users", "icon-xs")} Leadership</span>
                    <h2 class="section-heading">Community impact</h2>
                </div>
                <div class="leadership-cards-grid">
                    ${APP_DATA.leadership.map((l, i) => `
                        <div class="leadership-item-card ${l.primary ? 'leadership-item-card-primary' : ''} reveal" style="transition-delay: ${i * 60}ms">
                            <div class="leadership-card-icon">${icon(l.icon, "icon-sm")}</div>
                            <span class="leadership-year-badge">${l.year}</span>
                            <div class="leadership-org">${l.org}</div>
                            <div class="leadership-role">${l.role}</div>
                            <p class="leadership-impact">${l.impact}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="awards" class="section">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("trophy", "icon-xs")} Recognition</span>
                    <h2 class="section-heading">Awards &amp; honors</h2>
                </div>
                <div class="awards-grid">
                    ${Object.entries(APP_DATA.awards).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([year, list]) => `
                        <div class="reveal">
                            <div class="awards-year">${year}</div>
                            <div>
                                ${list.map(a => `
                                    <div class="award-item ${a.winner ? 'award-item-winner' : ''}">
                                        <div class="award-title-row">
                                            ${a.winner ? icon("trophy", "icon-xs award-icon") : ''}
                                            <div class="award-title ${a.gpaHighlight ? 'award-title-gpa' : ''}">${a.title}</div>
                                        </div>
                                        <div class="award-desc">${a.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <footer id="contact" role="contentinfo">
            <div class="footer-inner">
                <p class="footer-brand reveal">Preston Susanto</p>
                <h2 class="footer-heading reveal">
                    Let's <em class="accent-word">connect.</em>
                </h2>
                <p class="footer-sub reveal">Open to research collaborations, internships, and conversations about empirical AI.</p>
                <div class="contact-cards reveal">
                    <a href="mailto:prestonjaysusanto@gmail.com" class="contact-card">
                        <span class="contact-card-icon">${icon("mail", "icon-md")}</span>
                        <span class="contact-card-label">Email</span>
                        <span class="contact-card-value">prestonjaysusanto@gmail.com</span>
                    </a>
                    <a href="tel:+19254570055" class="contact-card">
                        <span class="contact-card-icon">${icon("mic", "icon-md")}</span>
                        <span class="contact-card-label">Phone</span>
                        <span class="contact-card-value">(925) 457-0055</span>
                    </a>
                    <div class="contact-card contact-card-static">
                        <span class="contact-card-icon">${icon("globe", "icon-md")}</span>
                        <span class="contact-card-label">Location</span>
                        <span class="contact-card-value">Pleasant Hill, CA</span>
                    </div>
                </div>
                <nav class="social-links reveal" aria-label="Social media">
                    <a href="https://github.com/ShadowEsu" target="_blank" rel="noopener" class="social-link">${icon("code", "icon-xs")} GitHub</a>
                    <a href="https://www.linkedin.com/in/preston-jay-susanto-3a589534b/" target="_blank" rel="noopener" class="social-link">${icon("link", "icon-xs")} LinkedIn</a>
                    <a href="https://regradeapp.tech" target="_blank" rel="noopener" class="social-link">${icon("app", "icon-xs")} Regrade</a>
                </nav>
                <div class="footer-copy reveal">Preston Susanto © 2026</div>
            </div>
        </footer>
    `;

    initInteractions();
}

function initInteractions() {
    let roleIdx = 0;
    const roleCont = document.getElementById('role-container');
    if (roleCont) {
        setInterval(() => {
            roleIdx = (roleIdx + 1) % APP_DATA.roles.length;
            roleCont.style.transform = `translateY(-${roleIdx * 3}rem)`;
        }, 3200);
    }

    const navbar = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');
    const onScroll = () => {
        const scrollY = window.scrollY;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        if (progress && scrollMax > 0) {
            progress.style.width = ((scrollY / scrollMax) * 100) + '%';
        }
        if (navbar) navbar.classList.toggle('scrolled', scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => sectionObserver.observe(s));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.offsetTop - 100;
                if (window.lenis) window.lenis.scrollTo(top);
                else window.scrollTo({ top, behavior: 'smooth' });
                closeMobileNav();
            }
        });
    });

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    function closeMobileNav() {
        if (navToggle && navMenu) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
        }
    }
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('nav-open', open);
        });
    }

    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        window.lenis = lenis;
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        lenis.on('scroll', onScroll);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}
