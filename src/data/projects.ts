export interface Project {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  heroMedia: string;
  thumbnail: string;
  width: number;
  height: number;
  featured: boolean;
  technologies: string[];
  role: string;
  challenge: string;
  process: string;
  outcome: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "regrade",
    index: "01",
    title: "Regrade",
    subtitle: "Grade appeal, grounded in the rubric",
    year: "2026",
    category: "Education Technology",
    summary:
      "Upload graded work and a rubric. Regrade finds recoverable points, shows GPA impact, and drafts a professor-safe appeal you control.",
    heroMedia: "/projects/regrade/hero.jpg",
    thumbnail: "/projects/regrade/thumb.jpg",
    width: 1600,
    height: 2000,
    featured: true,
    technologies: ["React Native", "TypeScript", "Claude API", "Supabase"],
    role: "Founder and engineer",
    challenge:
      "Students lose points they earned because appeals feel intimidating and vague. Generic AI chat makes that worse.",
    process:
      "Built a dual-model pipeline that reads rubrics and marked work together, then drafts calm, evidence-based appeals. Shipped to iOS and Android while applying to YC Fall 2026.",
    outcome:
      "Live product on both app stores. Waitlist traction and a clear founder narrative around fairness in grading.",
    gallery: [
      "/projects/regrade/screen-01.png",
      "/projects/regrade/screen-02.png",
      "/projects/regrade/hero.jpg",
    ],
  },
  {
    slug: "jayminilm",
    index: "02",
    title: "JayMiniLM",
    subtitle: "Small models, local-first experiments",
    year: "2026",
    category: "Machine Learning",
    summary:
      "Lightweight language-model experiments aimed at running useful AI on constrained hardware without a cloud budget.",
    heroMedia: "/projects/jayminilm/hero.jpg",
    thumbnail: "/projects/jayminilm/thumb.jpg",
    width: 1600,
    height: 1200,
    featured: true,
    technologies: ["Python", "PyTorch", "Transformers"],
    role: "Research engineer",
    challenge:
      "Most tutorials assume GPUs and cloud credits. I needed a path that still teaches real ML under constraints.",
    process:
      "Prototyped compact training and inference loops, measuring quality against size and latency on a MacBook.",
    outcome:
      "A personal lab for model compression ideas that feeds into tutoring and agent work.",
    gallery: ["/projects/jayminilm/hero.jpg", "/projects/jayminilm/thumb.jpg"],
  },
  {
    slug: "reward-shaping-research",
    index: "03",
    title: "Reward Shaping",
    subtitle: "Accessible AI tutoring for community colleges",
    year: "2026",
    category: "Reinforcement Learning",
    summary:
      "Independent RL research on adaptive reward shaping so tutoring agents learn without institutional compute.",
    heroMedia: "/projects/research/hero.jpg",
    thumbnail: "/projects/research/thumb.jpg",
    width: 1600,
    height: 1800,
    featured: true,
    technologies: ["Python", "Gymnasium", "NumPy", "SciPy"],
    role: "Independent researcher · advised by Prof. Kyu Woong Lee",
    challenge:
      "Sparse rewards slow Q-learning. Community colleges rarely have GPU clusters for tutoring agents.",
    process:
      "Benchmarked TD-error window heuristics as dynamic potential functions across seed runs and ablations.",
    outcome:
      "Manuscript targeting arXiv and Journal of Student Research. Full stack runs on consumer hardware.",
    gallery: ["/projects/research/hero.jpg", "/projects/research/thumb.jpg"],
  },
  {
    slug: "sos-gps-button",
    index: "04",
    title: "SOS GPS Button",
    subtitle: "Hardware panic alert with live location",
    year: "2026",
    category: "Hardware",
    summary:
      "One physical press triggers an alarm and sends live GPS coordinates to an emergency contact over WhatsApp.",
    heroMedia: "/projects/sos/hero.jpg",
    thumbnail: "/projects/sos/thumb.jpg",
    width: 1600,
    height: 1400,
    featured: false,
    technologies: ["Arduino", "Raspberry Pi", "Python", "Twilio"],
    role: "Hardware and systems",
    challenge:
      "Unlocking a phone during an emergency is too slow. The alert had to be physical and immediate.",
    process:
      "Linked Arduino GPS and buzzer to Raspberry Pi logic, packaging coordinates as a Maps link via WhatsApp.",
    outcome:
      "End-to-end demo at AI Berkeley Hackathon. Not slideware - a working device.",
    gallery: ["/projects/sos/hero.jpg", "/projects/sos/thumb.jpg"],
  },
  {
    slug: "car-knowledge-app",
    index: "05",
    title: "Car Knowledge App",
    subtitle: "Voice and form agents for real workflows",
    year: "2026",
    category: "Mobile Application",
    summary:
      "Conversational agents that collect structured answers and push them into real systems - forms, calls, and cloud runtimes.",
    heroMedia: "/projects/car-app/hero.jpg",
    thumbnail: "/projects/car-app/thumb.jpg",
    width: 1400,
    height: 1600,
    featured: false,
    technologies: ["Next.js", "Gemini Live", "Twilio", "Cloud Run"],
    role: "Full-stack engineer",
    challenge:
      "Phone and browser surveys break when confirmation, required fields, and submission are afterthoughts.",
    process:
      "Built call and browser flows with confirmation steps and live event logs on Cloud Run.",
    outcome:
      "Hackathon-proven agent stack reusable across automotive and survey use cases.",
    gallery: ["/projects/car-app/hero.jpg", "/projects/car-app/thumb.jpg"],
  },
  {
    slug: "selected-experiments",
    index: "06",
    title: "Selected Experiments",
    subtitle: "Hackathons, accessibility, and side builds",
    year: "2025-2026",
    category: "Experiments",
    summary:
      "A cluster of shipped experiments - Sortify, Scholaris, accessibility tooling, and local-first assistants.",
    heroMedia: "/projects/experiments/hero.jpg",
    thumbnail: "/projects/experiments/thumb.jpg",
    width: 1600,
    height: 1100,
    featured: false,
    technologies: ["React", "FastAPI", "Firebase", "JavaScript"],
    role: "Builder",
    challenge:
      "Weekends and between-class hours are short. Experiments still need a clear question and a demo.",
    process:
      "Scoped each build around one user pain, shipped a vertical slice, and documented what failed.",
    outcome:
      "Multiple awards including SF Hacks category wins and a growing archive of reusable patterns.",
    gallery: [
      "/projects/experiments/hero.jpg",
      "/projects/experiments/thumb.jpg",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return projects[0];
  return projects[(i + 1) % projects.length];
}
