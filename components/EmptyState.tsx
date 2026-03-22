"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="relative flex h-full min-h-[480px] items-center justify-center overflow-hidden rounded-2xl">
      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-2xl backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/50 shadow-lg shadow-violet-500/10"
        >
          <Sparkles className="h-9 w-9 text-violet-500" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Create Copy That Converts
        </h2>

        {/* Description */}
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Fill in your product details and hit Generate to create copy that converts.
        </p>
      </div>
    </div>
  );
}
