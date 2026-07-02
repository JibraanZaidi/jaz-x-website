"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Bot,
  Gamepad2,
  TrendingUp,
  Briefcase,
  Phone,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { QuickActionItem } from "./types";

const ICON_MAP: Record<QuickActionItem["icon"], LucideIcon> = {
  Globe,
  Smartphone,
  Bot,
  Gamepad2,
  TrendingUp,
  Briefcase,
  Phone,
};

interface QuickActionProps {
  action: QuickActionItem;
  onSelect: (action: QuickActionItem) => void;
}

export default function QuickAction({ action, onSelect }: QuickActionProps) {
  const Icon = ICON_MAP[action.icon];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(action)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left backdrop-blur-md transition-colors hover:border-[#00E5FF]/40 hover:bg-white/[0.08] hover:shadow-[0_0_20px_-4px_rgba(0,229,255,0.35)]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 text-[#00E5FF]">
        <Icon size={18} strokeWidth={2} />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block truncate text-sm font-medium text-slate-100">
          {action.label}
        </span>
        <span className="block truncate text-xs text-slate-400">
          {action.description}
        </span>
      </span>

      <ArrowRight
        size={16}
        className="shrink-0 text-slate-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#00E5FF]"
      />
    </motion.button>
  );
}
