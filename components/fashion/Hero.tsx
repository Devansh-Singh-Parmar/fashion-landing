"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Container } from "@/components/fashion/ui/Container";
import { HeroBackground } from "@/components/fashion/motion/HeroBackground";
import { HeroMockUI } from "@/components/fashion/motion/HeroMockUI";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

export function Hero() {
  const { dictionary } = useLanguage();
  const { hero } = dictionary;
  const reduceMotion = useReducedMotion();

  return (
    <header
      id="top"
      data-navtheme="light"
      className="snap-section relative overflow-hidden pb-0 pt-[150px] text-center"
    >
      <HeroBackground />
      <Container className="relative z-[2] max-w-[1080px]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="mx-auto max-w-[24ch] font-display text-[clamp(2.4rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.015em] text-ink-900 text-balance"
          >
            <span className="block">{hero.headlineLine1}</span>
            <span className="block">
              {hero.headlineLine2} <em className="italic text-brand-800">{hero.headlineEmphasis}</em>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-600 text-pretty sm:text-xl"
          >
            {hero.subhead}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#contact"
              className="cursor-pointer rounded-[10px] bg-ink-900 px-7 py-3.5 text-base font-semibold text-paper shadow-[0_8px_24px_rgba(26,26,26,0.16)] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-[#2d2d2d]"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="cursor-pointer rounded-[10px] border-[1.5px] border-ink-900/15 bg-white px-7 py-3.5 text-base font-semibold text-ink-900 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-ink-900/40"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative z-[2] mx-auto mt-16 max-w-[1120px] pb-16 sm:pb-[70px]"
          style={{ perspective: 1800 }}
        >
          <HeroMockUI imageAlt={hero.imageAlt} />
        </motion.div>
      </Container>
    </header>
  );
}
