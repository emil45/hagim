"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedPath } from "@/lib/locale";
import { useAppContext } from "@/components/AppShell";
import { useLocalizedTools } from "@/hooks/useLocalizedTools";
import { useChecklist } from "@/hooks/useChecklist";

const REORDER_DELAY = 400;

export function ChecklistContent(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("checklist");
  const { selectedTribe } = useAppContext();

  const tools = useLocalizedTools(selectedTribe);
  const toolIds = tools.map((tool) => tool.id);
  const { checked, toggle, resetAll, checkedCount, isLoaded } =
    useChecklist(toolIds);

  // Track which item is currently animating (just checked)
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  // Delay the sort so the check animation plays first
  const [pendingSort, setPendingSort] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleToggle = useCallback(
    (id: string) => {
      const wasChecked = !!checked[id];
      toggle(id);

      if (!wasChecked) {
        // Checking: animate first, then reorder after delay
        setAnimatingId(id);
        setPendingSort((prev) => ({ ...prev, [id]: true }));

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setAnimatingId(null);
          setPendingSort({});
        }, REORDER_DELAY);
      } else {
        // Unchecking: reorder immediately
        setPendingSort({});
      }
    },
    [checked, toggle],
  );

  const handleReset = useCallback(() => {
    setAnimatingId(null);
    setPendingSort({});
    resetAll();
  }, [resetAll]);

  // Sort: unchecked first, checked last. Use pendingSort to delay moving newly-checked items.
  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => {
      const aChecked = !!checked[a.id] && !pendingSort[a.id];
      const bChecked = !!checked[b.id] && !pendingSort[b.id];
      if (aChecked === bChecked) return 0;
      return aChecked ? 1 : -1;
    });
  }, [tools, checked, pendingSort]);

  const total = tools.length;
  const progressPercent =
    total > 0 ? Math.round((checkedCount / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(getLocalizedPath("/", locale))}
            className="mr-4 rtl:mr-4 ltr:ml-4 ltr:mr-0"
          >
            <ArrowRight className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            <span className="sr-only">{t("backToHome")}</span>
          </Button>
          <h1 className="text-3xl font-bold mr-3 rtl:mr-3 ltr:ml-3 ltr:mr-0">
            {t("title")}
          </h1>
        </div>

        <p className="text-muted-foreground mb-6">{t("subtitle")}</p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {t("progress", { done: checkedCount, total })}
            </span>
            <span className="text-sm text-muted-foreground">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Reset button */}
        {checkedCount > 0 && (
          <div className="mb-6">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 ml-2 rtl:ml-2 ltr:mr-2 ltr:ml-0" />
              {t("resetAll")}
            </Button>
          </div>
        )}

        {/* Tool checklist */}
        {isLoaded && (
          <div className="space-y-2">
            {sortedTools.map((tool) => {
              const isChecked = !!checked[tool.id];
              const isAnimating = animatingId === tool.id;
              return (
                <label
                  key={tool.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-all duration-300 ${
                    isAnimating
                      ? "scale-[0.97] opacity-60"
                      : "scale-100 opacity-100"
                  } ${isChecked && !isAnimating ? "bg-muted/30" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(tool.id)}
                    className="h-5 w-5 rounded border-border accent-primary shrink-0"
                  />
                  <span
                    className={`text-lg transition-all duration-300 ${
                      isChecked
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {tool.emoji} {tool.tool}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
