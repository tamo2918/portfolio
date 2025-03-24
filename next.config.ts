import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',  // GitHub Pagesでの静的ホスティング用
  // リポジトリ名がportfolioの場合、以下のようにbasePath設定（リポジトリ名と一致させる）
  // basePath: '/portfolio',
  images: {
    unoptimized: true,  // 静的出力のため画像最適化を無効化
    domains: ['assets.st-note.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.st-note.com',
        pathname: '/production/uploads/images/**',
      },
    ],
  },
};

export default nextConfig;
