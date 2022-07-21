import { handleAuth } from '@auth0/nextjs-auth0';

process.env.AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || process.env.VERCEL_URL
issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL

export default handleAuth();