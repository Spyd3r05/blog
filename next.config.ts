import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qpyfqxfpypswixguhsrr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/blog-images/**",
      },
    ],
  },
};

export default nextConfig;
