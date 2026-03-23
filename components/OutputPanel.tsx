"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CopyType, COPY_TYPE_LABELS } from "@/lib/types";
import { CopyCard } from "@/components/CopyCard";
import { EmptyState } from "@/components/EmptyState";

interface OutputPanelProps {
  copies: string[];
  isLoading: boolean;
  copyType: CopyType;
  charLimit?: number;
  onCopy: (text: string) => void;
  onToggleFavorite: (text: string) => void;
  onRegenerate: (index: number) => void;
  onRegenerateAll: () => void;
  isFavorited: (text: string) => boolean;
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3, ease: "easeOut" }}
      className={cn(
        "p-5 rounded-xl",
        "backdrop-blur-sm bg-white/60 dark:bg-white/[0.03]",
        "border border-white/20 dark:border-white/[0.06]"
      )}
    >
      <Skeleton className="h-3 w-8 mb-3 bg-muted/60" />
      <Skeleton className="h-4 w-full mb-2 bg-muted/60" />
      <Skeleton className="h-4 w-5/6 mb-2 bg-muted/60" />
      <Skeleton className="h-4 w-4/6 mb-5 bg-muted/60" />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg bg-muted/60" />
          <Skeleton className="h-8 w-8 rounded-lg bg-muted/60" />
          <Skeleton className="h-8 w-8 rounded-lg bg-muted/60" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full bg-muted/60" />
      </div>
    </motion.div>
  );
}

export function OutputPanel({
  copies,
  isLoading,
  copyType,
  charLimit,
  onCopy,
  onToggleFavorite,
  onRegenerate,
  onRegenerateAll,
  isFavorited,
}: OutputPanelProps) {
  const typeLabel = COPY_TYPE_LABELS[copyType]?.label ?? "Generated Copy";

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Header skeleton */}
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-6 w-36 bg-muted/60" />
              <Skeleton className="h-5 w-12 rounded-full bg-muted/60" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </motion.div>
        ) : copies.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <EmptyState />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-semibold text-foreground">
                  {typeLabel}
                </h2>
                <Badge variant="secondary" className="text-[11px]">
                  {copies.length}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerateAll}
                className={cn(
                  "h-8 gap-1.5 text-xs font-medium rounded-lg",
                  "backdrop-blur-sm bg-white/50 dark:bg-white/[0.04]",
                  "border-white/20 dark:border-white/[0.08]",
                  "hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700",
                  "dark:hover:bg-violet-500/10 dark:hover:border-violet-500/40 dark:hover:text-violet-400",
                  "transition-all duration-200"
                )}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate All
              </Button>
            </div>

            {/* Copy cards */}
            <AnimatePresence>
              {copies.map((text, i) => (
                <CopyCard
                  key={`${i}-${text.slice(0, 20)}`}
                  text={text}
                  index={i}
                  isFavorited={isFavorited(text)}
                  onCopy={() => onCopy(text)}
                  onToggleFavorite={() => onToggleFavorite(text)}
                  onRegenerate={() => onRegenerate(i)}
                  charLimit={charLimit}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
