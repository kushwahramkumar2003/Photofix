/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2kuj5x2i47j2r.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
