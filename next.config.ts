import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb', // Essentially unlimited for file uploads
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} as any;

export default nextConfig;
