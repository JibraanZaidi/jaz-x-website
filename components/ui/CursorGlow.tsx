"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-0"
      style={{
        background:
          "radial-gradient(circle, rgba(108,99,255,0.10) 0%, rgba(0,229,255,0.04) 45%, transparent 70%)",
        transition: "transform 0.15s ease-out",
      }}
    />
  );
}
