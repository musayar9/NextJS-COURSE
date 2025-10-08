import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: { position: "top-right" }, // HMR (Hot Reload) göstergesinin konumu
  logging: { fetches: { fullUrl: true } }, // Fetch loglarında tam URL görünsün

  experimental: { ppr: "incremental" },
};

export default nextConfig;
