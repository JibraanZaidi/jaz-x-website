"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import AIChat from "./AIChat";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end sm:bottom-28 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <div className="mb-4">
            <AIChat onClose={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open JAZ-X AI Assistant"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [0, -4, 4, 0],
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative h-16 w-16 rounded-full"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-[#00E5FF]/40 blur-xl" />
            <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#00E5FF]/20 blur-2xl" />

            <span className="relative block h-full w-full overflow-hidden rounded-full ring-2 ring-[#00E5FF]/60 shadow-[0_0_25px_-3px_rgba(0,229,255,0.8)]">
              <Image
                src="/images/jazx-ai.webp"
                alt="JAZ-X AI Assistant"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
