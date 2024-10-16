/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.worldweatheronline.com",
      "cdn.weatherapi.com",
      "images.pexels.com",
      "undefined",
    ],
  },
};

export default nextConfig;
