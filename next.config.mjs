/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // REQUIRED for static export

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // required for export mode
  },
}

export default nextConfig
