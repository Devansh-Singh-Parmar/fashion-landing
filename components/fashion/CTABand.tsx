"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { ContactForm } from "@/components/fashion/ContactForm";
import { Reveal } from "@/components/fashion/motion/Reveal";

export function CTABand() {
  const { dictionary } = useLanguage();
  const { ctaBand, contactForm } = dictionary;

  return (
    <Section id="contact" tone="plain" navTheme="dark">
      <Reveal>
        <div className="relative overflow-hidden rounded-[26px] bg-cta-gradient px-6 py-11 text-center sm:px-10 sm:py-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(80% 120% at 100% 0%, rgba(112,202,185,0.28), transparent 60%)",
            }}
          />
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute -bottom-3.5 -left-2.5 h-[70px] w-[70px] text-brand-500 opacity-30"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M50 20a6 6 0 106 6c0-3-6-6-6-6" />
              <path d="M50 32v6l-30 20a4 4 0 002 8h56a4 4 0 002-8L52 38" />
            </g>
          </svg>

          <div className="relative">
            <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(30px,5vw,56px)] font-medium leading-[1.03] tracking-[-0.01em] text-[#F6F3EE]">
              {ctaBand.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[clamp(16px,2vw,19px)] leading-relaxed text-[#b9c3bf] text-pretty">
              {ctaBand.subheading}
            </p>
            <div className="mt-[34px] flex flex-wrap justify-center gap-3.5">
              <a
                href="#demo-form"
                className="cursor-pointer rounded-[10px] bg-brand-500 px-8 py-3.5 text-base font-bold text-ink950  transition-all duration-300 ease-out-expo hover:-translate-y-0.5 "
              >
                {ctaBand.primaryCta}
              </a>
              <a
                href="#features"
                className="cursor-pointer rounded-[10px] border-[1.5px] border-white/25 px-8 py-3.5 text-base font-semibold text-[#F6F3EE] transition-colors duration-300 hover:border-white/60"
              >
                {dictionary.nav.links.features}
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal
        id="demo-form"
        delay={0.1}
        className="mx-auto mt-14 max-w-2xl scroll-mt-24 text-center sm:mt-16"
      >
        <h3 className="font-display text-2xl font-medium text-ink-900">
          {contactForm.heading}
        </h3>
        <p className="mt-2 text-sm text-ink-600">{contactForm.subheading}</p>
        <div className="mt-6 text-left">
          <ContactForm />
        </div>
      </Reveal>
    </Section>
  );
}
