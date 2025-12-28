/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/MohamedRefaat',
  assetPrefix: '/MohamedRefaat',
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mrd-eg.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig

