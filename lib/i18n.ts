import rawDictionary from "@/data/i18n.json";

export type Locale = "vi" | "en";

export const dictionary = rawDictionary as {
  vi: {
    nav: {
      services: string;
      caseStudies: string;
      insight: string;
      contact: string;
      cta: string;
    };
    hero: {
      badge: string;
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  en: {
    nav: {
      services: string;
      caseStudies: string;
      insight: string;
      contact: string;
      cta: string;
    };
    hero: {
      badge: string;
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
};