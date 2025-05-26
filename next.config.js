/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "www.linkedin.com", "media.licdn.com"],
  },
};

module.exports = nextConfig;
