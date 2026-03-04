"use client";

import { useMemo } from "react";
import { useMessages } from "next-intl";
import type { ToolBase, ToolContent, ToolData } from "@/types/tool";
import { tribesData } from "@/lib/data";

interface ToolsMessages {
  tools: Record<string, Record<string, ToolContent>>;
}

export function useLocalizedTools(tribeId: string): ToolData[] {
  const messages = useMessages() as unknown as ToolsMessages;

  return useMemo(() => {
    const baseTools = tribesData[tribeId] ?? [];
    const tribeTools = messages.tools?.[tribeId] || {};

    return baseTools.map((base: ToolBase): ToolData => {
      const content = tribeTools[base.id];

      return {
        ...base,
        tool: content?.tool || base.id,
        aliases: content?.aliases || [],
        process: content?.process || "",
        sources: content?.sources || [],
        chumrot: content?.chumrot || [],
        notes: content?.notes,
      };
    });
  }, [tribeId, messages]);
}
