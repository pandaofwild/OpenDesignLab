import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/layouts", destination: "/ko/layouts", permanent: false },
      { source: "/layouts/:path*", destination: "/ko/layouts/:path*", permanent: false },
      { source: "/styles", destination: "/ko/styles", permanent: false },
      { source: "/styles/:path*", destination: "/ko/styles/:path*", permanent: false },
      { source: "/studio", destination: "/ko/studio", permanent: false },
      { source: "/components", destination: "/ko/components", permanent: false },
      { source: "/web-layouts", destination: "/ko/layouts", permanent: true },
      { source: "/web-layouts/:path*", destination: "/ko/layouts/:path*", permanent: true },
      { source: "/design-styles", destination: "/ko/styles", permanent: true },
      { source: "/design-styles/:path*", destination: "/ko/styles/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
