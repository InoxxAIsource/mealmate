/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: (process.env.BASE_PATH || "/marketing").replace(/\/$/, ""),
  images: {
    unoptimized: true,
    domains: ["mealcoreai.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
