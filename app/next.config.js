/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['furniture-panel.local.com', 'furniture-admin.hot-rice.com'],
  },
}

module.exports = nextConfig
