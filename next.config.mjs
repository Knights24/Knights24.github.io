/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Knights24.github.io',
  assetPrefix: '/Knights24.github.io/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
