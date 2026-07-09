"use client";

import { MapPinned, CalendarClock, PackageSearch, Recycle, Plug, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Section } from "@/components/fashion/ui/Section";
import { Reveal } from "@/components/fashion/motion/Reveal";
import type { FeatureItem } from "@/lib/i18n/dictionaries/types";

export function FeatureGrid() {
  const { dictionary } = useLanguage();
  const { featureGrid } = dictionary;

  const items: Array<{ icon: typeof MapPinned; item: FeatureItem }> = [
    { icon: MapPinned, item: featureGrid.items.tracking },
    { icon: CalendarClock, item: featureGrid.items.checkoutEstimates },
    { icon: PackageSearch, item: featureGrid.items.peakSeason },
    { icon: Recycle, item: featureGrid.items.insuredDelivery },
    { icon: Plug, item: featureGrid.items.integrations },
    { icon: BarChart3, item: featureGrid.items.analytics },
  ];

  return (
    <Section tone="plain" navTheme="light" className="bg-gradient-to-b from-paper to-[#F1F6F3]">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-800">{featureGrid.eyebrow}</p>
          <h2 className="max-w-[15ch] font-display text-[clamp(30px,4.6vw,52px)] font-medium leading-[1.05] tracking-[-0.01em] text-ink-900">
            {featureGrid.heading}
          </h2>
        </div>
        <p className="max-w-[34ch] text-[15.5px] leading-relaxed text-ink-600">{featureGrid.subheading}</p>
      </Reveal>

      <div className="grid grid-cols-1 border-t border-ink-900/[0.12] sm:grid-cols-2 sm:gap-x-12 lg:gap-x-20">
        {items.map(({ icon: Icon, item }, index) => (
          <Reveal key={item.title} delay={(index % 2) * 0.08}>
            <div className="group flex cursor-pointer gap-5 border-b border-ink-900/[0.12] py-8 sm:py-9">
              <span className="mt-1 font-mono text-[13px] tabular-nums text-ink-300 transition-colors duration-150 group-hover:text-brand-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="mb-2.5 flex items-start gap-3 text-brand-800">
                  <Icon className="mt-[3px] h-[22px] w-[22px] shrink-0" strokeWidth={2.1} aria-hidden="true" />
                  <h3 className="font-sans text-[19px] font-bold text-ink-900">{item.title}</h3>
                </div>
                <p className="text-[14.5px] leading-relaxed text-ink-600">{item.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
