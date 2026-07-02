"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AIChat({ open, onClose }: Props) {
  const [message, setMessage] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-28 right-6 w-[360px] h-[520px] rounded-3xl border border-cyan-500/20 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl z-[9999] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <h3 className="text-white font-semibold">🤖 JAZ-X AI</h3>
              <p className="text-xs text-cyan-400">Online</p>
            </div>

            <button onClick={onClose}>
              <X className="text-white/60 hover:text-white" size={18} />
            </button>
          </div>

          {/* Chat */}
          <div className="p-5 flex-1 overflow-y-auto h-[380px]">
            <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-4">
              <p className="text-white/80 text-sm">
                👋 Welcome to <span className="text-cyan-400">JAZ-X AI</span>.
              </p>

              <p className="text-white/60 text-sm mt-3">
                I can help you with:
              </p>

              <ul className="text-sm text-white/70 mt-3 space-y-2">
                <li>🌐 Website Development</li>
                <li>📱 Mobile Apps</li>
                <li>🤖 AI Solutions</li>
                <li>🎮 Game Development</li>
                <li>📈 SEO & Marketing</li>
              </ul>
            </div>
          </div>

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask JAZ-X AI..."
                className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm outline-none border border-white/10"
              />

              <button
                className="w-12 rounded-xl bg-cyan-500 flex items-center justify-center hover:bg-cyan-400 transition"
              >
                <Send size={18} color="black" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}