/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.static-kl.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      }
    ],
  },
}

module.exports = {
  ...nextConfig,
  transpilePackages: ['gsap'],
}