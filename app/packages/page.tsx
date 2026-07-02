import { ArrowRight, Check, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { packages, comparisonRows } from "@/lib/data/packages";

export default function PackagesPage() {
  return (
    <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <Reveal>
        <span className="text-xs text-secondary tracking-widest uppercase font-medium">Packages</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-2xl">
          Investment built to match where you are.
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-16">
          Every package below is a starting point, not a ceiling — most projects get
          scoped precisely during a discovery call.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
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
              <ul className="space-y-2.5 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="text-sm text-white/55 flex items-start gap-2">
                    <Check size={14} color="#00E5FF" className="mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-white/40 space-y-1 mb-8 border-t border-white/10 pt-4">
                <p><span className="text-white/60">Timeline:</span> {pkg.timeline}</p>
                <p><span className="text-white/60">Support:</span> {pkg.support}</p>
                <p><span className="text-white/60">Stack:</span> {pkg.technologies}</p>
              </div>
              <MagneticButton href="/contact" variant={pkg.featured ? "primary" : "secondary"} className="w-full justify-center">
                Get Started <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Comparison table */}
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight mb-10">Compare packages</h2>
      </Reveal>
      <Reveal>
        <div className="overflow-x-auto border border-white/10 rounded-2xl">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-5 text-white/40 font-normal">Feature</th>
                <th className="p-5 text-white/60 font-medium">Starter</th>
                <th className="p-5 text-secondary font-medium">Professional</th>
                <th className="p-5 text-white/60 font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 last:border-0">
                  <td className="p-5 text-white/60">{row.feature}</td>
                  {[row.starter, row.professional, row.enterprise].map((val, idx) => (
                    <td key={idx} className="p-5">
                      {typeof val === "boolean" ? (
                        val ? <Check size={16} color="#00E5FF" /> : <X size={16} className="text-white/20" />
                      ) : (
                        <span className="text-white/60">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
