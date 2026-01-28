import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "www.datadoghq-browser-agent.com" },
    ],
  },
};

export default nextConfig;
