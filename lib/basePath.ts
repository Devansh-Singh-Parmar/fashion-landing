// Single source of truth for the app's basePath, shared between next.config.ts
// (which needs it as plain Node-importable config) and any component that
// hardcodes a path into `/public` (next/link and next/router prefix
// automatically, but raw strings passed to next/image src or <source src>
// don't). Keep this in sync with next.config.ts's `basePath`, or better,
// delete both together when this page is merged into a repo that owns "/".
export const BASE_PATH = "/fashion";
