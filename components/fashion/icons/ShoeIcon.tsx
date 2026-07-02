import type { IconProps } from "./types";

export function ShoeIcon({ className }: IconProps) {
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
      <path d="M3 16.5c0-1.4.9-2.3 2.2-2.8L12 11c1-1.7 2.8-2.8 4.7-2.8.8 0 1.3.6 1.3 1.4v1.9c0 .8.6 1.5 1.5 1.5H21v2.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1z" />
      <path d="M3 16.5h18" />
      <path d="M9 11.2 10.5 14" />
    </svg>
  );
}
