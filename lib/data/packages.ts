export interface PackageData {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  featured?: boolean;
  features: string[];
  timeline: string;
  support: string;
  technologies: string;
}

export const packages: PackageData[] = [
  {
    name: "Launch",
    price: "$499",
    period: "starting from",
    bestFor: "Perfect for startups, personal brands & small businesses",
    features: [
      "Responsive Business Website",
      "Modern UI/UX Design",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "Google Maps & Social Media",
      "Free SSL & Hosting Setup",
      "30 Days Free Support",
    ],
    timeline: "1–2 Weeks",
    support: "Email & WhatsApp Support",
    technologies: "Next.js • React • Tailwind CSS • Vercel",
  },

  {
    name: "Business Pro",
    price: "$1,499",
    period: "starting from",
    bestFor: "Growing businesses looking for advanced digital solutions",
    featured: true,
    features: [
      "Custom Website or Web Application",
      "Admin Dashboard",
      "AI Chatbot Integration",
      "Database Integration",
      "Advanced SEO",
      "Performance Optimization",
      "Analytics Integration",
      "90 Days Premium Support",
    ],
    timeline: "3–5 Weeks",
    support: "Priority Email & WhatsApp",
    technologies:
      "Next.js • React • Node.js • MongoDB • OpenAI • GSAP • Three.js",
  },

  {
    name: "AI Enterprise",
    price: "Custom Quote",
    period: "contact us",
    bestFor: "Large businesses & enterprises requiring custom AI solutions",
    features: [
      "AI Software Development",
      "Custom SaaS Platforms",
      "Mobile Applications",
      "Cloud Infrastructure",
      "Business Process Automation",
      "Dedicated Development Team",
      "Unlimited Revisions",
      "12 Months Priority Support",
    ],
    timeline: "Based on Project Scope",
    support: "Dedicated Project Manager",
    technologies:
      "Python • AI • Cloud • Docker • PostgreSQL • AWS • APIs",
  },
];

export const comparisonRows = [
  {
    feature: "Responsive Design",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Custom UI/UX",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Admin Dashboard",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "AI Integration",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "SEO",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Enterprise",
  },
  {
    feature: "Cloud Deployment",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Dedicated Team",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "Support",
    starter: "30 Days",
    professional: "90 Days",
    enterprise: "12 Months",
  },
];