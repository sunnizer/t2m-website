import rawDictionary from "@/data/i18n.json";

export type Locale = "vi" | "en";

export type DictionaryValue = string | DictionaryTree;

export type DictionaryTree = {
  [key: string]: DictionaryValue;
};

export type Dictionary = Record<Locale, DictionaryTree>;

export const dictionary = rawDictionary as Dictionary;
