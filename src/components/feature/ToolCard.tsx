"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle, BookOpen, Fence } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ToolData } from "@/types/tool";
import { useIsIOS } from "@/hooks/useIsIOS";

interface ToolCardProps {
  tool: ToolData;
}

export function ToolCard({ tool }: ToolCardProps): React.ReactElement {
  const isIOS = useIsIOS();
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("home");

  function toggleExpanded(): void {
    setIsExpanded((prev) => !prev);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Card Header with Emoji and Title */}
          <div className="relative overflow-hidden">
            <div className="px-5 pb-3 flex items-start gap-4">
              <div
                className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary text-2xl
                  ${isIOS ? "pt-2" : ""}`}
              >
                {tool.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{tool.tool}</h3>
                {tool.aliases.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tool.aliases.map((alias, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`text-xs font-normal ${isIOS ? "pt-1" : ""}`}
                      >
                        {alias}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Body with Process */}
          <div className="px-5 py-3 border-t border-b border-border/50 bg-muted/30">
            <p className="text-lg leading-relaxed">{tool.process}</p>
            {tool.notes && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tool.notes}</p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch p-0">
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-1 w-full rounded-none h-10 text-muted-foreground hover:text-foreground"
            onClick={toggleExpanded}
          >
            <span className="text-sm">
              {isExpanded ? t("hideMore") : t("showMore")}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-3 space-y-4 bg-muted/20">
                  {tool.sources.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h4 className="font-medium text-sm">{t("sources")}</h4>
                      </div>
                      <ul className="space-y-1.5 text-muted-foreground">
                        {tool.sources.map((source, index) => (
                          <li
                            key={index}
                            className="text-sm relative pr-4 before:absolute before:content-['•'] before:right-0 before:text-primary rtl:pr-4 rtl:before:right-0 ltr:pl-4 ltr:pr-0 ltr:before:left-0 ltr:before:right-auto"
                          >
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tool.chumrot.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Fence className="h-4 w-4 text-primary" />
                        <h4 className="font-medium text-sm">{t("stringencies")}</h4>
                      </div>
                      <ul className="space-y-1.5 text-muted-foreground">
                        {tool.chumrot.map((chumra, index) => (
                          <li
                            key={index}
                            className="text-sm relative pr-4 before:absolute before:content-['•'] before:right-0 before:text-primary/70 rtl:pr-4 rtl:before:right-0 ltr:pl-4 ltr:pr-0 ltr:before:left-0 ltr:before:right-auto"
                          >
                            {chumra}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
