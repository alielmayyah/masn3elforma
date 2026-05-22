import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/masn3elforma",
  assetPrefix: "/masn3elforma/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
