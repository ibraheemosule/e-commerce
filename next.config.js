/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["pg.tsx", "pg.ts", "pg.jsx", "pg.js"],
  eslint: {
    dirs: ["src"],
  },
};

module.exports = nextConfig;
