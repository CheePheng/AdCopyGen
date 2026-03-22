"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Header } from "@/components/Header";
import { InputForm } from "@/components/InputForm";
import { OutputPanel } from "@/components/OutputPanel";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { useFavorites } from "@/hooks/useFavorites";
import { GenerateRequest } from "@/lib/types";

export default function Home() {
  const [copies, setCopies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<GenerateRequest | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, toggleFavorite, isFavorited, clearAll, groupedByType } = useFavorites();

  async function handleGenerate(data: GenerateRequest) {
    setIsLoading(true);
    setCopies([]);
    setError(null);
    setCurrentRequest(data);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? `Request failed with status ${res.status}`);
      }

      const response = await res.json();
      setCopies(response.copies);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerateSingle(index: number) {
    if (!currentRequest) return;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentRequest, numberOfVariations: 1 }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? `Request failed with status ${res.status}`);
      }

      const response = await res.json();
      setCopies((prev) => {
        const updated = [...prev];
        updated[index] = response.copies[0];
        return updated;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }

  function handleRegenerateAll() {
    if (!currentRequest) return;
    handleGenerate(currentRequest);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-violet-500 opacity-20 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-indigo-500 opacity-20 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500 opacity-20 blur-3xl"
        animate={{ x: [0, 30, -40, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        <Header
          onToggleFavorites={() => setShowFavorites(true)}
          favoritesCount={favorites.length}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1.5fr] gap-6">
            {/* Left panel: Input form */}
            <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 h-fit lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>

            {/* Right panel: Output */}
            <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <OutputPanel
                copies={copies}
                isLoading={isLoading}
                copyType={currentRequest?.copyType ?? "ad-headlines"}
                charLimit={currentRequest?.charLimit}
                onCopy={handleCopy}
                onToggleFavorite={(text) =>
                  toggleFavorite(text, currentRequest?.copyType ?? "ad-headlines")
                }
                onRegenerate={handleRegenerateSingle}
                onRegenerateAll={handleRegenerateAll}
                isFavorited={isFavorited}
              />
            </div>
          </div>
        </main>
      </div>

      <FavoritesPanel
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        groupedByType={groupedByType}
        onRemove={(text) => toggleFavorite(text, "ad-headlines")}
        onClearAll={clearAll}
      />
    </div>
  );
}
