"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Framework, FRAMEWORK_INFO } from "@/lib/types";
import { useT } from "@/hooks/useLocale";

interface FrameworkSelectorProps {
  value: Framework | undefined;
  onChange: (fw: Framework | undefined) => void;
}

const FRAMEWORKS = Object.keys(FRAMEWORK_INFO) as Framework[];

export function FrameworkSelector({ value, onChange }: FrameworkSelectorProps) {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (fw: Framework) => {
    onChange(value === fw ? undefined : fw);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 transition-all duration-200",
          "backdrop-blur-sm bg-white/50 dark:bg-slate-800/50",
          "border border-white/20 dark:border-slate-700/50",
          "hover:border-violet-300 dark:hover:border-violet-600",
          "text-sm font-medium text-foreground",
          isOpen && "border-violet-300 dark:border-violet-600"
        )}
      >
        <span className="flex items-center gap-2">
          <BookOpen className="size-4 text-violet-500" />
          <span>{t("framework.title")}</span>
          <span className="text-xs text-muted-foreground font-normal">{t("framework.optional")}</span>
          {value && (
            <span className="ml-1 rounded-full bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
              {FRAMEWORK_INFO[value].name}
            </span>
          )}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="framework-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 pt-1">
              {FRAMEWORKS.map((fw) => {
                const { name } = FRAMEWORK_INFO[fw];
                const description = t(`framework.${fw}.desc`);
                const isSelected = value === fw;

                return (
                  <motion.button
                    key={fw}
                    type="button"
                    onClick={() => handleSelect(fw)}
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
                        layoutId="framework-selected-bg"
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 text-sm font-bold",
                        isSelected
                          ? "text-violet-700 dark:text-violet-300"
                          : "text-foreground"
                      )}
                    >
                      {name}
                    </span>
                    <span className="relative z-10 text-[11px] text-muted-foreground leading-snug">
                      {description}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
