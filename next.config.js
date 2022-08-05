/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_BASE_URL: 'https://swapi.dev/api',
  },
}

module.exports = nextConfig
