import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: { position: "top-right" }, // HMR (Hot Reload) göstergesinin konumu

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  logging: { fetches: { fullUrl: true } }, // Fetch loglarında tam URL görünsün

  experimental: { ppr: "incremental", authInterrupts: true, taint: true },
};

export default nextConfig;
