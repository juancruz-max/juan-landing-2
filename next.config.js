/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "www.linkedin.com", "media.licdn.com", "d1yei2z3i6k35z.cloudfront.net"],
  },
};

module.exports = nextConfig;
