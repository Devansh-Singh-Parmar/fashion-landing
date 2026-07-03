import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  basePath: BASE_PATH,

  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://zineps-landing-pages.vercel.app/fashion"
      : undefined,

  images: {
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
