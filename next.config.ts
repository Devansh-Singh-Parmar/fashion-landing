import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  basePath: "/fashion",

  assetPrefix: "https://zineps-landing-pages.vercel.app/",

  images: {
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
