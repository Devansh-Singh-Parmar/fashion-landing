import type { HTMLAttributes } from "react";
import { Container } from "./Container";
import { cx } from "./cx";

type SectionTone = "plain" | "muted" | "gradient" | "dark";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  containerClassName?: string;
  showGrid?: boolean;
  navTheme?: "light" | "dark";
}

const toneClasses: Record<SectionTone, string> = {
  plain: "bg-paper",
  muted: "bg-ink-50",
  gradient: "bg-brand-gradient",
  dark: "bg-ink-900 text-white",
};

export function Section({
  tone = "plain",
  className,
  containerClassName,
  showGrid = false,
  navTheme,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-navtheme={navTheme}
      className={cx("snap-section relative overflow-hidden py-16 sm:py-20 lg:py-28", toneClasses[tone], className)}
      {...props}
    >
      {showGrid ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(112,202,185,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(112,202,185,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      ) : null}
      <Container className={cx("relative", containerClassName)}>{children}</Container>
    </section>
  );
}
