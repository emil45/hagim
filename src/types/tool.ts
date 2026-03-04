export interface ToolContent {
  tool: string;
  aliases: string[];
  process: string;
  sources: string[];
  chumrot: string[];
  notes?: string;
}

export interface ToolBase {
  id: string;
  emoji: string;
}

// Merged result used by components
export interface ToolData extends ToolBase, ToolContent {}
