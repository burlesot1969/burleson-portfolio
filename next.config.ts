import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/burleson-portfolio',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
