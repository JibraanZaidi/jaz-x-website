"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AIOrb from "./AIOrb";
import AIChat from "./AIChat";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AIChat open={open} onClose={() => setOpen(false)} />

      {/* Floating AI Orb */}
      <motion.div
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
        className="fixed bottom-28 right-8 w-24 h-24 cursor-pointer z-[9999]"
      >
        <AIOrb />
      </motion.div>

      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-28 right-28 bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-full px-4 py-2 text-xs text-white z-[9999]"
        >
          ✨ Ask JAZ-X AI
        </motion.div>
      )}
    </>
  );
}