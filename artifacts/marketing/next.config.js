/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH ? process.env.BASE_PATH.replace(/\/$/, "") : "",
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    domains: ["mealcoreai.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mealcoreai.com" }],
        destination: "https://mealcoreai.com/:path*",
        permanent: true,
      },
      {
        source: "/meal-plans/weight-loss",
        destination: "/meal-plans/weight-loss-meal-plan-north-indian",
        permanent: true,
      },
      {
        source: "/cholesterol-meal-plan",
        destination: "/cholesterol-diet-plan",
        permanent: true,
      },
      {
        source: "/thyroid-meal-plan",
        destination: "/thyroid-diet-plan",
        permanent: true,
      },
      {
        source: "/weight-loss-meal-plan",
        destination: "/meal-plans/weight-loss-meal-plan-south-indian",
        permanent: true,
      },
    ];
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
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' *.googleapis.com *.google-analytics.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
