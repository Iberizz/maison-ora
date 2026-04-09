import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['maison-ora.vercel.app'],
    },
  },
  reactCompiler: true,
};

export default nextConfig;
