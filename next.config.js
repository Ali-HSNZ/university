/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    images: {
        minimumCacheTTL: 3600,
        loader: 'custom',
        loaderFile: './src/core/config/next-image-loader/next-image-loader.config.ts',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
