"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CopyType, COPY_TYPE_LABELS } from "@/lib/types";

interface CopyTypeSelectorProps {
  value: CopyType;
  onChange: (type: CopyType) => void;
}

const COPY_TYPES = Object.keys(COPY_TYPE_LABELS) as CopyType[];

export function CopyTypeSelector({ value, onChange }: CopyTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {COPY_TYPES.map((type) => {
        const { label, emoji, description } = COPY_TYPE_LABELS[type];
        const isSelected = value === type;

        return (
          <motion.button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={cn(
              "relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-200 cursor-pointer",
              "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50",
              "shadow-sm hover:shadow-md",
              isSelected
                ? "border-violet-500 ring-2 ring-violet-500/50 bg-violet-50/60 dark:bg-violet-900/20"
                : "border-white/20 dark:border-slate-700/50 hover:border-violet-300 dark:hover:border-violet-600"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="copy-type-selected-bg"
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-2xl leading-none">{emoji}</span>
            <span
              className={cn(
                "relative z-10 text-sm font-semibold leading-snug",
                isSelected
                  ? "text-violet-700 dark:text-violet-300"
                  : "text-foreground"
              )}
            >
              {label}
            </span>
            <span className="relative z-10 text-xs text-muted-foreground leading-snug">
              {description}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
