/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path1",
        destination: "/:path1/:path1/",
      },
      {
        source: "/",
        destination: "/home/home/",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path1/:path2/",
        destination: "/:path2/",
        permanent: true,
      },
    ];
  },
  pageExtensions: ["pg.tsx", "pg.ts", "pg.jsx", "pg.js"],
  eslint: {
    dirs: ["src"],
  },
};

module.exports = nextConfig;
