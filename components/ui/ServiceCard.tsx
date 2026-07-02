"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  index: number;
  title: string;
  desc: string;
  href: string;
  icon: keyof typeof Icons;
}

export default function ServiceCard({ index, title, desc, href, icon }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const Icon = Icons[icon] as React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    setStyle({
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
      // @ts-ignore custom property for glow position
      "--mx": `${x}px`,
      "--my": `${y}px`,
    });
  };

  const handleLeave = () => setStyle({ transform: "perspective(700px) rotateX(0) rotateY(0)" });

  return (
    <Link href={href}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className="group relative rounded-2xl p-7 border border-white/10 bg-white/[0.03] overflow-hidden transition-transform duration-200 ease-out cursor-pointer h-full"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "radial-gradient(180px circle at var(--mx) var(--my), rgba(108,99,255,0.18), transparent 70%)" }}
        />
        <span className="text-xs text-white/30 font-mono">0{index}</span>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mt-4 mb-5 bg-gradient-to-br from-primary/25 to-secondary/15">
          {Icon && <Icon size={20} color="#00E5FF" strokeWidth={1.6} />}
        </div>
        <h3 className="text-lg font-medium text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
        <div className="mt-5 flex items-center gap-1.5 text-xs text-white/40 group-hover:text-secondary transition-colors">
          Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
