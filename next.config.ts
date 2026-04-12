import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        // Azure Blob Storage (for product images uploaded via admin)
        protocol: 'https',
        hostname: '*.blob.core.windows.net',
        pathname: '/**',
      },
      {
        // Azure CDN endpoint
        protocol: 'https',
        hostname: '*.azureedge.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aethera-eight.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aetheraaroma.beauty',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.aetheraaroma.beauty',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
