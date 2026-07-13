/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const config = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
} satisfies NextConfig;

export default config;
