/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  // If your repo name is not the root (e.g., username.github.io/repo-name)
  // Uncomment and set the basePath:
  // basePath: '/MRD',
  // trailingSlash: true,
}

module.exports = nextConfig

