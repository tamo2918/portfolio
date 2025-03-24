/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/portfolio', // リポジトリ名がportfolioの場合
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 