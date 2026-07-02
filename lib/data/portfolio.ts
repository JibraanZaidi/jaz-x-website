export interface Project {
  slug: string;
  title: string;
  category: "Website" | "App" | "Game" | "SEO" | "Marketing";
  year: string;
  summary: string;
  color: string;
}

export const projects: Project[] = [
  { slug: "aurora-fintech", title: "Aurora Fintech Platform", category: "Website", year: "2026", summary: "A full rebuild of a fintech dashboard with real-time data visualization and a 40% faster load time.", color: "#6C63FF" },
  { slug: "pulse-fitness-app", title: "Pulse Fitness App", category: "App", year: "2025", summary: "Cross-platform fitness app with live workout tracking, hitting 100K downloads in its first quarter.", color: "#00E5FF" },
  { slug: "driftline", title: "Driftline", category: "Game", year: "2025", summary: "A mobile racing title built in Unity with physics-based drifting, published to iOS and Android.", color: "#FF4FD8" },
  { slug: "northgate-retail", title: "Northgate Retail SEO", category: "SEO", year: "2026", summary: "Technical SEO overhaul that took organic traffic from 12K to 87K monthly sessions in eight months.", color: "#6C63FF" },
  { slug: "vantage-social", title: "Vantage Social Campaign", category: "Marketing", year: "2025", summary: "A cross-platform launch campaign generating 4.2M impressions and a 6.1x return on ad spend.", color: "#00E5FF" },
  { slug: "orbit-commerce", title: "Orbit Commerce", category: "Website", year: "2025", summary: "Headless ecommerce build with sub-second checkout and a 22% lift in conversion rate.", color: "#FF4FD8" },
  { slug: "meridian-vr", title: "Meridian VR Experience", category: "Game", year: "2026", summary: "A VR product showcase built for Quest, used at three international trade shows.", color: "#6C63FF" },
  { slug: "haven-app", title: "Haven Booking App", category: "App", year: "2026", summary: "Native iOS and Android booking app with real-time availability sync across 200+ locations.", color: "#00E5FF" },
];

export const categories = ["All", "Website", "App", "Game", "SEO", "Marketing"] as const;
