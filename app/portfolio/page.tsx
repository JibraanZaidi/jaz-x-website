"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { projects, categories } from "@/lib/data/portfolio";

export default function PortfolioPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <Reveal>
        <span className="text-xs text-secondary tracking-widest uppercase font-medium">Portfolio</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-2xl">
          Work we&apos;re proud to put our name on.
        </h1>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                active === cat
                  ? "bg-gradient-primary text-black border-transparent"
                  : "border-white/10 text-white/60 hover:text-white bg-white/[0.02]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 h-72 flex flex-col justify-end p-8 cursor-pointer">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}, transparent 70%)` }}
              />
              <span className="text-xs text-white/40 mb-2 relative z-10">{p.category} · {p.year}</span>
              <h3 className="text-2xl font-medium text-white relative z-10 mb-2">{p.title}</h3>
              <p className="text-sm text-white/45 relative z-10 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {p.summary}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-white/40 text-center py-24">No projects in this category yet.</p>
      )}
    </div>
  );
}
