import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "m1r.ai",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "up.m1r.ai",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/*",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
