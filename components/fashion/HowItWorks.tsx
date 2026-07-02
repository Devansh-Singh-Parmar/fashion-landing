"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";

export function HowItWorks() {
  const { dictionary } = useLanguage();
  const { howItWorks } = dictionary;

  return (
    <Section id="how-it-works" tone="plain" navTheme="light">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-800">{howItWorks.subheading}</p>
        <h2 className="mx-auto max-w-[14ch] font-display text-[clamp(30px,4.6vw,52px)] font-medium leading-[1.05] tracking-[-0.01em] text-ink-900 text-balance">
          {howItWorks.heading}
        </h2>
      </Reveal>

      <ol className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((step, index) => (
          <Reveal key={step.title} as="li" delay={index * 0.1} className="group relative">
            <div className="font-display text-[56px] font-semibold leading-none text-brand-500 opacity-90 transition-transform duration-300 group-hover:-translate-y-1">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3.5 text-[19px] font-bold text-ink-900">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
