"use client";

import { useMemo } from "react";
import { useMessages } from "next-intl";
import type { ToolContent, ToolData } from "@/types/tool";
import { toolEmojis } from "@/lib/toolEmojis";

interface ToolsMessages {
  tools: Record<string, Record<string, ToolContent>>;
}

export function useLocalizedTools(tribeId: string): ToolData[] {
  const messages = useMessages() as unknown as ToolsMessages;

  return useMemo(() => {
    const tribeTools = messages.tools?.[tribeId] || {};

    return Object.entries(tribeTools).map(([id, content]): ToolData => ({
      id,
      emoji: toolEmojis[id] || "❓",
      tool: content?.tool || id,
      aliases: content?.aliases || [],
      process: content?.process || "",
      sources: content?.sources || [],
      chumrot: content?.chumrot || [],
      notes: content?.notes,
    }));
  }, [tribeId, messages]);
}
