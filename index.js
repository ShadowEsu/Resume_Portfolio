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
        { icon: "research", label: "RL Research", value: "In progress", sub: "Reproducing CS285 & CS234 coursework", prestige: true },
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
        status: "In progress — Independent research",
        targets: "arXiv (Sep 2026) · Journal of Student Research (Oct 2026)",
        bullets: [
            "Investigating Q-learning with adaptive reward shaping to improve convergence speed in sparse-reward environments. Designing reward-shaping heuristics motivated by potential-based shaping theorems.",
            "Building an RL training and evaluation pipeline in Python; benchmarking convergence against baseline Q-learning across gridworld and tutoring-simulation tasks.",
            "Reproducing reinforcement learning research through UC Berkeley CS285 and Stanford CS234 coursework, with extensions toward an independent thesis on accessible AI tutoring."
        ]
    },

    siteDirectory: [
        {
            title: "PERMIAS Nasional",
            url: "https://permiasnasional.com/",
            host: "permiasnasional.com",
            role: "Senior Web Developer · National Org",
            desc: "Central hub for Indonesian students across the U.S. — publishing, resources, and chapter directory.",
            image: "images/permias-nasional.png",
            icon: "globe",
            prestige: true
        },
        {
            title: "AGS Honor Society",
            url: "https://dvcags.wixstudio.com/honor-society",
            host: "dvcags.wixstudio.com",
            role: "Webmaster · Gamma Psi Chapter",
            desc: "Official portal for California's community college honor society — events, scholarships, and membership.",
            image: "images/ags-honor-society.png",
            icon: "grad",
            prestige: true
        },
        {
            title: "Aiko Matcha",
            url: "https://www.aikomatcha.com.au",
            host: "aikomatcha.com.au",
            role: "Lead Developer · E-Commerce",
            desc: "Premium matcha retail site — custom build driving thousands in sales across Australia.",
            image: "images/aiko-matcha.png",
            icon: "leaf",
            prestige: false
        },
        {
            title: "Wosado Australia",
            url: "https://wosadoaustralia.com.au",
            host: "wosadoaustralia.com.au",
            role: "Lead Architect · Beauty Brand",
            desc: "Full Shopify e-commerce for a live international beauty brand with workflow automation.",
            image: "images/wosado-australia.png",
            icon: "cart",
            prestige: false
        },
        {
            title: "Regrade",
            url: "https://regradeapp.tech",
            host: "regradeapp.tech",
            role: "Founder · Mobile app",
            desc: "iOS app with dual-model AI — rubric-grounded grade recovery and appeal support.",
            image: "images/regrade.png",
            icon: "app",
            prestige: true
        }
    ],

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
                    desc: "Mobile iOS & web app that ingests rubrics and graded work, runs multi-step LLM analysis, and surfaces recoverable marks with rubric-grounded evidence.",
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
                    preview: "images/aiko-matcha.png",
                    desc: "Official retail site for premium matcha. Custom build driving thousands in sales across Australia.",
                    tech: ["HTML", "CSS", "JavaScript", "Python"]
                },
                {
                    title: "Wosado Australia",
                    type: "Beauty Brand · Live",
                    site: "https://wosadoaustralia.com.au",
                    preview: "images/wosado-australia.png",
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
                    desc: "Modular RL personal AI agent using Q-learning for on-device adaptive decision-making — research thesis testbed tied to CS285 & CS234 coursework.",
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
                    title: "Cauliform",
                    type: "Gemini Hackathon · Top 1%",
                    site: "https://github.com/ShadowEsu/Cauliform-AI",
                    desc: "Autonomous voice agent with reinforced memory — top 1% of 12,000+ participants at the Gemini AI Live Agent Hackathon.",
                    tech: ["Gemini API", "Twilio", "Google Cloud", "Next.js"]
                },
                {
                    title: "Best Gaming Hack",
                    type: "Mega Hackathon 2026 · Winner",
                    site: "https://github.com/ShadowEsu",
                    desc: "Solo gaming project — top 1% of 950+ participants at Mega Hackathon 2026.",
                    tech: ["Game Dev", "JavaScript"]
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
                    type: "Webmaster · Official Portal",
                    site: "https://dvcags.wixstudio.com/honor-society",
                    preview: "images/ags-honor-society.png",
                    desc: "Webmaster for the DVC Gamma Psi chapter — official portal for scholarships, events, and membership.",
                    tech: ["Wix", "Web Design"]
                },
                {
                    title: "PERMIAS Nasional",
                    type: "National Org · Live",
                    site: "https://permiasnasional.com/",
                    preview: "images/permias-nasional.png",
                    desc: "Publish and maintain the PERMIAS National website — central hub for Indonesian students across the U.S.",
                    tech: ["Web Publishing", "Content Strategy"]
                }
            ]
        }
    ],

    experienceDirs: [
        {
            dir: "Professional & industry",
            icon: "briefcase",
            entries: [
                {
                    org: "AI Business Consulting Group (AIBCG), Parinama Group",
                    icon: "brain",
                    location: "Remote",
                    pinned: true,
                    roles: [{
                        title: "Lead AI System Architect",
                        type: "Contract",
                        dateRange: "May 2026 — Present",
                        current: true,
                        bullets: [
                            "Architecting agentic AI systems and retrieval-augmented (RAG) pipelines for business consulting clients.",
                            "Owning end-to-end design from data ingestion through model integration and deployment."
                        ],
                        skills: "Agentic AI · RAG · System Architecture"
                    }]
                },
                {
                    org: "Wosado Australia",
                    logo: "images/wosado-australia.png",
                    location: "Perth, Australia · Remote",
                    site: "https://wosadoaustralia.com.au",
                    roles: [{
                        title: "Senior Web Application Developer",
                        type: "Internship",
                        dateRange: "Jul 2025 — Present",
                        current: true,
                        bullets: [
                            "Developed and managed the Wosado Australia website, enhancing functionality and design to attract customers.",
                            "Collaborated with the business owner on engagement strategies; contributed to sales growth across Australia."
                        ],
                        skills: "Visual Web Development · Shopify"
                    }]
                },
                {
                    org: "Aiko Matcha",
                    logo: "images/aiko-matcha.png",
                    location: "Perth, Australia · Remote",
                    site: "https://www.aikomatcha.com.au",
                    roles: [{
                        title: "Senior Web Application Developer",
                        type: "Internship",
                        dateRange: "Jun 2025 — Present",
                        current: true,
                        bullets: [
                            "Developed and maintained the matcha e-commerce site, enhancing online purchasing capabilities.",
                            "Collaborated with the business owner on product strategy — thousands in sales and increased engagement."
                        ],
                        skills: "Web Development · Website Building · Python"
                    }]
                }
            ]
        },
        {
            dir: "Campus leadership · DVC",
            icon: "users",
            entries: [
                {
                    org: "Google Developers Group · DVC",
                    logo: "images/logos/gdg.png",
                    location: "Pleasant Hill, CA · On-site",
                    pinned: true,
                    roles: [
                        {
                            title: "President",
                            type: "Full-time",
                            dateRange: "May 2026 — Present",
                            current: true,
                            skills: "Organizational Leadership"
                        },
                        {
                            title: "Software Engineer Officer",
                            type: "Full-time",
                            dateRange: "Sep 2025 — Jun 2026",
                            bullets: [
                                "Collaborated with 20+ members to foster a coding community at DVC.",
                                "Led project initiatives; developed web applications and motivated peers toward challenging builds."
                            ],
                            skills: "Website Building · Website Updating · Project Management"
                        }
                    ]
                },
                {
                    org: "DVC International Students Club",
                    logo: "images/logos/isc.png",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [{
                        title: "Vice President",
                        type: "Part-time",
                        dateRange: "May 2026 — Present",
                        current: true,
                        skills: "Collaborative Leadership · Leadership"
                    }]
                },
                {
                    org: "Science and Engineering Club · DVC",
                    logo: "images/logos/snes.png",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [
                        {
                            title: "Executive Treasurer",
                            type: "Full-time",
                            dateRange: "May 2026 — Present",
                            current: true
                        },
                        {
                            title: "Computer Engineer Officer",
                            type: "Full-time",
                            dateRange: "Nov 2025 — Jun 2026",
                            skills: "Project Management · Project Planning"
                        }
                    ]
                },
                {
                    org: "Alpha Gamma Sigma — Gamma Psi Chapter",
                    logo: "images/ags-honor-society.png",
                    location: "Pleasant Hill, CA · On-site",
                    site: "https://dvcags.wixstudio.com/honor-society",
                    roles: [
                        {
                            title: "Executive Secretary",
                            type: "Part-time",
                            dateRange: "Apr 2026 — Present",
                            current: true,
                            skills: "Executive Administrative Assistance · Software Documentation"
                        },
                        {
                            title: "Webmaster",
                            type: "Seasonal",
                            dateRange: "Sep 2025 — Apr 2026",
                            bullets: [
                                "Maintained and updated the official AGS website; coordinated with executives on digital club promotion."
                            ],
                            skills: "Visual Web Development · Web Design"
                        }
                    ]
                },
                {
                    org: "Diablo Valley College Inter-Club Council",
                    logo: "images/logos/icc.png",
                    location: "Pleasant Hill & Pleasanton, CA",
                    roles: [
                        {
                            title: "Executive Tech and Outreach (SNES, Omega Leo)",
                            type: "Part-time",
                            dateRange: "Apr 2026 — Present",
                            current: true,
                            location: "Pleasanton, CA · On-site"
                        },
                        {
                            title: "Club Council Representative (Omega Leo, SNES)",
                            type: "Part-time",
                            dateRange: "Feb — May 2026",
                            location: "Pleasant Hill, CA · Remote",
                            bullets: [
                                "ICC rep for CryptoAcademy DVC — managed meetings, coordinated payments, and strengthened member engagement.",
                                "Attended 10+ consecutive ICC meetings to boost club funds and membership growth."
                            ],
                            skills: "Project Management · Student Council"
                        }
                    ]
                },
                {
                    org: "PERMIAS Nasional",
                    logo: "images/logos/permias.png",
                    location: "Pleasant Hill, CA · Remote",
                    site: "https://permiasnasional.com/",
                    roles: [{
                        title: "Promotion and Production",
                        type: "Apprenticeship",
                        dateRange: "Mar 2026 — Present",
                        current: true,
                        bullets: [
                            "Supply ordering and social media marketing for the national Indonesian student association.",
                            "Publish and maintain permiasnasional.com as a hub for students across the U.S."
                        ],
                        skills: "Supply Ordering · Social Media Marketing · Web Publishing"
                    }]
                },
                {
                    org: "Indo DVC",
                    logo: "images/logos/indo-dvc.png",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [{
                        title: "Event Organiser Officer",
                        type: "Apprenticeship",
                        dateRange: "Mar 2026 — Present",
                        current: true,
                        skills: "Event Management · Event Marketing"
                    }]
                },
                {
                    org: "Diablo Valley College",
                    icon: "grad",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [{
                        title: "Math Tutor",
                        type: "Part-time",
                        dateRange: "Apr 2026 — Present",
                        current: true
                    }]
                },
                {
                    org: "Toastmasters International · DVC",
                    logo: "images/logos/toastmasters.png",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [{
                        title: "Engagement Coordinator",
                        type: "Full-time",
                        dateRange: "Sep — Dec 2025",
                        bullets: [
                            "Activities coordinator enhancing member participation and public speaking practice.",
                            "Fostered a supportive environment for debating and communication skills."
                        ],
                        skills: "Speech Writing · Communication"
                    }]
                },
                {
                    org: "Code the Change · DVC",
                    logo: "images/logos/code-the-change.png",
                    location: "Pleasant Hill, CA · On-site",
                    roles: [{
                        title: "Project Leader",
                        type: "Full-time",
                        dateRange: "Sep — Dec 2025",
                        bullets: [
                            "Led a team of web developers building nonprofit sites for educators in Borneo.",
                            "Fostered collaborations emphasizing teamwork and problem-solving."
                        ],
                        skills: "HTML · CSS · Project Management"
                    }]
                }
            ]
        }
    ],

    awards: {
        "2026": [
            { title: "Best Hardware / Beginner / Boxi AI", winner: true, desc: "SF Hacks 2026 — three category wins among 250+ participants for Sortify." },
            { title: "ValleyHacks Winner", winner: true, desc: "Access for All — accessibility software for color blindness & dyslexia, built in under 48 hours." },
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

    journey: [
        {
            year: "2009 — 2021",
            place: "Indonesia",
            title: "Where it started",
            desc: "Grew up bilingual, with a global perspective forming early — before I knew I'd need it."
        },
        {
            year: "2021 — 2025",
            place: "Australia",
            title: "Wesley College",
            desc: "Ranked #1 private school in Australia. Founded the first CS club, captained three sports, graduated with top honors."
        },
        {
            year: "Early 2025",
            place: "China",
            title: "Four months immersion",
            desc: "Intensive Mandarin at Wendao School — another country, another sacrifice of comfort for growth."
        },
        {
            year: "Aug 2025 — Present",
            place: "United States",
            title: "The leap",
            desc: "Left home and everything familiar to study EECS at DVC. 4.0 GPA. Transfer target: UC Berkeley EECS, Fall 2027."
        }
    ],

    journeyDream: {
        heading: "Berkeley is the door. Y Combinator is the dream.",
        body: "I did not come to California for an easy path. I came because UC Berkeley EECS is the standard I hold myself to — and every sacrifice since leaving Indonesia and Australia has been oriented toward walking through that door. Building Regrade, leading clubs, tutoring, and shipping client work are not distractions; they are how I prove I belong in rooms that matter. Y Combinator is the dream on the other side: a company that helps real students, built by someone who crossed oceans to get here."
    },

    leadership: [
        { logo: "images/logos/gdg.png", year: "2026", role: "President", org: "Google Developers Group · DVC", impact: "Leading 20+ student developers in coding projects and community initiatives." },
        { logo: "images/logos/isc.png", year: "2026", role: "Vice President", org: "DVC International Students Club", impact: "Collaborative leadership for one of DVC's largest international student communities." },
        { logo: "images/logos/snes.png", year: "2026", role: "Executive Treasurer", org: "Science & Engineering Club", impact: "Executive board member overseeing club finances and engineering initiatives." },
        { logo: "images/logos/icc.png", year: "2026", role: "Executive Tech & Outreach", org: "Inter-Club Council", impact: "Tech and outreach for SNES and Omega Leo across the ICC." },
        { icon: "users", year: "2021–2025", role: "Co-President, Wesley Coding Club", org: "Wesley College", impact: "Founded the school's first CS club; 30+ members in opening week." },
        { icon: "trophy", year: "2021–2025", role: "3× Team Captain", org: "Volleyball, Soccer, Basketball", impact: "Led 3rd-division teams at Australia's #1 private school." }
    ]
};

function orgMark(entry) {
    if (entry.logo) {
        const shot = !entry.logo.includes("/logos/");
        return `<div class="exp-logo-wrap${shot ? " exp-logo-wrap-shot" : ""}"><img src="${entry.logo}" alt="" class="exp-logo${shot ? " exp-logo-shot" : ""}" width="48" height="48" loading="lazy"></div>`;
    }
    return `<div class="exp-icon-wrap">${icon(entry.icon || "briefcase", "icon-md")}</div>`;
}

function renderExpRole(role) {
    return `
        <div class="exp-role-block ${role.current ? "exp-role-current" : ""}">
            <div class="exp-role-header">
                <div>
                    <h4 class="exp-title">${role.title}</h4>
                    ${role.location ? `<span class="exp-role-loc">${role.location}</span>` : ""}
                </div>
                <div class="exp-meta">
                    <span class="exp-type-badge">${role.type}</span>
                    <span class="exp-date">${role.dateRange}</span>
                </div>
            </div>
            ${role.bullets && role.bullets.length ? `
                <ul class="exp-bullets">
                    ${role.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
            ` : ""}
            ${role.skills ? `<div class="exp-skills">${role.skills}</div>` : ""}
        </div>
    `;
}

function renderExpCard(entry, i) {
    return `
        <article class="exp-card ${entry.pinned ? "exp-card-pinned" : ""} reveal" style="transition-delay: ${i * 45}ms">
            <div class="exp-card-top">
                ${orgMark(entry)}
                <div class="exp-card-main">
                    ${entry.pinned ? `<div class="exp-pin-badge">● Current</div>` : ""}
                    <div class="exp-org-header">
                        <h3 class="exp-org-name">${entry.org}</h3>
                        <span class="exp-location">${entry.location}</span>
                    </div>
                    ${entry.roles.map(renderExpRole).join("")}
                    ${entry.site ? `<a href="${entry.site}" target="_blank" rel="noopener" class="exp-site-link">${icon("link", "icon-xs")} Visit site</a>` : ""}
                </div>
            </div>
        </article>
    `;
}

function icon(name, cls = "icon") {
    return `<span class="${cls}" aria-hidden="true">${ICONS[name] || ICONS.spark}</span>`;
}

function renderSiteDirectoryCard(site, i) {
    return `
        <a href="${site.url}" target="_blank" rel="noopener" class="site-dir-card ${site.prestige ? 'site-dir-card-prestige' : ''} reveal" style="transition-delay: ${i * 70}ms">
            <div class="site-dir-browser">
                <div class="site-dir-chrome" aria-hidden="true">
                    <span class="site-dir-dot"></span>
                    <span class="site-dir-dot"></span>
                    <span class="site-dir-dot"></span>
                    <span class="site-dir-url">${site.host}</span>
                </div>
                <div class="site-dir-preview">
                    <img src="${site.image}" alt="${site.title} website preview" loading="lazy" width="640" height="360">
                </div>
            </div>
            <div class="site-dir-body">
                <div class="site-dir-title-row">
                    <span class="site-dir-icon">${icon(site.icon, "icon-sm")}</span>
                    <h3 class="site-dir-title">${site.title}</h3>
                </div>
                <p class="site-dir-role">${site.role}</p>
                <p class="site-dir-desc">${site.desc}</p>
                <span class="site-dir-link">Visit site →</span>
            </div>
        </a>
    `;
}

function renderProjectCard(p, i, delayBase = 50) {
    return `
        <article class="project-card reveal" style="transition-delay: ${i * delayBase}ms">
            ${p.preview ? `
                <a href="${p.site}" target="_blank" rel="noopener" class="project-preview-link" aria-label="Open ${p.title}">
                    <div class="project-preview">
                        <img src="${p.preview}" alt="${p.title} preview" loading="lazy" width="640" height="360">
                    </div>
                </a>
            ` : ''}
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
            <span>Transfer target: <strong>UC Berkeley EECS</strong> · Building <strong>Regrade</strong> · Dreaming of <strong>Y Combinator</strong></span>
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
                    <a href="#journey" class="nav-link">Journey</a>
                    <a href="#research" class="nav-link">Research</a>
                    <a href="#experience" class="nav-link">Experience</a>
                    <a href="#sites" class="nav-link">Sites</a>
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
                        First-year EECS student building mobile apps and reproducing reinforcement learning
                        research through <strong>UC Berkeley CS285</strong> and <strong>Stanford CS234</strong>.
                        Working on <a href="https://regradeapp.tech" target="_blank" rel="noopener" class="inline-link">Regrade</a>,
                        an iOS app with dual-model AI, alongside independent RL coursework and thesis work.
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
                            <span class="stat-value">4×</span>
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
                        I build mobile apps, work through RL coursework, and apply what I learn to real products
                        and independent research.
                    </p>
                </div>
                <div class="about-grid reveal">
                    <div class="about-card">
                        <div class="about-card-icon">${icon("research", "icon-md")}</div>
                        <span class="about-num">01</span>
                        <h3 class="about-card-title">Empirical RL research</h3>
                        <p class="about-card-desc">Reproducing reinforcement learning research through <strong>CS285</strong> and <strong>CS234</strong>, with an independent thesis on reward shaping for AI tutoring.</p>
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

        <section id="journey" class="section section-alt">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("globe", "icon-xs")} Journey</span>
                    <h2 class="section-heading">Four countries. One destination.</h2>
                    <p class="section-subtitle section-subtitle-center">
                        Indonesia, Australia, China, and the United States — each move a deliberate step toward UC Berkeley EECS.
                    </p>
                </div>
                <div class="journey-grid reveal">
                    ${APP_DATA.journey.map((step, i) => `
                        <div class="journey-card" style="transition-delay: ${i * 60}ms">
                            <div class="journey-year">${step.year}</div>
                            <div class="journey-loc">${step.place}</div>
                            <div class="journey-title">${step.title}</div>
                            <p class="journey-desc">${step.desc}</p>
                        </div>
                    `).join("")}
                </div>
                <article class="journey-dream reveal">
                    <h3 class="journey-dream-heading">${APP_DATA.journeyDream.heading}</h3>
                    <p class="journey-dream-body">${APP_DATA.journeyDream.body}</p>
                </article>
            </div>
        </section>

        <section id="research" class="section">
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
                    <h2 class="section-heading">Professional &amp; campus leadership.</h2>
                    <p class="section-subtitle section-subtitle-center">Industry contracts, live client sites, and 10+ officer roles across DVC student organizations.</p>
                </div>
                ${APP_DATA.experienceDirs.map((group, gi) => `
                    <div class="exp-directory reveal" style="transition-delay: ${gi * 60}ms">
                        <div class="directory-header">
                            <div class="directory-icon">${icon(group.icon, "icon-md")}</div>
                            <h3 class="directory-title">${group.dir}</h3>
                            <span class="directory-count">${group.entries.length} organizations</span>
                        </div>
                        <div class="experience-list">
                            ${group.entries.map((entry, i) => renderExpCard(entry, i)).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>

        <section id="sites" class="section section-alt">
            <div class="container">
                <div class="section-header section-header-center reveal">
                    <span class="section-label">${icon("globe", "icon-xs")} Live sites</span>
                    <h2 class="section-heading">Site directory</h2>
                    <p class="section-subtitle section-subtitle-center">
                        Websites I've built, shipped, and maintain — from national org portals to live e-commerce.
                    </p>
                </div>
                <div class="site-directory-panel reveal">
                    <div class="site-directory-grid">
                        ${APP_DATA.siteDirectory.map((site, i) => renderSiteDirectoryCard(site, i)).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" class="projects-section">
            <div class="projects-inner">
                <header class="projects-header section-header-center reveal">
                    <span class="section-label">${icon("code", "icon-xs")} Projects</span>
                    <h2 class="projects-title">Work &amp; shipped products</h2>
                    <p class="projects-subtitle projects-subtitle-center">14 projects across live products, AI agents, hackathon wins, and community platforms.</p>
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
                        <div class="leadership-item-card reveal" style="transition-delay: ${i * 60}ms">
                            <div class="leadership-card-icon${l.logo && !l.logo.includes("/logos/") ? " leadership-logo-wrap-shot" : ""}">
                                ${l.logo ? `<img src="${l.logo}" alt="" class="leadership-logo${l.logo.includes("/logos/") ? "" : " leadership-logo-shot"}" width="32" height="32" loading="lazy">` : icon(l.icon, "icon-sm")}
                            </div>
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
