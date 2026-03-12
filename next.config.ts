import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
     images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '"e9p6lwdva5ykaks3.public.blob.vercel-storage.com"',
            },
        ],
    }
};

export default nextConfig;
