/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.AUTH0_BASE_URL || 'http://localhost:3000'
  }
}

module.exports = nextConfig
