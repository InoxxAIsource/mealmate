/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH ? process.env.BASE_PATH.replace(/\/$/, "") : "",
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    domains: ["mealcoreai.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
