"use client";

import { useMemo } from "react";
import { useMessages } from "next-intl";
import { glossaryTermsBase, GLOSSARY_TERM_IDS } from "@/lib/glossaryData";
import type { GlossaryTerm, GlossaryTermContent } from "@/types/glossary";

interface GlossaryMessages {
  glossaryTerms: Record<string, GlossaryTermContent>;
}

export function useLocalizedGlossary(): GlossaryTerm[] {
  const messages = useMessages() as unknown as GlossaryMessages;
  const glossaryTermsMessages = messages.glossaryTerms || {};

  const localizedTerms = useMemo(() => {
    return glossaryTermsBase.map((base) => {
      const content = glossaryTermsMessages[base.id];

      return {
        ...base,
        term: content?.term || base.id,
        definition: content?.definition || "",
        examples: content?.examples,
        sources: content?.sources,
        // Map related term IDs to their localized term names
        relatedTerms: base.relatedTerms?.map(
          (relId) => glossaryTermsMessages[relId]?.term || relId
        ),
      } as GlossaryTerm;
    });
  }, [glossaryTermsMessages]);

  return localizedTerms;
}

// Export term IDs for use in other components
export { GLOSSARY_TERM_IDS };
