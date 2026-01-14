import { GlossaryTermBase } from "@/types/glossary";

export const glossaryTermsBase: GlossaryTermBase[] = [
  {
    id: "chametz",
    relatedTerms: ["seor", "biur-chametz"],
  },
  {
    id: "seor",
    relatedTerms: ["chametz"],
  },
  {
    id: "hagala",
    relatedTerms: ["kli-rishon", "iruy", "libun-kal"],
  },
  {
    id: "libun-kal",
    relatedTerms: ["hagala", "libun-chamur"],
  },
  {
    id: "libun-chamur",
    relatedTerms: ["libun-kal", "hagala"],
  },
  {
    id: "iruy",
    relatedTerms: ["hagala", "kli-rishon"],
  },
  {
    id: "iruy-kli-rishon",
    relatedTerms: ["iruy", "hagala", "kli-rishon"],
  },
  {
    id: "kli-rishon",
    relatedTerms: ["hagala", "iruy"],
  },
  {
    id: "kli-sheni",
    relatedTerms: ["kli-rishon", "iruy"],
  },
  {
    id: "ben-yomo",
    relatedTerms: ["hagala", "libun-kal"],
  },
  {
    id: "biur-chametz",
    relatedTerms: ["chametz"],
  },
  {
    id: "matza-shmura",
    relatedTerms: ["matza-ashira", "chametz"],
  },
  {
    id: "matza-ashira",
    relatedTerms: ["matza-shmura", "chametz"],
  },
  {
    id: "kitniyot",
    relatedTerms: ["chametz", "taarovet-chametz"],
  },
  {
    id: "even-melubenet",
    relatedTerms: ["iruy", "hagala", "kebolao-kach-polto"],
  },
  {
    id: "kebolao-kach-polto",
    relatedTerms: ["hagala", "libun-kal", "libun-chamur"],
  },
  {
    id: "taarovet-chametz",
    relatedTerms: ["chametz"],
  },
];

// Term IDs for type safety
export const GLOSSARY_TERM_IDS = [
  "chametz",
  "seor",
  "hagala",
  "libun-kal",
  "libun-chamur",
  "iruy",
  "iruy-kli-rishon",
  "kli-rishon",
  "kli-sheni",
  "ben-yomo",
  "biur-chametz",
  "matza-shmura",
  "matza-ashira",
  "kitniyot",
  "even-melubenet",
  "kebolao-kach-polto",
  "taarovet-chametz",
] as const;

export type GlossaryTermId = (typeof GLOSSARY_TERM_IDS)[number];
