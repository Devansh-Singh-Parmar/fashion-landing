import type { HTMLAttributes } from "react";
import { cx } from "./cx";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full max-w-container px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}
