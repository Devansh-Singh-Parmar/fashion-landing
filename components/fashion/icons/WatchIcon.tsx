import type { IconProps } from "./types";

export function WatchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 4h6l.6 3.2H8.4L9 4Z" />
      <path d="M9 20h6l.6-3.2H8.4L9 20Z" />
      <circle cx="12" cy="12" r="4.8" />
      <path d="M12 9.8V12l1.6 1.2" />
    </svg>
  );
}
