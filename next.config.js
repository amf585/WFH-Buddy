/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL || 'https://wfh-buddy.netlify.app',
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL || 'https://wfh-buddy-prod.us.auth0.com',
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
  }
}

module.exports = nextConfig
