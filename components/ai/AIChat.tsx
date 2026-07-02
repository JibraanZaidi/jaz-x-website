"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Send, X, Sparkles } from "lucide-react";
import ChatBubble from "./ChatBubble";
import QuickAction from "./QuickAction";
import TypingIndicator from "./TypingIndicator";
import { QUICK_ACTIONS, getAIResponse, WELCOME_MESSAGE } from "./chatData";
import { ChatMessage, QuickActionItem } from "./types";

interface AIChatProps {
  onClose: () => void;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeTyped, setWelcomeTyped] = useState("");
  const [welcomeDone, setWelcomeDone] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing effect for the welcome message
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setWelcomeTyped(WELCOME_MESSAGE.slice(0, i));
      if (i >= WELCOME_MESSAGE.length) {
        clearInterval(interval);
        setWelcomeDone(true);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = 500 + Math.random() * 500;
    window.setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: createId(),
        role: "ai",
        content: getAIResponse(trimmed),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, delay);
  }

  function handleQuickAction(action: QuickActionItem) {
    sendMessage(action.prompt);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-[min(640px,80vh)] w-[min(400px,92vw)] flex-col overflow-hidden rounded-[28px] border border-[#00E5FF]/25 bg-slate-950/80 shadow-[0_0_60px_-12px_rgba(0,229,255,0.35)] backdrop-blur-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#00E5FF]/50">
          <Image
            src="/images/jazx-ai.webp"
            alt="JAZ-X AI"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">JAZ-X AI</p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {/* Welcome message */}
        <div className="flex items-end gap-2">
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-[#00E5FF]/40">
            <Image
              src="/images/jazx-ai.webp"
              alt="JAZ-X AI"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div className="max-w-[80%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-100 backdrop-blur-md">
            {welcomeTyped}
            {!welcomeDone && (
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[#00E5FF] align-middle" />
            )}
          </div>
        </div>

        {/* Quick actions */}
        <AnimatePresence>
          {welcomeDone && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 pt-1"
            >
              <p className="flex items-center gap-1.5 px-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Sparkles size={12} className="text-[#00E5FF]" />
                What are you looking for?
              </p>
              {QUICK_ACTIONS.map((action) => (
                <QuickAction
                  key={action.id}
                  action={action}
                  onSelect={handleQuickAction}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/10 bg-white/[0.03] p-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask JAZ-X AI..."
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#00E5FF]/50 focus:bg-white/[0.08]"
        />
        <motion.button
          type="submit"
          disabled={!input.trim()}
          whileHover={input.trim() ? { scale: 1.06 } : undefined}
          whileTap={input.trim() ? { scale: 0.94 } : undefined}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00E5FF] to-[#0091B3] text-slate-950 shadow-[0_0_16px_-2px_rgba(0,229,255,0.7)] transition-opacity disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
        >
          <Send size={16} strokeWidth={2.5} />
        </motion.button>
      </form>
    </motion.div>
  );
}
