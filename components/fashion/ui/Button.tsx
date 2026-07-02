import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cx } from "./cx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-out-expo hover:-translate-y-1 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink-900 text-white shadow-softer hover:bg-brand-700 hover:shadow-soft",
  secondary:
    "border border-ink-200 bg-white text-ink-900 shadow-softer hover:border-brand-500 hover:text-brand-700 hover:shadow-soft",
  ghost: "text-ink-700 hover:text-brand-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = cx(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (props.href) {
    return (
      <Link className={classes} {...props}>
        {props.children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {props.children}
    </button>
  );
}
