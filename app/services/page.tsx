import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

const SERVICE_ICONS: Record<string, keyof typeof import("lucide-react")> = {
  "website-development": "Code2",
  "app-development": "Smartphone",
  "game-development": "Gamepad2",
  seo: "TrendingUp",
  "app-testing": "ShieldCheck",
  "social-media-marketing": "Share2",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <Reveal>
        <span className="text-xs text-secondary tracking-widest uppercase font-medium">Services</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-2xl">
          Six disciplines, built to work as one system.
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-16">
          Every service below can stand alone or plug into a larger build — most of our
          best client work spans two or three of them at once.
        </p>
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
    </div>
  );
}
