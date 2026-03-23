"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sparkles, Sun, Moon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useT } from "@/hooks/useLocale";

interface HeaderProps {
  onToggleFavorites: () => void;
  favoritesCount: number;
}

export function Header({ onToggleFavorites, favoritesCount }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/60 dark:bg-white/[0.02] header-glow-line"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col justify-center">
            {/* Logo row */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex items-center justify-center"
              >
                <Sparkles
                  className="size-6 text-violet-500 dark:text-violet-400"
                  aria-hidden="true"
                />
              </motion.div>
              <span
                className={cn(
                  "text-2xl font-bold tracking-[-0.03em]",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "bg-clip-text text-transparent"
                )}
                style={{ filter: "drop-shadow(0 0 20px oklch(0.68 0.20 293 / 0.4))" }}
              >
                AdCopyGen
              </span>
            </div>
            {/* Tagline — hidden on mobile */}
            <p className="hidden sm:block text-[11px] tracking-wide text-muted-foreground/60 leading-none mt-0.5 pl-8">
              {t("header.tagline")}
            </p>
          </div>

          {/* Right: Favorites + Dark mode */}
          <div className="flex items-center gap-2">
            {/* Favorites button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorites}
              aria-label={`Favorites${favoritesCount > 0 ? ` (${favoritesCount})` : ""}`}
              className="relative text-muted-foreground hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <Heart className="size-5" />
              <AnimatePresence>
                {favoritesCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className={cn(
                      "absolute -top-1 -right-1",
                      "flex items-center justify-center",
                      "min-w-[1.1rem] h-[1.1rem] px-[3px]",
                      "rounded-full text-[10px] font-bold leading-none",
                      "bg-rose-500 text-white ring-2 ring-background"
                    )}
                  >
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocale(locale === "en" ? "zh" : "en")}
              aria-label={t("lang.toggle")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-bold"
            >
              {locale === "en" ? "中" : "EN"}
            </Button>

            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="text-muted-foreground hover:text-foreground transition-colors overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted ? (
                  theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Sun className="size-5 text-amber-400" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Moon className="size-5 text-violet-400" />
                    </motion.span>
                  )
                ) : (
                  // Pre-hydration placeholder to avoid layout shift
                  <motion.span
                    key="placeholder"
                    className="flex items-center justify-center"
                  >
                    <Sun className="size-5 opacity-0" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
