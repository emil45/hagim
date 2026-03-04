import type { ToolBase } from "@/types/tool";
import { yemenData } from "@/lib/tribeYemenData";
import { chabadData } from "@/lib/tribeChabadData";
import { ashkenazData } from "@/lib/tribeAshkenazData";
import { eastData } from "@/lib/tribeEastData";

export interface Tribe {
  id: string;
  disabled: boolean;
}

export const tribes: Tribe[] = [
  { id: "east", disabled: false },
  { id: "ashkenaz", disabled: true },
  { id: "chabad", disabled: true },
  { id: "teiman", disabled: true },
];

export const tribesData: Record<string, ToolBase[]> = {
  east: eastData,
  ashkenaz: ashkenazData,
  chabad: chabadData,
  teiman: yemenData,
};
