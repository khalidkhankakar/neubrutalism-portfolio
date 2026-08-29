import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    // Allow access to remote image placeholder.
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'e9p6lwdva5ykaks3.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    output: 'standalone',
    transpilePackages: ['motion'],
    turbopack: {},
    webpack: (config, { dev }) => {
        // HMR is disabled in AI Studio via DISABLE_HMR env var.
        // Do not modify - file watching is disabled to prevent flickering during agent edits.
        if (dev && process.env.DISABLE_HMR === 'true') {
            config.watchOptions = {
                ignored: /.*/,
            };
        }
        return config;
    },
};

export default nextConfig;
