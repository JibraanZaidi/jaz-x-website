import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import FloatingShape from "@/components/three/FloatingShape";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { ServiceData, services } from "@/lib/data/services";

export default function ServicePageTemplate({ service }: { service: ServiceData }) {
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto pb-20 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <Reveal>
          <div>
            <span className="text-xs text-secondary tracking-widest uppercase font-medium">Service</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6">{service.title}</h1>
            <p className="text-white/50 text-lg leading-relaxed mb-4">{service.tagline}</p>
            <p className="text-white/40 leading-relaxed mb-9 max-w-lg">{service.description}</p>
            <MagneticButton href="/contact" variant="primary">
              Start This Project <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-72 md:h-96 rounded-2xl border border-white/10 overflow-hidden">
            <FloatingShape type={service.shapeType} color="#6C63FF" />
          </div>
        </Reveal>
      </section>

      {/* Offerings chips */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto pb-24">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {service.offerings.map((o) => (
              <span key={o} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/60 bg-white/[0.02]">
                {o}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-24 border-t border-white/5">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-14">What&apos;s included</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.02] h-full">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5 bg-gradient-to-br from-primary/25 to-secondary/15">
                  <Check size={16} color="#00E5FF" />
                </div>
                <h3 className="text-white font-medium mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="relative px-6 md:px-16 max-w-5xl mx-auto py-24 border-t border-white/5">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-14">How we deliver it</h2>
        </Reveal>
        <div className="relative border-l border-white/10 ml-3">
          {service.process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <div className="relative pl-10 pb-12 last:pb-0">
                <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-primary" />
                <span className="text-xs text-white/30 font-mono">Step {i + 1}</span>
                <h3 className="text-lg font-medium text-white mt-1 mb-1.5">{p.step}</h3>
                <p className="text-sm text-white/45 max-w-md leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-24 border-t border-white/5">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-10">Tools &amp; technologies</h2>
          <div className="flex flex-wrap gap-3">
            {service.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/60 bg-white/[0.02]">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Related services */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-24 border-t border-white/5">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-10">Pairs well with</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={`/services/${s.slug}`}>
                <div className="group border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors h-full">
                  <h3 className="text-white font-medium mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{s.shortDesc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-24">
        <Reveal>
          <div className="relative rounded-3xl p-14 md:p-20 text-center overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/5">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              Ready to start your {service.title.toLowerCase()} project?
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
    </div>
  );
}
