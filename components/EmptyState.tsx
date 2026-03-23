"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SAMPLE_COPIES = [
  "Transform your ideas into revenue.",
  "The AI copywriter that never sleeps.",
  "Words that sell, powered by intelligence.",
  "Stop writing. Start converting.",
  "Your brand voice, amplified by AI.",
];

export function EmptyState() {
  const [displayText, setDisplayText] = useState("");
  const [copyIndex, setCopyIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = SAMPLE_COPIES[copyIndex % SAMPLE_COPIES.length];

    timeoutRef.current = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCopyIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? 25 : 55
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, copyIndex]);

  return (
    <div className="relative flex h-full min-h-[480px] items-center justify-center overflow-hidden rounded-2xl">
      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-500/15 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-[26rem] w-[26rem] rounded-full bg-purple-500/15 blur-[100px]"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        {/* Floating icon with glow */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl glass"
        >
          <div
            className="absolute inset-0 rounded-2xl glow-breathe"
            style={{ boxShadow: "0 0 40px oklch(0.68 0.20 293 / 0.3)" }}
          />
          <Sparkles className="h-9 w-9 text-violet-400" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-[-0.03em] gradient-text">
          Create Copy That Converts
        </h2>

        {/* Typewriter area */}
        <div className="mx-auto w-full max-w-sm rounded-xl glass p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 glow-breathe" />
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">
              AI generating...
            </span>
          </div>
          <p className="min-h-[2em] text-left text-lg font-medium leading-relaxed text-foreground">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-0.5 inline-block h-[1.2em] w-[2px] bg-violet-400 align-middle"
            />
          </p>
        </div>

        {/* Instruction */}
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground/60">
          Fill in your product details and hit Generate.
        </p>
      </div>
    </div>
  );
}
