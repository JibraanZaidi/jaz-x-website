"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import AIChat from "./AIChat";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AIChat open={open} onClose={() => setOpen(false)} />

      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{
          scale: 1.05,
          y: -3,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-6 left-6 z-[9999]
        flex items-center gap-3
        rounded-full
        border border-cyan-500/20
        bg-[#0B0F19]/90
        backdrop-blur-xl
        px-5 py-3
        shadow-[0_0_40px_rgba(0,229,255,.18)]"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="w-11 h-11 rounded-full
          bg-gradient-to-br
          from-cyan-400
          to-blue-600
          flex items-center justify-center"
        >
          <Sparkles size={20} color="white" />
        </motion.div>

        <div className="text-left">
          <p className="text-white font-semibold text-sm">
            JAZ-X AI
          </p>

          <p className="text-cyan-400 text-xs">
            Ask anything
          </p>
        </div>
      </motion.button>
    </>
  );
}