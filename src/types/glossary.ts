export interface GlossaryTermContent {
  term: string;
  definition: string;
  examples?: string[];
  sources?: string[];
}

export interface GlossaryTermBase {
  id: string;
  relatedTerms?: string[];
}

export interface GlossaryTerm extends GlossaryTermBase, GlossaryTermContent {}

export type GlossaryTermsMessages = Record<string, GlossaryTermContent>;
