"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTag = "div" | "li";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: RevealTag;
  id?: string;
}

/**
 * Scroll-triggered fade/slide-in, once per element. Falls back to a plain
 * wrapper (no animation) when the user has prefers-reduced-motion enabled.
 */
export function Reveal({ children, delay = 0, y = 24, duration = 0.6, className, as = "div", id }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    if (as === "li") {
      return (
        <li id={id} className={className}>
          {children}
        </li>
      );
    }
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  if (as === "li") {
    return (
      <motion.li
        id={id}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={variants}
        transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
