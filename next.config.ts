import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  basePath: BASE_PATH,

  // Only set in production: in dev this would point the dev server's own
  // asset requests (CSS/JS/fonts) at the deployed origin instead of itself,
  // breaking `npm run dev` entirely.
  assetPrefix: process.env.NODE_ENV === "production" ? "https://zineps-landing-pages.vercel.app/" : undefined,

  images: {
    // Next's built-in image optimizer doesn't resolve local images correctly
    // once `basePath` is set (its internal self-fetch drops the prefix and
    // 400s). Images here are already small/pre-sized, so skipping the
    // optimization pipeline entirely is a safe, simple fix.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
