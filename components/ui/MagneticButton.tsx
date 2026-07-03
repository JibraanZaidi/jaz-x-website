"use client";

import Link from "next/link";
import {
  ReactNode,
  useRef,
  useState,
  MouseEvent,
} from "react";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.18;
    const moveY = (y - rect.height / 2) * 0.18;

    setTransform(`translate(${moveX}px, ${moveY}px)`);
  };

  const handleLeave = () => {
    setTransform("translate(0px,0px)");
  };

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-medium transition-all duration-300",
    "active:scale-95",
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary text-black shadow-lg hover:shadow-cyan-500/30"
      : "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
      style={{
        transform,
      }}
    >
      {children}
    </button>
  );
}