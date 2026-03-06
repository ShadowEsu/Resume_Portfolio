/**
 * Preston Jay Susanto - Elite Portfolio Engine
 * A purely Vanilla JS implementation. No React, No TypeScript.
 */

const APP_DATA = {
    roles: [
        "Computer Science Student",
        "Software Engineer",
        "Accessibility Innovator",
        "Hackathon Builder",
        "Early College Entrant"
    ],
    journey: [
        { year: "2009 — 2021", loc: "Indonesia 🇮🇩", title: "Foundations", desc: "12 years of childhood & early education. Bilingual development and global perspective." },
        { year: "2021 — 2024", loc: "Australia 🇦🇺", title: "Acceleration", desc: "Wesley College. Founded Hack Clubs, Captained 3 sports. Achievement of 10 A's in Year 9 & 10." },
        { year: "Early 2025", loc: "China 🇨🇳", title: "Immersion", desc: "4 months intensive Mandarin Chinese immersion at Wendao School." },
        { year: "Aug 2025 — Present", loc: "USA 🇺🇸", title: "Impact", desc: "CS @ DVC. Google Developer Group Officer. Alpha Gamma Sigma Webmaster. 4.0 GPA." }
    ],
    projects: [
        { title: "Access for All", type: "Hackathon Winner", site: "#", desc: "ValleyHacks accessibility-first software for color blindness & dyslexia. Built in < 48hrs." },
        { title: "Aiko Matcha", type: "E-Commerce", site: "https://www.aikomatcha.com.au", desc: "Official retail site for premium matcha. High-performance custom build." },
        { title: "AGS Honor Society", type: "Official Portal", site: "https://dvcags.wixstudio.com/honor-society", desc: "Webmaster for the DVC honors chapter. Built for scalability and impact." },
        { title: "Wosado Australia", type: "Retail Hub", site: "https://wosadoaustralia.com.au", desc: "International beauty brand platform developer and maintenance lead." },
        { title: "Wesley Hack Club", type: "Educational", site: "https://wesley.hackclub.com", desc: "Founder. Inspired 20+ students to join and build tech communities." },
        { title: "Banyan Vanilla", type: "Brand Design", site: "https://www.banyanvanilla.com.au", desc: "Premium export brand digital presence and maintenance." }
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
        { year: "2025", role: "GDG Software Officer", org: "Google Developer Group", impact: "Leading 20+ active student developers in tech projects." },
        { year: "2025", role: "AGS Webmaster", org: "Alpha Gamma Sigma Honors", impact: "Managing digital infrastructure and accessibility standards." },
        { year: "2025", role: "Project Leader", org: "Code the Change", impact: "Involved with non-profit organisation impacting 100+ people in the slums of borneo, concerntrating on webste development and social media impact." },
        { year: "2024", role: "Hack Club Founder", org: "Wesley College", impact: "Created a sustainable tech community for 20+ members." },
        { year: "2021-2024", role: "3x Team Captain", org: "Volleyball, Soccer, Basketball", impact: "Led diverse teams to competitive success." }
    ],
    certs: [
        { name: "Sending Professional Emails", id: "NDIxMDI2", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Intro to LLMs and Responsible AI", id: "NDIxMDA1", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Introduction to Generative AI", id: "NDIwNjE5", issuer: "Google x NexusEdge", date: "Sep 2025" },
        { name: "Building Apps with Google AI Studio", id: "NDIxMDYx", issuer: "Google x NexusEdge", date: "Sep 2025" }
    ]
};

