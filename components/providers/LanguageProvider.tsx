"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale } from "@/lib/i18n";

type TranslationParams = Record<string, string | number>;

type LanguageContextValue = {
  locale: Locale;
  t: typeof dictionary.vi;
  tr: (key: string, fallback?: string, params?: TranslationParams) => string;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "t2m-locale";

function getValueByPath(source: unknown, path: string): unknown {
  if (!source || !path) return undefined;

  return path.split(".").reduce<unknown>((current, part) => {
    if (
      current &&
      typeof current === "object" &&
      part in current
    ) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, source);
}

function replaceParams(text: string, params?: TranslationParams) {
  if (!params) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = params[key];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (savedLocale === "vi" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };

  const toggleLocale = () => {
    setLocale(locale === "vi" ? "en" : "vi");
  };

  const tr = useMemo(() => {
    return (key: string, fallback = "", params?: TranslationParams) => {
      const currentValue = getValueByPath(dictionary[locale], key);
      const viValue = getValueByPath(dictionary.vi, key);

      const rawText =
        typeof currentValue === "string" && currentValue.trim()
          ? currentValue
          : typeof viValue === "string" && viValue.trim()
            ? viValue
            : fallback;

      return replaceParams(rawText, params);
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: dictionary[locale],
      tr,
      toggleLocale,
      setLocale,
    }),
    [locale, tr]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}