"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, Check, Star, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CopyCardProps {
  text: string;
  index: number;
  isFavorited: boolean;
  onCopy: () => void;
  onToggleFavorite: () => void;
  onRegenerate: () => void;
  charLimit?: number;
}

export function CopyCard({
  text,
  index,
  isFavorited,
  onCopy,
  onToggleFavorite,
  onRegenerate,
  charLimit,
}: CopyCardProps) {
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (spinning) return;
    setSpinning(true);
    onRegenerate();
    setTimeout(() => setSpinning(false), 700);
  };

  const isOverLimit = charLimit !== undefined && text.length > charLimit;
  const charCountVariant = isOverLimit ? "destructive" : "secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative p-5 rounded-xl",
        "backdrop-blur-sm bg-white/60 dark:bg-slate-800/60",
        "border border-white/20 dark:border-slate-700/50",
        "shadow-sm hover:shadow-lg hover:-translate-y-0.5",
        "transition-all duration-300"
      )}
    >
      {/* Card number */}
      <span className="text-[11px] font-semibold text-muted-foreground/50 mb-2 block select-none">
        #{index + 1}
      </span>

      {/* Copy text */}
      <p className="text-lg leading-relaxed text-foreground mb-4 whitespace-pre-wrap">
        {text}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-3">
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Copy button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            title="Copy to clipboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors duration-150"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </motion.button>

          {/* Star / Favorite button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isFavorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={onToggleFavorite}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-150"
          >
            <Star
              className={cn(
                "h-4 w-4 transition-colors duration-150",
                isFavorited && "fill-amber-400 text-amber-400"
              )}
            />
          </motion.button>

          {/* Regenerate button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={spinning ? { duration: 0.6, ease: "easeInOut" } : { duration: 0 }}
            onClick={handleRegenerate}
            title="Regenerate this copy"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors duration-150"
          >
            <RefreshCw className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Char count badge */}
        <Badge
          variant={charCountVariant}
          className={cn(
            "text-[10px] font-medium tabular-nums",
            isOverLimit && "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50"
          )}
        >
          {text.length} chars
          {charLimit && isOverLimit && ` / ${charLimit}`}
        </Badge>
      </div>
    </motion.div>
  );
}
