import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // basePath: '/portfolio', // リポジトリ名がportfolioの場合
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
