"use client";

import { useState, useMemo, KeyboardEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen, XCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalizedGlossary } from "@/hooks/useLocalizedGlossary";
import type { GlossaryTerm } from "@/types/glossary";

function filterAndSortTerms(terms: GlossaryTerm[], query: string): GlossaryTerm[] {
  if (query.trim() === "") {
    return terms;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const exactMatches: GlossaryTerm[] = [];
  const partialMatches: GlossaryTerm[] = [];
  const otherMatches: GlossaryTerm[] = [];

  for (const term of terms) {
    const termLower = term.term.toLowerCase();

    if (termLower === normalizedQuery) {
      exactMatches.push(term);
    } else if (termLower.includes(normalizedQuery)) {
      partialMatches.push(term);
    } else if (
      term.definition.toLowerCase().includes(normalizedQuery) ||
      term.examples?.some((ex) => ex.toLowerCase().includes(normalizedQuery)) ||
      term.relatedTerms?.some((rel) => rel.toLowerCase().includes(normalizedQuery))
    ) {
      otherMatches.push(term);
    }
  }

  return [...exactMatches, ...partialMatches, ...otherMatches];
}

export function GlossaryContent(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("glossary");
  const tCommon = useTranslations("common");
  const glossaryTerms = useLocalizedGlossary();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(
    () => filterAndSortTerms(glossaryTerms, searchQuery),
    [glossaryTerms, searchQuery]
  );

  function handleClearSearch(): void {
    setSearchQuery("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/${locale}`)}
            className="mr-4 rtl:mr-4 ltr:ml-4 ltr:mr-0"
          >
            <ArrowRight className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            <span className="sr-only">{t("backToHome")}</span>
          </Button>
          <h1 className="text-3xl font-bold mr-3 rtl:mr-3 ltr:ml-3 ltr:mr-0">
            {t("title")}
          </h1>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="h-12 pr-12 pl-12 text-lg rounded-2xl shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto"
                onClick={handleClearSearch}
              >
                <XCircle className="h-5 w-5" />
                <span className="sr-only">{tCommon("clearSearch")}</span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((term) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">{term.term}</CardTitle>
                  <CardDescription className="text-lg mt-2 text-foreground/80">
                    {term.definition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {term.examples && term.examples.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-medium">{t("examples")}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {term.examples.map((example, index) => (
                          <li key={index} className="text-sm">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {term.sources && term.sources.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-medium">{t("sources")}</h3>
                      </div>
                      <ul className="space-y-1">
                        {term.sources.map((source, index) => (
                          <li
                            key={index}
                            className="text-sm relative pr-4 before:absolute before:content-['•'] before:right-0 before:text-primary text-muted-foreground rtl:pr-4 rtl:before:right-0 ltr:pl-4 ltr:pr-0 ltr:before:left-0 ltr:before:right-auto"
                          >
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <CardFooter className="border-t pt-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        {t("relatedTerms")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm, index) => (
                          <Badge key={index} variant="secondary">
                            {relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center p-8 bg-muted rounded-lg max-w-md mx-auto mt-8">
            <p className="text-xl">
              {t("noResults")} &quot;{searchQuery}&quot;
            </p>
            <p className="text-muted-foreground mt-2">{t("tryAnother")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
