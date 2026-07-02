"use client";

import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";
import { AnimatedCounter } from "@/components/fashion/motion/AnimatedCounter";
import { CaseStudyVideo } from "@/components/fashion/CaseStudyVideo";

export function CaseStudy() {
  const { dictionary } = useLanguage();
  const { caseStudy } = dictionary;

  return (
    <Section
      id="story"
      tone="dark"
      navTheme="dark"
      className="bg-ink950 text-[#F6F3EE]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(112,202,185,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(112,202,185,0.06) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-500">{caseStudy.eyebrow}</p>
        <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(28px,4.4vw,48px)] font-medium leading-[1.08] text-[#F6F3EE] text-balance">
          {caseStudy.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#c7d0cc] text-pretty">{caseStudy.subheading}</p>
      </Reveal>

      <div className="mt-12 grid gap-11 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <CaseStudyVideo playLabel={caseStudy.playLabel} videoTitle={caseStudy.videoTitle} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-center gap-7">
          <dl className="grid grid-cols-3 gap-3">
            {caseStudy.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="truncate font-display text-[clamp(17px,2.2vw,28px)] font-semibold leading-none text-brand-500">
                  <AnimatedCounter value={stat.value} />
                </dd>
                <p className="mt-1.5 text-[12.5px] leading-tight text-[#a9b3af]">{stat.label}</p>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-6">
            {caseStudy.quotes.map((quote, index) => (
              <blockquote
                key={quote.name}
                className={
                  index === 0
                    ? "m-0 border-l-2 border-brand-500 pl-5 font-display text-[clamp(19px,2.4vw,25px)] italic leading-[1.4] text-[#F6F3EE]"
                    : "m-0 border-l-2 border-white/10 pl-5 text-[15.5px] leading-relaxed text-[#c7d0cc]"
                }
              >
                {index === 0 ? <Quote className="mb-2 h-4 w-4 text-brand-500" aria-hidden="true" /> : null}
                <span>&ldquo;{quote.quote}&rdquo;</span>
                <footer
                  className={
                    index === 0
                      ? "mt-4 font-sans text-sm font-semibold not-italic text-brand-300"
                      : "mt-2.5 text-[13.5px] font-semibold text-brand-300"
                  }
                >
                  {quote.name}
                  <span className="font-normal text-[#a9b3af]"> · {quote.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
