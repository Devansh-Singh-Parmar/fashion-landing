import type { HTMLAttributes } from "react";
import { cx } from "./cx";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl2 border border-ink-100 bg-white p-6 shadow-softer transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
