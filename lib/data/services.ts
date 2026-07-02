export interface ServiceData {
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  description: string;
  shapeType: "torus" | "box" | "octahedron" | "capsule" | "torusKnot" | "sphere";
  offerings: string[];
  features: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  techStack: string[];
}

export const services: ServiceData[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDesc: "Custom-built, high-performance sites engineered for scale and speed.",
    tagline: "Websites built to convert, not just exist.",
    description:
      "We design and build custom websites, landing pages, ecommerce storefronts, CMS-driven platforms and corporate sites that load fast, rank well and turn visitors into customers. Every build starts from your business goals, not a template library.",
    shapeType: "box",
    offerings: ["Custom Websites", "Landing Pages", "Ecommerce", "CMS Development", "Corporate Sites", "Portfolio Sites"],
    features: [
      { title: "Custom Websites", desc: "Fully bespoke builds with information architecture designed around how your customers actually decide." },
      { title: "Landing Pages", desc: "Conversion-focused single pages built for paid campaigns and product launches." },
      { title: "Ecommerce", desc: "Storefronts with fast checkout flows, inventory sync and payment integrations." },
      { title: "CMS Development", desc: "Headless or traditional CMS setups your team can edit without touching code." },
      { title: "Corporate Sites", desc: "Multi-department sites with clear governance for content at scale." },
      { title: "Portfolio Sites", desc: "Visual-first sites for studios, agencies and individual creators." },
    ],
    process: [
      { step: "Discovery", desc: "We map your audience, competitors and technical constraints before any design starts." },
      { step: "Architecture", desc: "Sitemap, content model and component library are defined and agreed." },
      { step: "Design", desc: "High-fidelity screens with motion specs, built in your brand system." },
      { step: "Build", desc: "Component-based development with staging environments for live review." },
      { step: "QA & Launch", desc: "Cross-browser, performance and accessibility testing before go-live." },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity / Contentful", "Vercel", "Shopify", "Stripe"],
  },
  {
    slug: "app-development",
    title: "App Development",
    shortDesc: "Native and cross-platform apps with fluid, tactile interfaces.",
    tagline: "Apps people actually want to open twice.",
    description:
      "We build Android, iOS and cross-platform apps with Flutter and React Native, plus fully native builds when performance demands it. Interfaces are engineered for touch — fast, tactile, and consistent across devices.",
    shapeType: "capsule",
    offerings: ["Android", "iOS", "Flutter", "React Native", "Native Development", "App Maintenance"],
    features: [
      { title: "Android Development", desc: "Kotlin-based apps built to Material guidelines and device fragmentation realities." },
      { title: "iOS Development", desc: "Swift-native apps that feel at home on Apple hardware and pass App Store review cleanly." },
      { title: "Flutter", desc: "Single codebase, native performance, shipped to both stores simultaneously." },
      { title: "React Native", desc: "Shared logic with your web stack where it speeds up delivery without hurting feel." },
      { title: "Native Development", desc: "Fully platform-native builds for apps with heavy device integration or performance needs." },
      { title: "App Maintenance", desc: "OS updates, crash monitoring and feature iteration after launch." },
    ],
    process: [
      { step: "Discovery", desc: "User flows, platform choice and technical feasibility are scoped together." },
      { step: "Prototyping", desc: "Clickable prototypes validate core flows before a line of production code is written." },
      { step: "Development", desc: "Sprint-based builds with weekly demos on real devices." },
      { step: "Testing", desc: "Device lab testing across OS versions, screen sizes and network conditions." },
      { step: "Launch & Support", desc: "Store submission handled end-to-end, with monitoring after release." },
    ],
    techStack: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase", "GraphQL", "App Store Connect", "Google Play Console"],
  },
  {
    slug: "game-development",
    title: "Game Development",
    shortDesc: "Immersive 2D, 3D and AR/VR experiences built on Unity and Unreal.",
    tagline: "Games engineered for feel first.",
    description:
      "We build mobile games, PC titles, and AR/VR experiences in Unity and Unreal Engine, from prototype to live-ops. We treat game feel — input latency, animation timing, feedback loops — as the core deliverable, not an afterthought.",
    shapeType: "octahedron",
    offerings: ["Unity", "Unreal Engine", "Mobile Games", "PC Games", "AR Experiences", "VR Experiences"],
    features: [
      { title: "Unity Development", desc: "2D and 3D titles built for mobile and cross-platform release." },
      { title: "Unreal Engine", desc: "High-fidelity 3D experiences for PC and console-grade visuals." },
      { title: "Mobile Games", desc: "Free-to-play and premium titles tuned for retention and monetization balance." },
      { title: "PC Games", desc: "Full-scope titles from vertical slice to Steam release." },
      { title: "AR Experiences", desc: "Mobile AR built on ARKit and ARCore for marketing and product visualization." },
      { title: "VR Experiences", desc: "Immersive builds for Quest and PCVR with comfort-first locomotion design." },
    ],
    process: [
      { step: "Concept", desc: "Core loop and game feel are prototyped before scope is committed." },
      { step: "Vertical Slice", desc: "One polished level or mechanic proves the fun before full production." },
      { step: "Production", desc: "Full asset pipeline, level design and systems build-out." },
      { step: "Playtesting", desc: "Structured playtests drive balance and difficulty tuning." },
      { step: "Launch & Live-Ops", desc: "Store submission, patch cadence and content updates post-launch." },
    ],
    techStack: ["Unity", "Unreal Engine 5", "C#", "C++", "ARKit", "ARCore", "Photon", "PlayFab"],
  },
  {
    slug: "seo",
    title: "SEO",
    shortDesc: "Technical and content strategy that compounds organic visibility.",
    tagline: "Rankings built to compound, not spike.",
    description:
      "We run technical audits, keyword research, on-page optimization and off-page authority building to grow organic traffic that keeps growing after we're done. No black-hat shortcuts, no ranking penalties waiting to happen.",
    shapeType: "sphere",
    offerings: ["Keyword Research", "Technical SEO", "Local SEO", "On-Page SEO", "Off-Page SEO", "Analytics & Reporting"],
    features: [
      { title: "Keyword Research", desc: "Demand and intent mapping so content targets what people actually search." },
      { title: "Technical SEO", desc: "Site speed, crawlability, structured data and Core Web Vitals fixed at the source." },
      { title: "Local SEO", desc: "Google Business Profile, citations and local landing pages for map-pack visibility." },
      { title: "On-Page SEO", desc: "Content structure, internal linking and metadata built for both readers and crawlers." },
      { title: "Off-Page SEO", desc: "Editorial link building and digital PR that builds real domain authority." },
      { title: "Analytics & Reporting", desc: "Monthly reporting tied to revenue impact, not vanity ranking screenshots." },
    ],
    process: [
      { step: "Audit", desc: "Full technical and content audit benchmarks where you stand today." },
      { step: "Strategy", desc: "Keyword map and content calendar built around real search demand." },
      { step: "Implementation", desc: "Technical fixes and on-page changes shipped in priority order." },
      { step: "Content & Links", desc: "Ongoing content production paired with authority-building outreach." },
      { step: "Report & Refine", desc: "Monthly reporting drives the next cycle of priorities." },
    ],
    techStack: ["Google Search Console", "Ahrefs", "Screaming Frog", "GA4", "Looker Studio", "Schema.org"],
  },
  {
    slug: "app-testing",
    title: "App Testing & QA",
    shortDesc: "Automation and manual coverage that catches what breaks trust.",
    tagline: "Every release, verified before your users find the bugs.",
    description:
      "We provide manual and automated testing, performance profiling, security testing and regression coverage so releases ship with confidence. QA is built into your pipeline, not bolted on before launch.",
    shapeType: "torus",
    offerings: ["Manual Testing", "Automation Testing", "Performance Testing", "Security Testing", "Regression Testing", "Bug Tracking"],
    features: [
      { title: "Manual Testing", desc: "Exploratory and scripted testing that catches what automation misses." },
      { title: "Automation Testing", desc: "CI-integrated test suites that run on every pull request." },
      { title: "Performance Testing", desc: "Load and stress testing to find breaking points before your users do." },
      { title: "Security Testing", desc: "Vulnerability scanning and penetration testing basics baked into every cycle." },
      { title: "Regression Testing", desc: "Full coverage re-runs so new features don't quietly break old ones." },
      { title: "Bug Tracking & Reporting", desc: "Clear, reproducible bug reports routed straight into your workflow." },
    ],
    process: [
      { step: "Test Planning", desc: "Test cases mapped to your critical user flows and edge cases." },
      { step: "Environment Setup", desc: "Staging environments and device labs configured to match production." },
      { step: "Execution", desc: "Manual and automated passes run against every release candidate." },
      { step: "Reporting", desc: "Bugs triaged by severity with reproduction steps your team can act on." },
      { step: "Regression", desc: "Fixes re-verified and full suites re-run before sign-off." },
    ],
    techStack: ["Playwright", "Cypress", "Selenium", "JMeter", "BrowserStack", "Jira", "TestRail"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortDesc: "Campaigns and content systems that turn attention into demand.",
    tagline: "Content systems that compound attention into demand.",
    description:
      "We run organic content and paid campaigns across Facebook, Instagram, TikTok, LinkedIn and YouTube, backed by Meta and Google Ads management. Every campaign is tied to a demand goal, not just impressions.",
    shapeType: "torusKnot",
    offerings: ["Facebook", "Instagram", "TikTok", "LinkedIn", "YouTube", "Meta & Google Ads"],
    features: [
      { title: "Content Strategy", desc: "Platform-native content calendars built around what each audience actually engages with." },
      { title: "Paid Social", desc: "Meta and TikTok ad management with creative testing built into the cadence." },
      { title: "LinkedIn Growth", desc: "B2B content and outreach systems for founder and company pages." },
      { title: "YouTube Production", desc: "Long and short-form video built for retention, not just views." },
      { title: "Google Ads", desc: "Search and display campaigns tied directly to pipeline and revenue targets." },
      { title: "Community Management", desc: "Response and moderation that protects brand voice at scale." },
    ],
    process: [
      { step: "Audit", desc: "Current channels, audience and competitor benchmarking." },
      { step: "Strategy", desc: "Content pillars and campaign calendar built around demand goals." },
      { step: "Production", desc: "Content and ad creative produced on a consistent cadence." },
      { step: "Distribution", desc: "Organic posting paired with paid amplification where it compounds fastest." },
      { step: "Optimize", desc: "Weekly performance reviews reallocate spend to what's working." },
    ],
    techStack: ["Meta Business Suite", "TikTok Ads Manager", "Google Ads", "Hootsuite", "Sprout Social", "CapCut"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
