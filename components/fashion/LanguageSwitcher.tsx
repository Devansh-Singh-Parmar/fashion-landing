"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { Language } from "@/lib/i18n/dictionaries/types";
import { cx } from "@/components/fashion/ui/cx";

const FLAGS: Record<Language, string> = {
  en: "🇬🇧",
  nl: "🇳🇱",
};

interface LanguageSwitcherProps {
  inverted?: boolean;
}

export function LanguageSwitcher({ inverted = false }: LanguageSwitcherProps) {
  const { language, setLanguage, dictionary } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const options: Array<{ value: Language; label: string }> = [
    { value: "en", label: dictionary.languageSwitcher.options.en },
    { value: "nl", label: dictionary.languageSwitcher.options.nl },
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cx(
          "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
          inverted
            ? "border-current bg-transparent text-current opacity-90 hover:opacity-100"
            : "border-ink-200 bg-white text-ink-800 hover:border-brand-500",
        )}
      >
        <span aria-hidden="true">{FLAGS[language]}</span>
        <span>{dictionary.languageSwitcher.current}</span>
        <ChevronDown className={cx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-soft"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={language === option.value}>
              <button
                type="button"
                onClick={() => {
                  setLanguage(option.value);
                  setOpen(false);
                }}
                className={cx(
                  "flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-brand-50",
                  language === option.value ? "font-semibold text-brand-700" : "text-ink-700",
                )}
              >
                <span aria-hidden="true">{FLAGS[option.value]}</span>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
