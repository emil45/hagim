export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  examples?: string[];
  relatedTerms?: string[];
  sources?: string[];
}
