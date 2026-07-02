"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const quickActions = [
  "🌐 Website Development",
  "📱 Mobile App",
  "🤖 AI Solutions",
  "🎮 Game Development",
  "📈 SEO",
];

export default function AIChat({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.9,
          }}
          transition={{
            duration: .3,
          }}
          className="fixed
          bottom-24
          left-6
          w-[370px]
          rounded-3xl
          overflow-hidden
          border
          border-cyan-500/20
          bg-[#0B0F19]/95
          backdrop-blur-xl
          shadow-[0_0_60px_rgba(0,229,255,.15)]
          z-[9999]"
        >
          {/* Header */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

            <div>

              <h3 className="text-white font-semibold">
                JAZ-X AI
              </h3>

              <p className="text-cyan-400 text-xs">
                Online
              </p>

            </div>

            <button onClick={onClose}>
              <X className="text-white/60 hover:text-white"/>
            </button>

          </div>

          {/* Body */}

          <div className="p-6">

            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4">

              <p className="text-white font-medium mb-2">
                👋 Welcome
              </p>

              <p className="text-white/60 text-sm">
                I'm JAZ-X AI.

                How can I help you today?
              </p>

            </div>

            <div className="mt-5 space-y-2">

              {quickActions.map((item)=>(

                <button
                  key={item}
                  className="w-full rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 py-3 text-left px-4 text-sm text-white transition"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Input */}

          <div className="border-t border-white/10 p-4 flex gap-2">

            <input
              placeholder="Ask JAZ-X AI..."
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none"
            />

            <button
              className="w-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition"
            >
              <Send size={18} color="black"/>
            </button>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}