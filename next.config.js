/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        BACKEND_URL: process.env.BACKEND_URL
    }
};

module.exports = nextConfig;
