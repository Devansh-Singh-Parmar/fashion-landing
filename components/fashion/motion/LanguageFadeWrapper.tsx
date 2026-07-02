"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/useLanguage";

/**
 * Cross-fades page content when the language changes. Animates opacity down
 * and back up in place (rather than keying on language, which would remount
 * children and reset scroll-reveal / accordion / form state).
 */
export function LanguageFadeWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (reduceMotion) {
      return;
    }

    controls.start({
      opacity: [1, 0, 1],
      transition: { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut" },
    });
  }, [language, controls, reduceMotion]);

  return <motion.div animate={controls}>{children}</motion.div>;
}
