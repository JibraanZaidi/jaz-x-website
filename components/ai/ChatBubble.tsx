"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChatMessage } from "./types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex w-full items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-[#00E5FF]/40">
          <Image
            src="/images/jazx-ai.webp"
            alt="JAZ-X AI"
            fill
            sizes="28px"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={`max-w-[78%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-[#00E5FF] to-[#0091B3] text-slate-950 font-medium"
            : "rounded-bl-sm border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
