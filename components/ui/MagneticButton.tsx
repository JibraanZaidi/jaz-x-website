"use client";

import { useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0,0)");

  const handleMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * 0.25}px, ${y * 0.25}px)`);
  };

  const handleLeave = () => setTransform("translate(0,0)");

  const classes = cn(
    "relative px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-transform duration-200 ease-out flex items-center gap-2 w-fit",
    variant === "primary"
      ? "text-black bg-gradient-primary"
      : "text-white border border-white/15 backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.06]",
    className
  );

  const inner = (
    <div
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={classes}
      style={{ transform }}
    >
      {children}
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}
