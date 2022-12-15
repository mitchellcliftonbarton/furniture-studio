/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['furniture-panel.local.com', 'dev-furniture-panel.hot-rice.com', 'reganj.sg-host.com', 'furniture-studio.vercel.app'],
  },
}

module.exports = nextConfig
