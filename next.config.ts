import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // basePath: '/portfolio', // リポジトリ名がportfolioの場合
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
