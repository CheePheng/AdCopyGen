import { useState, useEffect, useMemo } from "react";
import { FavoriteItem, CopyType } from "@/lib/types";

const STORAGE_KEY = "adcopygen-favorites";

function loadFromStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FavoriteItem[];
  } catch {
    return [];
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() =>
    loadFromStorage()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  }, [favorites]);

  function toggleFavorite(text: string, copyType: CopyType): void {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.text === text);
      if (exists) {
        return prev.filter((f) => f.text !== text);
      }
      const newItem: FavoriteItem = {
        id: generateId(),
        text,
        copyType,
        createdAt: Date.now(),
      };
      return [...prev, newItem];
    });
  }

  function isFavorited(text: string): boolean {
    return favorites.some((f) => f.text === text);
  }

  function clearAll(): void {
    setFavorites([]);
  }

  const groupedByType = useMemo<Partial<Record<CopyType, FavoriteItem[]>>>(() => {
    return favorites.reduce<Partial<Record<CopyType, FavoriteItem[]>>>(
      (acc, item) => {
        if (!acc[item.copyType]) {
          acc[item.copyType] = [];
        }
        acc[item.copyType]!.push(item);
        return acc;
      },
      {}
    );
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorited,
    clearAll,
    groupedByType,
  };
}
