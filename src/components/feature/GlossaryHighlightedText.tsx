"use client";

import { useMemo } from "react";
import { useLocalizedGlossary } from "@/hooks/useLocalizedGlossary";
import { segmentTextWithGlossary } from "@/lib/glossaryMatcher";
import { GlossaryPopover } from "@/components/feature/GlossaryPopover";

interface GlossaryHighlightedTextProps {
  text: string;
}

export function GlossaryHighlightedText({
  text,
}: GlossaryHighlightedTextProps): React.ReactElement {
  const glossaryTerms = useLocalizedGlossary();

  const segments = useMemo(
    () => segmentTextWithGlossary(text, glossaryTerms),
    [text, glossaryTerms]
  );

  return (
    <>
      {segments.map((segment, index) =>
        segment.type === "term" ? (
          <GlossaryPopover key={index} term={segment.term}>
            {segment.value}
          </GlossaryPopover>
        ) : (
          segment.value
        )
      )}
    </>
  );
}
