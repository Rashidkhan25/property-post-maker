import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keeps static generation reliable on resource-constrained CI runners.
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
