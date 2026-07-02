"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";
import { cx } from "@/components/fashion/ui/cx";

export function FAQ() {
  const { dictionary } = useLanguage();
  const { faq } = dictionary;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="faq" tone="plain" navTheme="light" containerClassName="max-w-[820px]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-800">{faq.subheading}</p>
        <h2 className="font-display text-[clamp(30px,4.6vw,48px)] font-medium leading-[1.05] text-ink-900 text-balance">
          {faq.heading}
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 flex flex-col gap-3">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-trigger-${index}`;

          return (
            <Reveal key={item.question} delay={index * 0.06} y={12}>
              <div
                className={cx(
                  "overflow-hidden rounded-[13px] border bg-white transition-colors duration-300",
                  isOpen ? "border-brand-500/60" : "border-ink-900/10",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-[22px] py-5 text-left"
                  >
                    <span className="text-[17px] font-semibold text-ink-900">{item.question}</span>
                    <Plus
                      className={cx(
                        "h-6 w-6 shrink-0 text-brand-500 transition-transform duration-300 ease-out-expo",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-[22px] pb-[22px] text-[15px] leading-relaxed text-ink-600">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
