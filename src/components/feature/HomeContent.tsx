"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/feature/ToolCard";
import { useAppContext } from "@/components/AppShell";

export function HomeContent(): React.ReactElement {
  const { searchQuery, setSearchQuery, filteredTools, searchPerformed } =
    useAppContext();
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(searchPerformed);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchPerformed && !hasSearchedOnce) {
      setHasSearchedOnce(true);
    }
  }, [searchPerformed, hasSearchedOnce]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setLocalSearch(value);
    setSearchQuery(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }

  function clearSearch(): void {
    setLocalSearch("");
    setSearchQuery("");
  }

  const isSearchActive = localSearch.length > 0;
  const shouldCenter = !hasSearchedOnce && !searchPerformed && !isSearchActive;

  return (
    <div className="absolute inset-0 w-full">
      <main
        className={`flex justify-center w-full min-h-screen p-4 md:p-8 ${
          shouldCenter ? "pt-0" : "pt-20"
        }`}
      >
        <div className="w-full max-w-2xl">
          <motion.div
            className={`w-full mx-auto ${
              shouldCenter
                ? "flex flex-col items-center justify-center min-h-[60vh]"
                : "mt-4 md:mt-18"
            }`}
            initial={false}
            animate={{
              y: searchPerformed || isSearchActive ? -20 : 0,
              scale: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {shouldCenter && (
                <motion.div
                  className="text-center mb-6 w-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0 }}
                >
                  <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
                  <p className="text-muted-foreground">
                    {t("subtitle")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="h-14 pr-12 pl-12 text-lg rounded-2xl shadow-md rtl:pr-12 rtl:pl-12 ltr:pl-12 ltr:pr-12"
                value={localSearch}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {localSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto"
                  onClick={clearSearch}
                >
                  <XCircle className="h-5 w-5" />
                  <span className="sr-only">{tCommon("close")}</span>
                </Button>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {(searchPerformed || isSearchActive) && localSearch.trim() !== "" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 w-full"
              >
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool, index) => (
                    <motion.div
                      key={tool.tool + index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-muted rounded-lg">
                    <p className="text-xl">
                      {t("noResults")} &quot;{localSearch}&quot;
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
