import { Target, Eye, Heart, Award } from "lucide-react";
import FloatingShape from "@/components/three/FloatingShape";
import Reveal from "@/components/ui/Reveal";

const VALUES = [
  { icon: Target, title: "Outcome over output", desc: "We measure work by what it moves for your business, not how many deliverables it produced." },
  { icon: Eye, title: "Craft is non-negotiable", desc: "Every pixel, transition and line of copy gets the same scrutiny as the architecture underneath it." },
  { icon: Heart, title: "Honest scoping", desc: "We tell you what a project actually takes before you sign anything, not after." },
  { icon: Award, title: "Built to last", desc: "Code and design decisions are made for the team that maintains this after we hand it over." },
];

const TIMELINE = [
  {
    title: "JAZ-X Founded",
    desc: "JAZ-X was established with a vision to deliver innovative AI-powered software solutions, modern websites, and digital products for businesses worldwide.",
  },
  {
    title: "AI & Automation",
    desc: "Developing intelligent AI solutions, business automation, custom software, and scalable digital systems for startups and enterprises.",
  },
  {
    title: "Global Collaboration",
    desc: "Working with clients across different industries to build high-quality web, mobile, and AI-powered applications.",
  },
  {
    title: "Innovation First",
    desc: "Every project is built with modern technologies, clean architecture, and a focus on performance, security, and user experience.",
  },
  {
    title: "Our Vision",
    desc: "To become a globally recognized AI software house known for innovation, creativity, and delivering future-ready digital solutions.",
  },
];

const STATS = [
  { value: "50+", label: "Projects shipped" },
  { value: "6", label: "Core disciplines" },
  { value: "94%", label: "Client retention" },
  { value: "12", label: "Countries served" },
];

export default function AboutPage() {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="relative px-6 md:px-16 max-w-5xl mx-auto pb-24">
        <Reveal>
          <span className="text-xs text-secondary tracking-widest uppercase font-medium">About JAZ-X</span>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-3xl">
            We build the digital products that carry a business forward.
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            JAZ-X is a full-service digital studio — websites, apps, games,
            SEO, QA and growth marketing, built by people who treat every discipline as a
            craft rather than a checkbox.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-24 border-y border-white/10 py-14">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div>
              <p className="text-4xl font-semibold text-gradient mb-1">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Mission / Vision */}
      <section className="relative px-6 md:px-16 max-w-6xl mx-auto py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-5">Mission &amp; Vision</h2>
            <p className="text-white/50 leading-relaxed mb-4">
              Our mission is to give growing businesses access to the same level of digital
              craft that's usually reserved for venture-backed budgets — without the bloat
              of a traditional agency retainer.
            </p>
            <p className="text-white/50 leading-relaxed">
              Our vision is a studio where design, engineering and growth strategy sit at
              the same table from day one, so nothing gets built twice.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-72 rounded-2xl border border-white/10 overflow-hidden">
            <FloatingShape type="octahedron" color="#6C63FF" />
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="relative px-6 md:px-16 max-w-6xl mx-auto py-24">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-14">What we hold to</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.02] h-full">
                <v.icon size={20} color="#00E5FF" className="mb-4" />
                <h3 className="text-white font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 md:px-16 max-w-4xl mx-auto py-24">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-14"> Our Vision & Roadmap</h2>
        </Reveal>
        <div className="relative border-l border-white/10 ml-3">
          {TIMELINE.map((t, i) => (
  <Reveal key={t.title} delay={i * 0.06}>
    <div className="relative pl-10 pb-12 last:pb-0">
      <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-gradient-primary" />

      <h3 className="text-xl font-semibold text-white mb-3">
        {t.title}
      </h3>

      <p className="text-sm text-white/50 max-w-md leading-relaxed">
        {t.desc}
      </p>
    </div>
  </Reveal>
))}
        </div>
      </section>

      {/* Technologies */}
      <section className="relative px-6 md:px-16 max-w-6xl mx-auto py-24">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-10">Technologies we build with</h2>
          <div className="flex flex-wrap gap-3">
            {[
  "OpenAI",
  "Claude AI",
  "Google Gemini",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Flutter",
  "React Native",
  "Three.js",
  "GSAP",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Git",
  "GitHub"
].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/60 bg-white/[0.02]">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
