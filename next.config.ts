import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Needed locally when DNS/VPN resolves remote hosts to private IPs (198.18.x.x).
    // Production on Vercel uses public DNS and is unaffected.
    dangerouslyAllowLocalIP: true,
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
