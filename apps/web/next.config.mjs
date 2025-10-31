/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'reviews.web3',
      'images.web3deals.io',
      'cdn.web3deals.io',
      'images.web3',
      'i.pravatar.cc',
      'images.unsplash.com',
      'prod-image-cdn.tensor.trade',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