function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
        <nav id="navbar" class="fixed top-0 w-full z-50 py-6 transition-all duration-300 px-6">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm shadow-lg">P</div>
                    <span class="font-bold tracking-tight text-slate-800">Preston Jay Susanto</span>
                </div>
                <div class="flex items-center gap-6">
                    <div class="hidden md:flex gap-6 text-sm font-semibold text-slate-500">
                        <a href="#about" class="nav-link">Journey</a>
                        <a href="#projects" class="nav-link">Work</a>
                        <a href="#awards" class="nav-link">Awards</a>
                        <a href="#leadership" class="nav-link">Leadership</a>
                    </div>
                    <button id="toggle-proof" class="text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-sm">
                        Proof Mode
                    </button>
                </div>
            </div>
        </nav>

        <section id="hero" class="min-h-screen flex items-center pt-24 px-6">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
                <div class="reveal">
                    <div class="flex gap-2 mb-6">
                        <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">📍 SF Bay Area</span>
                        <span class="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">GPA 4.0 Verified</span>
                    </div>
                    <h1 class="hero-title text-6xl md:text-8xl font-black text-slate-900 leading-[1] mb-8 tracking-tighter">
                        Building the <br/> <span class="text-blue-600">Future.</span>
                    </h1>
                    <div class="h-10 overflow-hidden mb-10 relative">
                        <div id="role-container" class="role-animate space-y-0 transition-transform duration-700">
                            ${APP_DATA.roles.map(r => `<div class="h-10 flex items-center text-xl md:text-2xl font-semibold text-slate-400 font-mono italic">${r}</div>`).join('')}
                        </div>
                    </div>
                    <p class="text-xl text-slate-500 mb-12 leading-relaxed max-w-xl">
                        Computer Science student @ <span class="text-slate-900 font-bold underline decoration-blue-200">DVC</span>. Early entrant. Global perspective from Indonesia, Australia, and China. Mentoring the next generation of builders.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="#projects" class="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all hover:shadow-2xl hover:-translate-y-1 text-center">View Projects</a>
                        <a href="mailto:prestonjaysusanto@gmail.com" class="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:border-blue-400 transition-all text-center">Contact</a>
                    </div>
                    <div class="mt-12 pt-12 border-t border-slate-100 flex gap-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <div class="flex flex-col"><span class="text-2xl font-black">4</span><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nations</span></div>
                        <div class="flex flex-col"><span class="text-2xl font-black">4.0</span><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">GPA</span></div>
                        <div class="flex flex-col"><span class="text-2xl font-black">20+</span><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mentored</span></div>
                    </div>
                </div>
                <div class="hidden lg:block reveal" style="transition-delay: 200ms">
                    <div class="relative p-12 bg-white border border-slate-100 rounded-[4rem] shadow-2xl overflow-hidden">
                        <div class="absolute top-0 right-0 p-10">
                            <div class="w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-20 absolute"></div>
                            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">Google Certifications</h3>
                        <div class="space-y-6">
                            ${APP_DATA.certs.slice(0, 3).map(c => `
                                <div class="flex gap-4 pb-4 border-b border-slate-50">
                                    <div class="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xs italic">G</div>
                                    <div>
                                        <div class="font-bold text-sm text-slate-800">${c.name}</div>
                                        <div class="text-[10px] text-slate-400 font-mono">ID: ${c.id}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about" class="py-32 bg-slate-50 px-6">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-4xl md:text-5xl font-black mb-16 reveal">Global Journey</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${APP_DATA.journey.map((item, i) => `
                        <div class="p-8 bg-white border border-slate-100 rounded-3xl proof-element transition-all reveal shadow-sm" style="transition-delay: ${i * 100}ms">
                            <div class="font-mono text-[10px] font-bold text-slate-300 mb-2 uppercase">${item.year}</div>
                            <div class="text-2xl font-black mb-1 text-slate-900">${item.loc}</div>
                            <h3 class="font-bold text-blue-600 mb-4 text-[10px] uppercase tracking-widest">${item.title}</h3>
                            <p class="text-sm text-slate-500 leading-relaxed">${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="projects" class="py-32 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <h2 class="text-4xl md:text-5xl font-black reveal">Portfolio Sites</h2>
                    <p class="text-slate-500 max-w-sm reveal">A selection of platforms built for retail, education, and social impact.</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${APP_DATA.projects.map((p, i) => `
                        <a href="${p.site}" target="_blank" class="block bg-white p-8 rounded-3xl border border-slate-200 card-hover reveal group" style="transition-delay: ${i * 50}ms">
                            <div class="flex justify-between items-start mb-6">
                                <span class="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full tracking-widest">${p.type}</span>
                                <span class="text-slate-300 group-hover:text-blue-600 transition-colors">↗</span>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 text-slate-800">${p.title}</h3>
                            <p class="text-sm text-slate-500 mb-6 leading-relaxed h-12 overflow-hidden">${p.desc}</p>
                            <span class="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">Launch Project</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="awards" class="py-32 bg-white px-6">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-4xl md:text-5xl font-black mb-20 reveal">Awards & Proof</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                    ${Object.entries(APP_DATA.awards).sort((a,b) => b[0] - a[0]).map(([year, list]) => `
                        <div class="reveal">
                            <div class="text-6xl font-black text-slate-100 border-b-4 border-slate-50 pb-2 mb-10">${year}</div>
                            <div class="space-y-8">
                                ${list.map(a => `
                                    <div class="proof-element border-l-2 border-slate-100 pl-6 py-1 transition-all">
                                        <div class="font-bold text-sm text-slate-800 mb-1 leading-tight">${a.title}</div>
                                        <div class="text-[10px] text-slate-400 leading-tight font-bold uppercase tracking-wider">${a.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="leadership" class="py-32 bg-slate-900 text-white px-6">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 class="text-4xl md:text-5xl font-black mb-12 reveal">Leadership.</h2>
                        <div class="space-y-12">
                            ${APP_DATA.leadership.map((l, i) => `
                                <div class="reveal group" style="transition-delay: ${i * 100}ms">
                                    <div class="text-blue-500 font-black text-[9px] uppercase tracking-widest mb-1">${l.org}</div>
                                    <div class="text-xl font-bold group-hover:translate-x-2 transition-transform">${l.role}</div>
                                    <p class="text-slate-400 text-sm mt-2 font-light">${l.impact}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] relative overflow-hidden reveal">
                        <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
                        <h3 class="text-xl font-bold mb-6">Mentorship Focus</h3>
                        <p class="text-slate-300 text-lg leading-relaxed italic mb-8 font-light">
                            "Committed to creating communities that last. In every club founded or led, I prioritize onboarding at least 20 students to ensure technical growth is accessible to all."
                        </p>
                        <div class="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                           <div>
                              <div class="text-4xl font-black mb-1">10+ A's</div>
                              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Yearly Excellence</div>
                           </div>
                           <div>
                              <div class="text-4xl font-black mb-1">3x</div>
                              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Varsity Captaincy</div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer id="contact" class="py-32 bg-white px-6">
            <div class="max-w-7xl mx-auto text-center">
                <h2 class="text-4xl md:text-6xl font-black mb-12 reveal text-slate-900">Let's connect.</h2>
                <div class="flex flex-wrap justify-center gap-6 mb-24 reveal">
                    <a href="mailto:prestonjaysusanto@gmail.com" class="p-8 bg-slate-50 border border-slate-100 rounded-3xl min-w-[300px] flex-1 hover:bg-blue-50 hover:border-blue-200 transition-all text-left">
                        <div class="text-[10px] font-bold uppercase text-slate-400 mb-2">Email</div>
                        <div class="text-lg font-bold text-slate-800">prestonjaysusanto@gmail.com</div>
                    </a>
                    <a href="tel:+19254570055" class="p-8 bg-slate-50 border border-slate-100 rounded-3xl min-w-[300px] flex-1 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left">
                        <div class="text-[10px] font-bold uppercase text-slate-400 mb-2">Phone</div>
                        <div class="text-lg font-bold text-slate-800">+1 (925) 457-0055</div>
                    </a>
                </div>
                <div class="flex justify-center gap-12 text-slate-400 font-bold uppercase text-[10px] tracking-widest reveal">
                    <a href="https://github.com/ShadowEsu" target="_blank" class="hover:text-slate-900 transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/preston-jay-susanto-3a589534b/" target="_blank" class="hover:text-blue-600 transition-colors">LinkedIn</a>
                    <a href="https://instagram.com/preston_susanto" target="_blank" class="hover:text-pink-600 transition-colors">Instagram</a>
                </div>
                <div class="mt-24 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Preston Jay Susanto &copy; 2025 // Professional Portfolio
                </div>
            </div>
        </footer>
    `;

    initInteractions();
}

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

    // 2. Navbar Scroll Style
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled', 'py-4');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.remove('scrolled', 'py-4');
                navbar.classList.add('py-6');
            }
        }
    });

    // 3. Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Proof Toggle
    let proofActive = false;
    const toggleBtn = document.getElementById('toggle-proof');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            proofActive = !proofActive;
            document.body.classList.toggle('proof-active', proofActive);
            toggleBtn.textContent = proofActive ? 'Proof Verified ✓' : 'Proof Mode';
            toggleBtn.classList.toggle('bg-emerald-600', proofActive);
            toggleBtn.classList.toggle('text-white', proofActive);
        };
    }

    // 5. Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.onclick = (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        };
    });
}

// Ensure the render happens after DOM is fully ready
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}