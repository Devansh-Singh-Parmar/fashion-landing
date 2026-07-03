"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { LanguageSwitcher } from "@/components/fashion/LanguageSwitcher";
import { cx } from "@/components/fashion/ui/cx";
import { BASE_PATH } from "@/lib/basePath";

type NavTheme = "light" | "dark";

/**
 * Tracks which `[data-navtheme]` section currently sits under a probe line
 * just below the fixed nav, so the nav can invert to light text over dark
 * sections (trust bar, case study, final CTA) without a hard visual seam.
 */
function useNavTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const probe = 34;
    let raf: number | null = null;

    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-navtheme]"));
      let next: NavTheme = "light";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          next = section.dataset.navtheme === "dark" ? "dark" : "light";
          break;
        }
      }
      setTheme((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return theme;
}

export function Nav() {
  const { dictionary } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useNavTheme();
  const isDark = theme === "dark";

  const links = [
    { href: "#features", label: dictionary.nav.links.features },
    { href: "#how-it-works", label: dictionary.nav.links.howItWorks },
    { href: "#story", label: dictionary.nav.links.story },
    { href: "#faq", label: dictionary.nav.links.faq },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        isDark ? "text-white" : "text-ink-900",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between px-6 sm:h-20 lg:px-8">
        <Link href="#top" className="flex cursor-pointer items-center">
          <Image
            src={`${BASE_PATH}/images/logo.png`}
            alt={dictionary.nav.logoAlt}
            width={390}
            height={100}
            priority
            className={cx("h-7 w-auto transition-[filter] duration-500 sm:h-8", isDark && "brightness-0 invert")}
          />
        </Link>

        <nav aria-label="Section links" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher inverted={isDark} />
          <a
            href="#contact"
            className="cursor-pointer whitespace-nowrap rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-paper transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-[#2d2d2d]"
          >
            {dictionary.nav.cta}
          </a>
        </div>

        <button
          type="button"
          className={cx(
            "flex cursor-pointer items-center justify-center rounded-lg border p-2 backdrop-blur-sm lg:hidden",
            isDark ? "border-white/30 bg-white/10 text-white" : "border-ink-200 bg-white/80 text-ink-800",
          )}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav-menu" className="border-t border-ink-100 bg-paper px-6 py-6 text-ink-900 shadow-soft lg:hidden">
          <nav aria-label="Section links" className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="cursor-pointer text-base font-medium text-ink-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-paper"
            >
              {dictionary.nav.cta}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
