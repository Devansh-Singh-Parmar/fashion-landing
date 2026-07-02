"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { Reveal } from "@/components/fashion/motion/Reveal";
import { HangerIcon, ShoeIcon, BagIcon, GarmentTagIcon, WatchIcon } from "@/components/fashion/icons";

const CATEGORY_ICONS = [HangerIcon, ShoeIcon, BagIcon, GarmentTagIcon, WatchIcon, HangerIcon];

export function CategoryMarquee() {
  const { dictionary } = useLanguage();
  const { categoryStrip } = dictionary;
  const items = [...categoryStrip.items, ...categoryStrip.items];

  return (
    <section data-navtheme="light" className="snap-section overflow-hidden bg-paper py-16 sm:py-24">
      <Reveal>
        <p className="mb-10 text-center font-mono text-[12.5px] uppercase tracking-[0.14em] text-brand-800">
          {categoryStrip.label}
        </p>
      </Reveal>
      <span className="sr-only">{categoryStrip.label}</span>
      <div
        className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        aria-hidden="true"
      >
        {items.map((item, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length]!;
          return (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-3.5 whitespace-nowrap rounded-full border border-ink-900/10 bg-white px-6 py-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-500 hover:shadow-[0_8px_24px_rgba(112,202,185,0.2)]"
            >
              <Icon className="h-7 w-7 text-brand-800" />
              <span className="font-display text-2xl font-semibold text-ink-900">{item}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
