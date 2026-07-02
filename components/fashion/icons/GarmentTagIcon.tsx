import type { IconProps } from "./types";

export function GarmentTagIcon({ className }: IconProps) {
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
      <path d="M3 10.5V5a2 2 0 0 1 2-2h5.5L20 12.5 12.5 20 3 10.5Z" />
      <circle cx="7.5" cy="7.5" r="1.25" />
    </svg>
  );
}
