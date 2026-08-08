import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    serverActions: {
      // Phone photos are often larger than the default 1MB limit.
      bodySizeLimit: "15mb",
    },
  },
  images: {
    // Needed locally when DNS/VPN resolves remote hosts to private IPs (198.18.x.x).
    // Production on Vercel uses public DNS and is unaffected.
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "beezmszqtohivuupklfk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
