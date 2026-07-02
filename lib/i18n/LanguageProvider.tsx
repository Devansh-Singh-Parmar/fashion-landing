"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { Dictionary, Language } from "./dictionaries/types";
import { en } from "./dictionaries/en";
import { nl } from "./dictionaries/nl";

const STORAGE_KEY = "language";

const dictionaries: Record<Language, Dictionary> = { en, nl };

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: Dictionary;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "nl") {
    return stored;
  }

  if (window.navigator.language.toLowerCase().startsWith("nl")) {
    return "nl";
  }

  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const initial = getInitialLanguage();
    setLanguageState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dictionary: dictionaries[language],
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
