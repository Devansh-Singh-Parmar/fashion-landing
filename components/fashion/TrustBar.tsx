"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";
import { cx } from "@/components/fashion/ui/cx";

const LOGO_STYLES = [
  "font-display text-2xl font-semibold tracking-wide",
  "font-mono text-xl font-bold",
  "font-sans text-[23px] font-extrabold tracking-tight",
  "font-display text-2xl italic font-medium",
  "font-sans text-[22px] font-light tracking-[0.22em]",
];

export function TrustBar() {
  const { dictionary } = useLanguage();
  const { trustBar } = dictionary;

  return (
    <Section tone="dark" navTheme="dark" containerClassName="text-center" className="pt-[110px] pb-[60px] sm:py-[110px]">
      <Reveal className="mx-auto max-w-[1100px]">
        <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-500">{trustBar.tagline}</p>
        <h2 className="mx-auto max-w-[22ch] font-display text-[clamp(24px,3.4vw,36px)] font-medium leading-[1.15] text-[#F6F3EE]">
          {trustBar.heading}
        </h2>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-16">
          {trustBar.logos.map((logo, index) => (
            <span
              key={logo}
              className={cx(
                "cursor-default text-[#cfd4d1] grayscale transition-all duration-300 hover:text-white hover:grayscale-0 motion-reduce:transition-none",
                LOGO_STYLES[index % LOGO_STYLES.length],
              )}
            >
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
