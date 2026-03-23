"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Clipboard, Check, Trash2, ClipboardList } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FavoriteItem, CopyType, COPY_TYPE_LABELS } from "@/lib/types";
import { useT } from "@/hooks/useLocale";

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  groupedByType: Partial<Record<CopyType, FavoriteItem[]>>;
  onRemove: (text: string) => void;
  onClearAll: () => void;
}

function CopyButton({ text }: { text: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }, [text]);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      title={t("card.copyToClipboard")}
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="size-3.5 text-green-500" /> : <Clipboard className="size-3.5" />}
      <span className="sr-only">{t("favorites.copy") || "Copy"}</span>
    </Button>
  );
}

function ClearAllButton({ onClearAll }: { onClearAll: () => void }) {
  const t = useT();
  const [confirmPending, setConfirmPending] = useState(false);

  const handleClick = useCallback(() => {
    if (!confirmPending) {
      setConfirmPending(true);
      setTimeout(() => setConfirmPending(false), 3000);
    } else {
      onClearAll();
      setConfirmPending(false);
    }
  }, [confirmPending, onClearAll]);

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleClick}
      className="text-xs"
    >
      <Trash2 className="size-3.5" />
      {confirmPending ? t("favorites.confirmClear") : t("favorites.clearAll")}
    </Button>
  );
}

export function FavoritesPanel({
  isOpen,
  onClose,
  favorites,
  groupedByType,
  onRemove,
  onClearAll,
}: FavoritesPanelProps) {
  const t = useT();
  const [copyAllDone, setCopyAllDone] = useState(false);

  const handleCopyAll = useCallback(async () => {
    if (favorites.length === 0) return;

    const lines: string[] = [];
    for (const [type, items] of Object.entries(groupedByType) as [
      CopyType,
      FavoriteItem[]
    ][]) {
      if (!items || items.length === 0) continue;
      const { emoji } = COPY_TYPE_LABELS[type];
      const label = t(`copyType.${type}`);
      lines.push(`${emoji} ${label}`);
      lines.push("─".repeat(30));
      items.forEach((item) => lines.push(`• ${item.text}`));
      lines.push("");
    }

    try {
      await navigator.clipboard.writeText(lines.join("\n").trimEnd());
      setCopyAllDone(true);
      setTimeout(() => setCopyAllDone(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }, [favorites, groupedByType, t]);

  const groupEntries = Object.entries(groupedByType) as [
    CopyType,
    FavoriteItem[]
  ][];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col w-full sm:max-w-md p-0 bg-background/80 backdrop-blur-xl border-l border-white/10"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-rose-400 fill-rose-400" />
            <SheetTitle className="text-base font-semibold">
              {t("favorites.title")}
            </SheetTitle>
            {favorites.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {favorites.length}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
            <span className="sr-only">{t("favorites.close")}</span>
          </Button>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <Heart className="size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-muted-foreground">
                {t("favorites.empty")}
              </p>
              <p className="text-xs text-muted-foreground/60 max-w-[200px]">
                {t("favorites.emptyHint")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <AnimatePresence initial={false}>
                {groupEntries.map(([type, items]) => {
                  if (!items || items.length === 0) return null;
                  const { emoji } = COPY_TYPE_LABELS[type];
                  const label = t(`copyType.${type}`);
                  return (
                    <motion.section
                      key={type}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span>{emoji}</span>
                        <span>{label}</span>
                      </h3>
                      <div className="flex flex-col gap-2">
                        <AnimatePresence initial={false}>
                          {items.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 16, height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="group flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 hover:bg-white/10 transition-colors"
                            >
                              <p className="flex-1 text-sm leading-snug line-clamp-2 text-foreground">
                                {item.text}
                              </p>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <CopyButton text={item.text} />
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => onRemove(item.text)}
                                  title={t("favorites.remove")}
                                  className="shrink-0 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="size-3.5" />
                                  <span className="sr-only">{t("favorites.remove")}</span>
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.section>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {favorites.length > 0 && (
          <div className="flex items-center justify-between gap-2 px-5 py-4 border-t border-white/10">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAll}
              className="text-xs gap-1.5"
            >
              {copyAllDone ? (
                <Check className="size-3.5 text-green-500" />
              ) : (
                <ClipboardList className="size-3.5" />
              )}
              {copyAllDone ? t("favorites.copied") : t("favorites.copyAll")}
            </Button>
            <ClearAllButton onClearAll={onClearAll} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
