/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/MohamedRefaat' : '';

const nextConfig = {
  output: 'export',
  ...(basePath && { basePath }),
  ...(basePath && { assetPrefix: basePath }),
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

