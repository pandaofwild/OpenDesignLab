import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/web-layouts", destination: "/layouts", permanent: true },
      { source: "/web-layouts/:path*", destination: "/layouts/:path*", permanent: true },
      { source: "/design-styles", destination: "/styles", permanent: true },
      { source: "/design-styles/:path*", destination: "/styles/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
