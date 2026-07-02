import type { IconProps } from "./types";

/**
 * lucide-react has no hanger glyph; this is a minimal hand-drawn substitute
 * kept visually consistent with lucide's 24x24 / 2px stroke convention.
 */
export function HangerIcon({ className }: IconProps) {
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
      <path d="M12 4a1.5 1.5 0 1 1 1.5 1.5" />
      <path d="M12 5.5v2" />
      <path d="M3 19h18" />
      <path d="M12 7.5 3 15c-.6.5-.3 1.5.5 1.5h17c.8 0 1.1-1 .5-1.5l-9-7.5Z" />
    </svg>
  );
}
