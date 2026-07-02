"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AIChat from "./AIChat";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AIChat open={open} onClose={() => setOpen(false)} />

      {/* Speech Bubble */}

      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-48 right-10 z-[9998]"
        >
          <div className="rounded-2xl border border-cyan-500/20 bg-[#0B0F19]/95 backdrop-blur-xl px-4 py-3 shadow-[0_0_30px_rgba(0,229,255,.18)]">
            <p className="text-white text-sm font-medium">
              👋 Hi! I'm JAZ-X AI
            </p>

            <p className="text-cyan-400 text-xs mt-1">
              Need a website or AI solution?
            </p>
          </div>
        </motion.div>
      )}

      {/* Robot */}

      <motion.button
        onClick={() => setOpen(true)}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.08,
        }}
        className="fixed bottom-8 right-6 z-[9999]"
      >
        <Image
          src="/images/jazx-ai.webp"
          alt="JAZ-X AI"
          width={120}
          height={120}
          priority
          className="drop-shadow-[0_0_35px_rgba(0,229,255,.55)]"
        />
      </motion.button>
    </>
  );
}