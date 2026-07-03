"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Container } from "@/components/fashion/ui/Container";
import { BASE_PATH } from "@/lib/basePath";

const FOOTER_LINK_HREFS = {
  product: ["#features", "#how-it-works", "#faq"],
  company: ["#story", "#contact"],
};

export function Footer() {
  const { dictionary } = useLanguage();
  const { footer } = dictionary;

  return (
    <footer className="border-t border-ink-900/[0.08] bg-paper pb-10 pt-12 sm:pt-[72px]">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-[300px]">
            <Image
              src={`${BASE_PATH}/images/logo.png`}
              alt={dictionary.nav.logoAlt}
              width={390}
              height={100}
              className="mb-4 h-7 w-auto"
            />
            <p className="text-[14.5px] leading-relaxed text-ink-600">{footer.description}</p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-[72px]">
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="mb-0.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-400">
                {footer.productsHeading}
              </span>
              {footer.productLinks.map((link, index) => (
                <a
                  key={link}
                  href={FOOTER_LINK_HREFS.product[index]}
                  className="text-ink-600 transition-colors hover:text-ink-900"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="mb-0.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-400">
                {footer.companyHeading}
              </span>
              {footer.companyLinks.map((link, index) => (
                <a
                  key={link}
                  href={FOOTER_LINK_HREFS.company[index]}
                  className="text-ink-600 transition-colors hover:text-ink-900"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/[0.07] pt-[22px]">
          <span className="flex items-center gap-2.5 text-[13px] text-ink-400">
            <Image
              src={`${BASE_PATH}/images/logo-icon.png`}
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
              className="h-5 w-5"
            />
            {footer.copyright}
          </span>
          <span className="font-mono text-[11.5px] tracking-[0.04em] text-ink-400">{footer.madeLine}</span>
        </div>
      </Container>
    </footer>
  );
}
