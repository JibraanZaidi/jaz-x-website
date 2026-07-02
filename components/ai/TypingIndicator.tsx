"use client";

import { motion } from "framer-motion";

const dotVariants = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 0.9,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.15,
    },
  }),
};

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={dotVariants}
          animate="animate"
          className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]/80"
        />
      ))}
    </div>
  );
}
