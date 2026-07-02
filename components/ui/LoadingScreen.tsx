"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
        }

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated Logo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
              alt="JAZ-X"
              width={190}
              height={60}
              priority
              className="h-14 w-auto object-contain drop-shadow-[0_0_30px_rgba(79,142,247,0.7)]"
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#4F8EF7,#8B5CF6,#1FD3F3)",
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.25,
              }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="mt-5 text-sm tracking-widest text-white/50 font-mono"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            {Math.floor(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}