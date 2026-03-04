export interface ToolContent {
  tool: string;
  aliases: string[];
  process: string;
  sources: string[];
  chumrot: string[];
  notes?: string;
}

// Merged result used by components
export interface ToolData extends ToolContent {
  id: string;
  emoji: string;
}
