import { testimonials } from "@/lib/data/faq";
import { Quote } from "lucide-react";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="glass rounded-2xl p-7 w-[380px] shrink-0 mx-3 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <span className="text-4xl font-bold text-cyan-400/90">
          {t.name}
        </span>

        <Quote size={18} color="#00E5FF" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">
        {t.role}
      </h3>

      <p className="text-white/60 leading-7 text-sm">
        {t.quote}
      </p>
    </div>
  );
}

export default function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="marquee-track py-2">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
