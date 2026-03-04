import type { GlossaryTerm } from "@/types/glossary";

export type Segment =
  | { type: "text"; value: string }
  | { type: "term"; value: string; term: GlossaryTerm };

export function segmentTextWithGlossary(
  text: string,
  terms: GlossaryTerm[]
): Segment[] {
  // Build a flat list of all patterns with their associated terms
  const patternEntries: { pattern: string; term: GlossaryTerm }[] = [];
  for (const term of terms) {
    if (term.matchPatterns) {
      for (const pattern of term.matchPatterns) {
        patternEntries.push({ pattern, term });
      }
    }
  }

  if (patternEntries.length === 0) {
    return [{ type: "text", value: text }];
  }

  // Sort by pattern length descending (longest match first)
  patternEntries.sort((a, b) => b.pattern.length - a.pattern.length);

  // Build a regex that matches any of the patterns (case-insensitive)
  const escapedPatterns = patternEntries.map((e) =>
    e.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escapedPatterns.join("|")})`, "gi");

  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add preceding text
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    // Find the matching term (case-insensitive comparison)
    const matchedText = match[0];
    const matchedLower = matchedText.toLowerCase();
    const entry = patternEntries.find(
      (e) => e.pattern.toLowerCase() === matchedLower
    );

    if (entry) {
      segments.push({ type: "term", value: matchedText, term: entry.term });
    } else {
      segments.push({ type: "text", value: matchedText });
    }

    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}
