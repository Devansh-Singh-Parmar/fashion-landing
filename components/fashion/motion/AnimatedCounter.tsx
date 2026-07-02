"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { Language } from "@/lib/i18n/dictionaries/types";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const LOCALE_SEPARATORS: Record<Language, { decimal: string; group: string }> = {
  en: { decimal: ".", group: "," },
  nl: { decimal: ",", group: "." },
};

function parseLocalizedNumber(value: string, decimalChar: string, groupChar: string) {
  const suffixMatch = value.match(/[^\d.,]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  let numeric = suffix ? value.slice(0, -suffix.length) : value;
  numeric = numeric.split(groupChar).join("");
  if (decimalChar !== ".") {
    numeric = numeric.replace(decimalChar, ".");
  }
  const decimals = numeric.includes(".") ? numeric.split(".")[1]?.length ?? 0 : 0;
  const target = parseFloat(numeric);
  return { target, suffix, decimals };
}

function formatLocalized(current: number, decimals: number, decimalChar: string, groupChar: string, suffix: string) {
  const fixed = current.toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const withGroups = (intPart ?? "0").replace(/\B(?=(\d{3})+(?!\d))/g, groupChar);
  const result = fracPart ? `${withGroups}${decimalChar}${fracPart}` : withGroups;
  return `${result}${suffix}`;
}

/**
 * Counts up from 0 to the numeric value embedded in a localized display
 * string (e.g. "200+", "99.9%", "367,000+" in EN or "367.000+" in NL) once
 * it scrolls into view. Thousands-group and decimal separators are resolved
 * from the active language, since EN and NL disagree on "," vs ".".
 */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const { decimal, group } = LOCALE_SEPARATORS[language];
  const [display, setDisplay] = useState(() => formatLocalized(0, 0, decimal, group, ""));

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const { target, suffix, decimals } = parseLocalizedNumber(value, decimal, group);

    if (reduceMotion) {
      setDisplay(formatLocalized(target, decimals, decimal, group, suffix));
      return;
    }

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatLocalized(latest, decimals, decimal, group, suffix)),
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, value, decimal, group]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
