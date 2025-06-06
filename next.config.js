/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'standalone', // ✅ Important for SSR on Amplify
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  experimental: {
    serverActions: true, // optional, safe to include
  },
};

module.exports = nextConfig;
