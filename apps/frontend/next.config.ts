import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ["http://132.232.160.223:3000"],
  },
};

export default nextConfig;
