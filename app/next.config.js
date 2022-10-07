/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['furniture-panel.local.com', 'dev-furniture-panel.hot-rice.com'],
  },
}

module.exports = nextConfig
