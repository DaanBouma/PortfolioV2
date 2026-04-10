import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  logging: false,
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
