"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hagim-checklist";

interface UseChecklistReturn {
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  resetAll: () => void;
  checkedCount: number;
  isLoaded: boolean;
}

export function useChecklist(toolIds: string[]): UseChecklistReturn {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((next: Record<string, boolean>) => {
    setChecked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = { ...checked, [id]: !checked[id] };
      persist(next);
    },
    [checked, persist],
  );

  const resetAll = useCallback(() => {
    persist({});
  }, [persist]);

  const checkedCount = toolIds.filter((id) => checked[id]).length;

  return { checked, toggle, resetAll, checkedCount, isLoaded };
}
