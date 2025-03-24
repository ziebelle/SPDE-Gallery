/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // For easy deployment without image optimization service
    },
    reactStrictMode: true,
    basePath: '/SPDE-Gallery',
    assetPrefix: '/SPDE-Gallery/',
}

module.exports = nextConfig 