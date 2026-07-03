import { ArrowRight, Sparkles, Zap, Cpu, Award, Users } from "lucide-react";
import HeroScene from "@/components/three/HeroScene";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import TestimonialMarquee from "@/components/ui/TestimonialMarquee";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { services } from "@/lib/data/services";
import { packages } from "@/lib/data/packages";
import { projects } from "@/lib/data/portfolio";
import Link from "next/link";

const WHY_US = [
  { icon: Zap, title: "Fast Delivery", desc: "Sprint-based builds with weekly demos, not a single reveal at the end." },
  { icon: Cpu, title: "AI-Powered Workflows", desc: "We use AI tooling to accelerate production without cutting craft." },
  { icon: Award, title: "Premium Quality", desc: "Every deliverable is built to hold up under an Awwwards-level review." },
  { icon: Users, title: "Dedicated Team", desc: "The people who scope your project are the people who build it." },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We map goals, audience and technical constraints before anything is designed." },
  { step: "02", title: "Design", desc: "High-fidelity screens and motion specs built inside your brand system." },
  { step: "03", title: "Development", desc: "Component-based builds with staging environments for live review." },
  { step: "04", title: "Testing", desc: "Cross-device, performance and accessibility QA before launch." },
  { step: "05", title: "Launch", desc: "Deployment, monitoring and a clean handover to your team." },
  { step: "06", title: "Support", desc: "Post-launch support windows and optional ongoing retainers." },
];

const SERVICE_ICONS: Record<string, keyof typeof import("lucide-react")> = {
  "website-development": "Code2",
  "app-development": "Smartphone",
  "game-development": "Gamepad2",
  seo: "TrendingUp",
  "app-testing": "ShieldCheck",
  "social-media-marketing": "Share2",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <HeroScene />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(108,99,255,0.12), transparent 60%)" }}
        />
        <div className="relative z-10 px-6 md:px-16 max-w-4xl">
  
          <h1 className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight mb-6">
            Building Digital Products
            <br />
            That Move <span className="text-gradient">Businesses Forward.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mb-9 leading-relaxed">
            JAZ-X designs and engineers websites, apps, games and growth
            systems for brands that refuse to look ordinary.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <MagneticButton href="/start-project" variant="primary">
              Start a Project <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="secondary">View Our Work</MagneticButton>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Services */}
      <section className="relative px-6 md:px-16 py-32 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <span className="text-xs text-secondary tracking-widest uppercase font-medium">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Six disciplines. One studio.</h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              Every engagement pairs strategy with craft — no template thinking, no disposable output.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <ServiceCard
                index={i + 1}
                title={s.title}
                desc={s.shortDesc}
                href={`/services/${s.slug}`}
                icon={SERVICE_ICONS[s.slug]}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs text-secondary tracking-widest uppercase font-medium">Why JAZ-X</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-14 max-w-lg">
            Built different, on purpose.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="border-l border-white/10 pl-5 py-1">
                <item.icon size={20} color="#6C63FF" className="mb-4" />
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <span className="text-xs text-secondary tracking-widest uppercase font-medium">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Featured projects.</h2>
            </div>
            <MagneticButton href="/portfolio" variant="secondary">
              View Full Portfolio <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link href="/portfolio">
                <div className="group relative rounded-2xl overflow-hidden border border-white/10 h-64 flex flex-col justify-end p-7">
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}, transparent 70%)` }}
                  />
                  <span className="text-xs text-white/40 mb-2 relative z-10">{p.category} · {p.year}</span>
                  <h3 className="text-xl font-medium text-white relative z-10">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24">
        <Reveal>
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12">
            <span className="text-xs text-secondary tracking-widest uppercase font-medium">OUR PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">How We Turn Ideas Into Reality.</h2>
          </div>
        </Reveal>
        <TestimonialMarquee />
      </section>

      {/* Process */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs text-secondary tracking-widest uppercase font-medium">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-14 max-w-lg">
            A process built for momentum.
          </h2>
        </Reveal>
        <div className="relative border-l border-white/10 ml-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <div className="relative pl-10 pb-12 last:pb-0">
                <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-primary" />
                <span className="text-xs text-white/30 font-mono">{p.step}</span>
                <h3 className="text-lg font-medium text-white mt-1 mb-1.5">{p.title}</h3>
                <p className="text-sm text-white/45 max-w-md leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-xs text-secondary tracking-widest uppercase font-medium">Investment</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Packages built to scale with you.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <div
                className={`relative rounded-2xl p-8 border h-full flex flex-col ${
                  pkg.featured ? "border-primary/50 bg-gradient-to-b from-primary/10 to-transparent" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute top-6 right-6 text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-medium mb-1">{pkg.name}</h3>
                <p className="text-xs text-white/40 mb-6">{pkg.bestFor}</p>
                <div className="mb-6">
                  <span className="text-3xl font-semibold">{pkg.price}</span>
                  <span className="text-xs text-white/40 ml-2">{pkg.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.slice(0, 4).map((f) => (
                    <li key={f} className="text-sm text-white/55 flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span> {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton href="/packages" variant={pkg.featured ? "primary" : "secondary"} className="w-full justify-center">
                  See Full Details
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-xs text-secondary tracking-widest uppercase font-medium">Questions</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Frequently asked.</h2>
          </div>
        </Reveal>
        <Reveal>
          <FAQAccordion />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-16 py-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl p-14 md:p-20 text-center overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/5">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              Have a product worth building well?
            </h2>
            <p className="text-white/50 mb-9 max-w-lg mx-auto">
              Tell us where it hurts and where it&apos;s going. We&apos;ll tell you how we&apos;d build it.
            </p>
            <div className="flex justify-center">
              <MagneticButton href="/contact" variant="primary">
                Book a Discovery Call <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
