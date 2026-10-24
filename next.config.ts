import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/media/:file*", headers: immutable },
      { source: "/engraving/:file*", headers: immutable },
    ];
  },
};

export default nextConfig;
