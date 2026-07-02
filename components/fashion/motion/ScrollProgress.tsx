"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin fixed progress bar tracking scroll position through the page — the
 * "scroller" half of the scroll-stopper/scroller pairing. Spring-smoothed so
 * it doesn't feel like it's stepping in sync with raw scroll events.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-600 to-clay-500"
    />
  );
}
