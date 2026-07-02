import { QuickActionItem } from "./types";

export const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "website",
    label: "Website Development",
    description: "Custom sites built on Next.js & React",
    icon: "Globe",
    prompt: "Tell me about website development",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    description: "iOS & Android with Flutter or RN",
    icon: "Smartphone",
    prompt: "Tell me about mobile app development",
  },
  {
    id: "ai",
    label: "AI Solutions",
    description: "Chatbots, automation & custom AI",
    icon: "Bot",
    prompt: "Tell me about AI solutions",
  },
  {
    id: "game",
    label: "Game Development",
    description: "Unity & Unreal Engine builds",
    icon: "Gamepad2",
    prompt: "Tell me about game development",
  },
  {
    id: "seo",
    label: "SEO & Marketing",
    description: "Grow your traffic & visibility",
    icon: "TrendingUp",
    prompt: "Tell me about SEO and marketing",
  },
  {
    id: "pricing",
    label: "Get Pricing",
    description: "See how we structure projects",
    icon: "Briefcase",
    prompt: "What is your pricing",
  },
  {
    id: "consultation",
    label: "Book Consultation",
    description: "Talk to a JAZ-X expert",
    icon: "Phone",
    prompt: "I want to book a consultation",
  },
];

interface KnowledgeEntry {
  keywords: string[];
  response: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ["hello", "hi", "hey", "salam", "assalam", "greetings"],
    response:
      "👋 Hey there! Great to meet you. I'm JAZ-X AI — ask me about websites, mobile apps, AI products, games, or anything else you're building. Where should we start?",
  },
  {
    keywords: ["ecommerce", "e-commerce", "online store", "shop", "shopify"],
    response:
      "🛒 We build full ecommerce experiences — product catalogs, cart & checkout, payment gateway integration, and admin dashboards, all on a fast Next.js storefront. We can also connect Shopify or build a fully custom store depending on your scale.",
  },
  {
    keywords: ["landing page", "landing"],
    response:
      "🚀 High-converting landing pages are one of our specialties — sharp copy, motion-driven sections, and a design built around a single call to action. Typical turnaround is 5–7 days.",
  },
  {
    keywords: ["portfolio"],
    response:
      "🎨 We design portfolio sites that put your work first — clean galleries, smooth case-study pages, and a layout that feels unmistakably yours rather than a template.",
  },
  {
    keywords: ["business website", "company website", "corporate"],
    response:
      "🏢 For business websites we focus on trust and clarity — clear service pages, credibility sections, and a structure that's easy for your team to update long-term.",
  },
  {
    keywords: ["website", "web development", "web design", "site"],
    response:
      "🌐 We build premium websites end-to-end — from UI/UX design to production deployment. Every build uses Next.js and TypeScript for speed and reliability, styled with Tailwind and animated with Framer Motion. What kind of site are you thinking about — business, ecommerce, portfolio, or something custom?",
  },
  {
    keywords: ["next.js", "nextjs", "react"],
    response:
      "⚛️ Next.js and React are our core stack. We use the App Router, server components, and TypeScript throughout, which gives you fast load times, strong SEO, and code that's easy to extend later.",
  },
  {
    keywords: ["chatbot", "chat bot"],
    response:
      "🤖 We build AI chatbots ranging from simple keyword-based assistants like me, all the way up to full LLM-powered assistants connected to your data. Want a quick one for lead capture, or a deeper AI-driven support agent?",
  },
  {
    keywords: ["automation", "workflow"],
    response:
      "⚙️ We set up automation for repetitive workflows — lead routing, email sequences, data syncing between tools, and custom internal dashboards that save your team hours every week.",
  },
  {
    keywords: ["custom software", "saas", "web app", "web application"],
    response:
      "💻 Beyond marketing sites, we build full custom software — SaaS platforms, internal tools, and web apps with authentication, databases, and dashboards, all engineered to scale.",
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "llm"],
    response:
      "🤖 On the AI side we build chatbots, workflow automation, recommendation systems, and custom integrations with models like GPT and Claude. This assistant itself can later be upgraded to run on a real LLM API. What kind of AI feature are you exploring?",
  },
  {
    keywords: ["flutter"],
    response:
      "📱 Flutter is a great choice when you need one codebase for both iOS and Android without sacrificing native-feeling performance. We use it for most cross-platform app builds.",
  },
  {
    keywords: ["react native"],
    response:
      "📱 React Native lets us share logic between your web app and mobile app when you're already on a React/Next.js stack — great for teams that want tight consistency across platforms.",
  },
  {
    keywords: ["mobile app", "ios", "android", "app development"],
    response:
      "📱 We design and build mobile apps for iOS and Android using Flutter or React Native depending on your needs — from MVPs to full production apps with backend integration.",
  },
  {
    keywords: ["unity"],
    response:
      "🎮 We use Unity for cross-platform 2D and 3D games — mobile, PC, and web builds included, with clean, optimized gameplay systems.",
  },
  {
    keywords: ["unreal"],
    response:
      "🎮 For high-fidelity 3D games we work in Unreal Engine — realistic rendering, advanced physics, and console/PC-grade performance.",
  },
  {
    keywords: ["game", "gaming"],
    response:
      "🎮 Our game development team works in Unity and Unreal Engine to build everything from mobile casual games to more ambitious 3D titles. What platform are you targeting?",
  },
  {
    keywords: ["seo", "search engine"],
    response:
      "📈 We handle technical SEO (site speed, structured data, semantic markup) alongside content strategy, so your site actually ranks — not just loads fast.",
  },
  {
    keywords: ["marketing", "ads", "advertising", "social media"],
    response:
      "📣 Our digital marketing services cover SEO, paid ads, and social media strategy — built to work alongside the sites and apps we develop, not as an afterthought.",
  },
  {
    keywords: ["price", "pricing", "cost", "budget", "how much", "quote"],
    response:
      "💼 Pricing depends on scope — a landing page, a full business website, and a custom SaaS platform all sit at very different price points. The best next step is a free consultation where we scope your project and give you a clear quote. Want me to help you book one?",
  },
  {
    keywords: ["timeline", "how long", "duration", "deadline"],
    response:
      "⏱️ Typical timelines: landing pages 5–7 days, full business websites 2–4 weeks, and custom apps or platforms 6–12+ weeks depending on complexity. We'll give you an exact timeline after scoping your project.",
  },
  {
    keywords: ["contact", "email", "phone number", "reach you", "get in touch"],
    response:
      "📞 You can reach the JAZ-X team through the contact section on this site or the WhatsApp button in the corner — or I can help you book a free consultation right now.",
  },
  {
    keywords: ["tech stack", "technology", "stack", "tools you use"],
    response:
      "🛠️ Our core stack: Next.js, TypeScript, Tailwind CSS, and Framer Motion for the frontend; Node.js and modern databases on the backend; Flutter/React Native for mobile; and Unity/Unreal for games. We pick tools based on what your project actually needs.",
  },
  {
    keywords: ["support"],
    response:
      "🛟 Every project ships with a support window, and we offer ongoing support plans afterward for updates, bug fixes, and new features as your product grows.",
  },
  {
    keywords: ["hosting"],
    response:
      "☁️ We deploy on modern platforms like Vercel and AWS, and can handle hosting setup, domain configuration, and CDN/performance tuning for you end-to-end.",
  },
  {
    keywords: ["maintenance"],
    response:
      "🔧 We offer ongoing maintenance plans — security updates, dependency upgrades, performance monitoring, and content updates — so your site stays fast and secure long after launch.",
  },
  {
    keywords: ["domain"],
    response:
      "🌍 We can help you register a domain, connect it to your hosting, and configure DNS and SSL correctly so everything's secure and live.",
  },
  {
    keywords: ["custom project", "custom", "bespoke", "unique idea"],
    response:
      "✨ If your idea doesn't fit a standard category, that's exactly the kind of project we like. Tell me a bit more about what you're building, or book a consultation and we'll scope it properly.",
  },
  {
    keywords: ["consultation", "book", "meeting", "call", "schedule", "talk to someone", "expert", "human"],
    response:
      "📞 I'd love to set that up. Head to the contact section or WhatsApp button to book a free consultation with a JAZ-X expert — they'll walk through your project in detail and give you a clear plan and quote.",
  },
];

const FALLBACK_RESPONSE =
  "Thank you for your question. A JAZ-X expert can answer this better. Would you like to schedule a free consultation?";

export function getAIResponse(userInput: string): string {
  const normalized = userInput.toLowerCase().trim();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.response;
    }
  }

  return FALLBACK_RESPONSE;
}

export const WELCOME_MESSAGE =
  "👋 Hi, I'm JAZ-X AI.\n\nI'm here to help you build websites, mobile apps, AI products and digital solutions.";
