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

  // The webpack persistent filesystem cache (.next/cache/webpack/**/*.pack.gz)
  // has been intermittently corrupting in this dev environment (ENOENT on its
  // own cache files, then cascading "Cannot find module './NNN.js'" 500s).
  // Disabling it in dev trades a bit of rebuild speed for not needing a manual
  // `rm -rf .next` + restart every time it happens. Production builds are
  // unaffected (only `dev` gets this).
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
