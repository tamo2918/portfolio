import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['assets.st-note.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.st-note.com',
        pathname: '/production/uploads/images/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
