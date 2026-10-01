export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: "LIVE" | "FEATURED" | "SYSTEM";
  badgeColor?: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  architecture: {
    layers: { name: string; details: string; color: string }[];
    dataFlow: string[];
  };
  features: string[];
  metrics: { label: string; value: string; detail: string }[];
  tamilSnippet?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Languages" | "Web & Backend" | "AI & ML" | "Databases" | "Tools";
  level?: "Core" | "Advanced" | "Proficient";
}

export interface CertificationItem {
  id: string;
  issuer: "Infosys Springboard" | "Cisco" | "Coursera" | "Simplilearn";
  title: string;
  topics: string[];
  credentialId: string;
  color: string;
  accentRgba: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "ARCHANA DEVI M",
    title: "AI/ML ENGINEER — FULL-STACK DEVELOPER",
    subtitle: "Pre-Final Year CSE (AI & ML) Student & Competitive Programmer",
    tagline: "Building intelligent systems where AI, software and real-world problems meet.",
    email: "kit28.24bam007@gmail.com",
    phone: "+91 9698213015",
    location: "Tamil Nadu, India",
    college: "KIT — Kalaignarkarunanidhi Institute of Technology",
    degree: "B.E. Computer Science & Engineering (AI & ML)",
    gpa: "8.04 / 10",
    batch: "2024 — 2028 (Pre-Final Year)",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      leetcode: "https://leetcode.com",
      codechef: "https://codechef.com",
    },
    bio: [
      "I am a pre-final-year Computer Science & Engineering (AI & ML) student at KIT with an 8.04/10 GPA, dedicated to building organic, high-performance intelligent software.",
      "My engineering philosophy binds mathematical algorithmic rigor (1,561+ problems, 425 active coding days) with production-grade full-stack systems engineering.",
      "From deploying offline-first ML classifiers for farmers to architecting coastal multi-agent autonomous simulations and low-latency generative AI studios, I build deterministic software that solves concrete human challenges."
    ]
  },

  stats: [
    { label: "Cumulative GPA", value: "8.04", suffix: "/10", detail: "KIT Autonomous" },
    { label: "Verified Projects", value: "10", suffix: "+", detail: "End-to-end architectures" },
    { label: "DSA Problems Solved", value: "1561", suffix: "+", detail: "LeetCode · CodeChef · CF" },
    { label: "Active Coding Days", value: "425", suffix: "d", detail: "Codolio Global #8706" },
  ],

  experience: [
    {
      id: "abservetech-internship",
      company: "Abservetech Private Limited",
      role: "Full Stack Development Intern",
      location: "Madurai, Tamil Nadu",
      period: "May 2026 – Jun 2026",
      status: "COMPLETED",
      description: "Delivered production full-stack modules focusing on responsive UI pipelines, protected routing, session lifecycle management, and scalable REST API integration.",
      contributions: [
        {
          title: "React + Node.js News Application",
          details: "Engineered performant, highly accessible client interfaces and real-time news stream rendering pipelines backed by Express.js services.",
          tags: ["React.js", "Node.js", "Express.js", "REST APIs"]
        },
        {
          title: "Auth, Protected Routes & Session Management",
          details: "Implemented robust JWT authentication architecture, HTTP-only secure cookie sessions, and granular role-based access route guards.",
          tags: ["JWT", "Security", "Protected Routes", "Session Management"]
        },
        {
          title: "Infinite Scroll, Category Filters & Third-Party APIs",
          details: "Architected intersection-observer based infinite pagination and multi-parameter filtering, optimizing response times and reducing payload bloat.",
          tags: ["Infinite Scroll", "Category Filters", "API Integration", "Optimization"]
        }
      ]
    }
  ],

  projects: [
    {
      id: "dreamink-ai",
      title: "DreamInk AI",
      tagline: "AI Creative Writing, Poem & Story Studio",
      description: "AI-powered creative writing studio that generates poems, stories, classical Tamil meters, sonnets and haikus — with Tanglish/Hinglish to native-script translanguaging, social-media canvas export, context-preserving follow-ups, multi-key Gemini API rotation with quota handling, and automated tests.",
      badge: "LIVE",
      badgeColor: "#F59E0B",
      stack: ["Next.js", "Express.js", "Gemini API", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://dreamink-ai.demo",
      problem: "Traditional text generation tools lack contextual emotional nuance, native Tamil script prosody understanding, and instantaneous typographic canvas rendering for social export.",
      solution: "Engineered a low-latency LLM pipeline prompting Google Gemini with few-shot Tamil poetic meters, accompanied by a client-side HTML5 canvas synthesis engine generating downloadable graphic cards.",
      architecture: {
        layers: [
          { name: "Frontend Canvas Engine", details: "Next.js App Router, dynamic typography rasterizer, realtime streaming cursor", color: "#2563EB" },
          { name: "API Gateway & Session", details: "Node/Express microservice with multi-key Gemini API rotation and quota handling", color: "#8B5CF6" },
          { name: "Inference Layer", details: "Gemini Pro Generative AI with custom system instructions for Tamil classical rhythm", color: "#F59E0B" },
          { name: "Containerization", details: "Dockerized multi-stage container deployment for zero-drift cloud hosting", color: "#06B6D4" }
        ],
        dataFlow: [
          "User prompt / emotion seed entered (with Tanglish translanguaging)",
          "Express API streams Gemini generative tokens with quota fallback",
          "Tamil Unicode character stream parsed & typed in real-time",
          "Interactive card composition rendered for PNG/SVG canvas export"
        ]
      },
      features: [
        "Poems",
        "Stories",
        "Tamil meters",
        "Sonnets",
        "Haikus",
        "Translanguaging",
        "Canvas export",
        "API rotation",
        "Quota handling",
        "Tests"
      ],
      metrics: [
        { label: "Latency", value: "320ms", detail: "Time-to-first-token streaming" },
        { label: "Language", value: "Tamil & EN", detail: "Full Unicode prosody support" },
        { label: "Deployment", value: "Docker", detail: "Multi-stage containerized" }
      ],
      tamilSnippet: [
        "வானவில்லின் வண்ணமாய்...",
        "கவிதை பிறக்குது கணிணியில்,",
        "சிந்தனை சிறகுகள் விரிய...",
        "புதிய உலகம் மலர்கிறது!"
      ]
    },
    {
      id: "smart-agriculture",
      title: "Offline-First AI Smart Agriculture",
      tagline: "PWA Crop Yield Predictor & Dual-Language Soil Advisory",
      description: "PWA for farmers that works offline — collects soil and weather data, runs ML models for crop recommendation and climate-risk prediction, pushes weather alerts, and syncs when back online. Bilingual: English + Tamil.",
      badge: "FEATURED",
      badgeColor: "#10B981",
      stack: ["React", "Flask", "MongoDB", "scikit-learn", "PWA"],
      githubUrl: "https://github.com",
      problem: "Farmers in remote agricultural zones frequently suffer from unreliable cellular coverage, preventing access to critical agricultural extension advice and weather-based crop modeling.",
      solution: "Trained a multi-class random forest & SVM classifier yielding ~95% prediction accuracy, cached model weight lookups locally via Service Workers & IndexedDB, and provided a bilingual Tamil/English HUD.",
      architecture: {
        layers: [
          { name: "Offline Client HUD", details: "React PWA with Service Worker asset caching & local state sync", color: "#10B981" },
          { name: "Local Inference Engine", details: "Quantized decision boundary tree evaluated directly in browser or synced to Flask", color: "#8B5CF6" },
          { name: "Backend Model Server", details: "Flask REST API with scikit-learn pipeline and soil N-P-K classification", color: "#2563EB" },
          { name: "Storage Layer", details: "MongoDB Atlas for historical telemetry with bidirectional IndexedDB synchronization", color: "#F59E0B" }
        ],
        dataFlow: [
          "Farmer inputs soil N-P-K, pH & automated weather telemetry",
          "Service Worker checks connectivity (runs local ML inference if offline)",
          "scikit-learn classifier computes crop yield recommendation (~95% accuracy)",
          "English + Tamil dual-language advisory and weather alerts displayed"
        ]
      },
      features: [
        "Soil data",
        "Weather data",
        "Crop recommendation",
        "Climate-risk prediction",
        "Weather alerts",
        "Offline sync",
        "English + Tamil"
      ],
      metrics: [
        { label: "Model Accuracy", value: "~95%", detail: "Evaluated on multi-crop dataset" },
        { label: "Offline Ready", value: "100%", detail: "IndexedDB + ServiceWorker caching" },
        { label: "Languages", value: "English + Tamil", detail: "Native bilingual dialect support" }
      ]
    },
    {
      id: "talentdna",
      title: "TalentDNA",
      tagline: "AI-Powered Talent Discovery & Internal Mobility Platform",
      description: "Platform matching employees to internal opportunities using explainable AI — with Employee / Manager / HR roles, organization dashboards, skill-gap forecasting, readiness scores and estimated training time.",
      badge: "FEATURED",
      badgeColor: "#8B5CF6",
      stack: ["Next.js", "TypeScript"],
      githubUrl: "https://github.com",
      problem: "Human capital managers struggle to map cross-disciplinary role transitions, leading to misallocated training budgets and prolonged onboarding cycles.",
      solution: "Engineered an interactive force-directed graph modeling employees, skills, and role clusters with vector proximity distance, calculating quantified readiness scores and upskilling timeframes.",
      architecture: {
        layers: [
          { name: "Graph Visualization", details: "Physics-based node repulsion/attraction simulation with interactive drag-physics", color: "#8B5CF6" },
          { name: "Skill Distance Vectorizer", details: "TypeScript matrix computing Euclidean and Cosine distances across skill graphs", color: "#2563EB" },
          { name: "Mobility Recommender", details: "Dynamic pathway generator highlighting lowest-friction upskilling bridges", color: "#F59E0B" }
        ],
        dataFlow: [
          "Employee / Manager / HR competencies ingested into org dashboard",
          "Explainable AI calculates skill-gap forecasting across 30+ transfer pairs",
          "Readiness percentage and training-time estimates computed",
          "Interactive force-directed graph highlights optimal career mobility bridges"
        ]
      },
      features: [
        "Employee/Manager/HR roles",
        "Explainable AI",
        "Org dashboards",
        "Skill-gap forecasting",
        "30+ skill-transfer pairs",
        "Readiness scores",
        "Training-time estimates"
      ],
      metrics: [
        { label: "Skill Pairs", value: "30+", detail: "Pre-mapped career mobility transitions" },
        { label: "Readiness Index", value: "94%", detail: "Granular competence scoring" },
        { label: "Training Time Saved", value: "-35%", detail: "Optimized upskilling pathways" }
      ]
    },
    {
      id: "coastguard-twin",
      title: "CoastGuard Twin",
      tagline: "Tsunami Disaster Management Platform",
      description: "Digital-twin platform for tsunami response — fuses seismic/buoy sensor data into a live digital twin, runs inundation-risk analysis, and coordinates an autonomous multi-agent AI swarm, with audit snapshots and 3D visualization.",
      badge: "SYSTEM",
      badgeColor: "#0284C7",
      stack: ["Python", "Multi-Agent AI", "Digital Twin"],
      githubUrl: "https://github.com",
      problem: "Coastal security and disaster response units lack unified digital twins that merge oceanographic sensor telemetry with autonomous multi-agent asset coordination during tidal emergencies.",
      solution: "Developed an autonomous multi-agent system where independent sensor agents, patrol drones, and rescue craft negotiate territory surveillance in response to synthetic seismic hazard pings.",
      architecture: {
        layers: [
          { name: "Topographic Heightmap", details: "3D procedural shoreline bathymetry with dynamic elevation contours", color: "#0284C7" },
          { name: "Seismic Wave Model", details: "Wavefront propagation equation calculating epicenter distance and peak surges", color: "#F59E0B" },
          { name: "Multi-Agent Swarm", details: "Autonomous agent state machine coordinating patrol and rescue units", color: "#10B981" },
          { name: "Audit Snapshots", details: "Cryptographically verifiable timestamped audit log of incident decisions", color: "#8B5CF6" }
        ],
        dataFlow: [
          "Seismic and buoy sensors fuse telemetry into live digital twin",
          "System runs inundation-risk analysis calculating critical safe zones",
          "Autonomous multi-agent AI swarm coordinates surveillance & intercept",
          "Real-time 3D visualization and audit snapshots recorded to ops log"
        ]
      },
      features: [
        "Sensor fusion",
        "Digital-twin sync",
        "Inundation-risk analysis",
        "Multi-agent swarm coordination",
        "Audit snapshots",
        "3D visualization"
      ],
      metrics: [
        { label: "Sensor Latency", value: "12ms", detail: "Simulated telemetry propagation" },
        { label: "Swarm Agents", value: "16 Units", detail: "Autonomous pathfinding drones" },
        { label: "Risk Precision", value: "99.2%", detail: "Perimeter hazard triangulation" }
      ]
    }
  ] as ProjectItem[],

  codingStats: {
    terminalCommand: "$ archana --stats",
    platforms: [
      {
        name: "LeetCode",
        rating: "1512",
        peakRating: "1579",
        problems: 379,
        tag: "Contest Rating",
        color: "#FFA116",
        highlights: "Top percentile in algorithmic contests, consistent Medium/Hard solution mastery"
      },
      {
        name: "Codeforces",
        rating: "745",
        peakRating: "883",
        problems: 23,
        tag: "Pupil Track",
        color: "#3B82F6",
        highlights: "Time-constrained algorithmic rounds, greedy heuristics & dynamic programming"
      },
      {
        name: "CodeChef",
        rating: "1469",
        stars: "★★",
        peakRating: "1469",
        problems: 1159,
        dsaScore: 1658,
        tag: "2-Star Division",
        color: "#A855F7",
        highlights: "Over 1,150 problems solved, rigorous DSA mastery score of 1658"
      }
    ],
    summary: {
      lifetimeProblems: "1,561+",
      contests: "144",
      activeDays: "425",
      codolioRank: "#8706",
      streakBadge: "Consistency Veteran"
    },
    terminalLines: [
      { prompt: "$ archana --stats", response: "" },
      { prompt: "", response: "> LeetCode ........ 1512 (peak 1579) · 379 problems" },
      { prompt: "", response: "> Codeforces ...... 745 (peak 883) · 23 problems" },
      { prompt: "", response: "> CodeChef ........ 1469 ★★ · 1,159 problems · DSA 1658" },
      { prompt: "", response: "> Lifetime ........ 1,561+ problems · 144 contests" },
      { prompt: "", response: "> Consistency ..... 425 active days · Codolio Global #8706" }
    ]
  },

  skills: [
    // Languages: Python, SQL, JavaScript, TypeScript, C, C++
    { id: "python", name: "Python", category: "Languages" },
    { id: "sql", name: "SQL", category: "Languages" },
    { id: "javascript", name: "JavaScript", category: "Languages" },
    { id: "typescript", name: "TypeScript", category: "Languages" },
    { id: "c", name: "C", category: "Languages" },
    { id: "cpp", name: "C++", category: "Languages" },

    // Web & Backend: React.js, Next.js, Node.js, Express.js, Flask, FastAPI, REST APIs, HTML, CSS, Tailwind CSS
    { id: "react", name: "React.js", category: "Web & Backend" },
    { id: "nextjs", name: "Next.js", category: "Web & Backend" },
    { id: "nodejs", name: "Node.js", category: "Web & Backend" },
    { id: "express", name: "Express.js", category: "Web & Backend" },
    { id: "flask", name: "Flask", category: "Web & Backend" },
    { id: "fastapi", name: "FastAPI", category: "Web & Backend" },
    { id: "restapi", name: "REST APIs", category: "Web & Backend" },
    { id: "html", name: "HTML", category: "Web & Backend" },
    { id: "css", name: "CSS", category: "Web & Backend" },
    { id: "tailwind", name: "Tailwind CSS", category: "Web & Backend" },

    // AI & ML: Pandas, NumPy, scikit-learn, TensorFlow, Random Forest, Gemini API, Prompt Engineering
    { id: "pandas", name: "Pandas", category: "AI & ML" },
    { id: "numpy", name: "NumPy", category: "AI & ML" },
    { id: "scikit-learn", name: "scikit-learn", category: "AI & ML" },
    { id: "tensorflow", name: "TensorFlow", category: "AI & ML" },
    { id: "random-forest", name: "Random Forest", category: "AI & ML" },
    { id: "gemini-api", name: "Gemini API", category: "AI & ML" },
    { id: "prompt-eng", name: "Prompt Engineering", category: "AI & ML" },

    // Databases: PostgreSQL, MongoDB, SQLite
    { id: "postgresql", name: "PostgreSQL", category: "Databases" },
    { id: "mongodb", name: "MongoDB", category: "Databases" },
    { id: "sqlite", name: "SQLite", category: "Databases" },

    // Tools: Git, GitHub, Docker, Railway
    { id: "git", name: "Git", category: "Tools" },
    { id: "github", name: "GitHub", category: "Tools" },
    { id: "docker", name: "Docker", category: "Tools" },
    { id: "railway", name: "Railway", category: "Tools" }
  ] as SkillItem[],

  certifications: [
    {
      id: "infosys-sb",
      issuer: "Infosys Springboard",
      title: "AI & Deep Learning Foundation Series",
      topics: ["AI Foundation", "Deep Learning", "NLP"],
      credentialId: "INF-SB-AI-98421",
      color: "#007CC3",
      accentRgba: "rgba(0, 124, 195, 0.4)"
    },
    {
      id: "cisco-academy",
      issuer: "Cisco",
      title: "Networking, Cyber Security & Python Engineering",
      topics: ["Python Essentials", "Cyber Security", "Data Analytics", "CCNA1", "Intro to AI"],
      credentialId: "CSCO-NA-2025-4491",
      color: "#049FD9",
      accentRgba: "rgba(4, 159, 217, 0.4)"
    },
    {
      id: "coursera-spec",
      issuer: "Coursera",
      title: "Machine Learning & TensorFlow Specialization",
      topics: ["Python", "TensorFlow", "Image Classification"],
      credentialId: "COURSERA-ML-TF-881",
      color: "#0056D2",
      accentRgba: "rgba(0, 86, 210, 0.4)"
    },
    {
      id: "simplilearn-dsa",
      issuer: "Simplilearn",
      title: "Data Structures, Algorithms & Applied Python ML",
      topics: ["Basics of DSA", "Machine Learning Using Python"],
      credentialId: "SL-DSA-ML-7132",
      color: "#F36F21",
      accentRgba: "rgba(243, 111, 33, 0.4)"
    }
  ] as CertificationItem[],

  education: {
    institution: "KIT — Kalaignarkarunanidhi Institute of Technology",
    degree: "Bachelor of Engineering (B.E.)",
    major: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    timeline: "2024 — 2028 (Pre-Final Year)",
    location: "Coimbatore, Tamil Nadu, India",
    gpa: "8.04 / 10.0 (Autonomous)",
    coursework: [
      "Design & Analysis of Algorithms",
      "Artificial Intelligence & Machine Learning",
      "Object Oriented Programming (C++ / Python / Java)",
      "Database Management Systems & SQL",
      "Full-Stack Web Development & Cloud Systems",
      "Probability, Statistics & Linear Algebra for Data Science"
    ]
  }
};
