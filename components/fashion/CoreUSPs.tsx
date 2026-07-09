"use client";

import type { ComponentType } from "react";
import { Route, Globe2, Gift } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";
import { GarmentTagIcon } from "@/components/fashion/icons";
import type { IconProps } from "@/components/fashion/icons";
import type { CoreUspItem } from "@/lib/i18n/dictionaries/types";

export function CoreUSPs() {
  const { dictionary } = useLanguage();
  const { coreUsps } = dictionary;

  const items: Array<{ icon: ComponentType<IconProps>; item: CoreUspItem; tint: "brand" | "clay" }> = [
    { icon: Route, item: coreUsps.items.multiCarrier, tint: "brand" },
    { icon: GarmentTagIcon, item: coreUsps.items.returns, tint: "clay" },
    { icon: Globe2, item: coreUsps.items.international, tint: "brand" },
  ];

  return (
    <Section id="features" tone="plain" navTheme="light">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-800">{coreUsps.eyebrow}</p>
        <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(30px,4.6vw,52px)] font-medium leading-[1.05] tracking-[-0.01em] text-ink-900 text-balance">
          {coreUsps.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600 text-pretty">{coreUsps.subheading}</p>
      </Reveal>

      <div className="mt-14 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, item, tint }, index) => (
          <Reveal key={item.title} delay={index * 0.1}>
            <div className="flex h-full cursor-pointer flex-col items-start rounded-2xl border border-ink-900/[0.08] bg-white p-8 shadow-[0_1px_2px_rgba(20,50,44,0.05)] transition-[border-color,box-shadow] duration-150 hover:border-brand-300 hover:shadow-[0_2px_10px_rgba(20,50,44,0.08)]">
              <span
                className={
                  tint === "brand"
                    ? "flex h-14 w-14 items-center justify-center rounded-[13px] bg-brand-100 text-brand-800"
                    : "flex h-14 w-14 items-center justify-center rounded-[13px] bg-clay-100 text-clay-700"
                }
              >
                <Icon className="h-[30px] w-[30px]" aria-hidden="true" />
              </span>
              {item.badge ? (
                <span className="mt-[22px] inline-flex items-center gap-1.5 rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-white">
                  <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.badge}
                </span>
              ) : null}
              <h3 className="mt-[22px] font-sans text-[23px] font-bold text-ink-900">{item.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-600">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
