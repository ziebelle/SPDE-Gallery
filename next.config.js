/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // For easy deployment without image optimization service
    },
    reactStrictMode: true,
    basePath: process.env.NODE_ENV === 'production' ? '/SPDE-Gallery' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/SPDE-Gallery/' : '',
}

module.exports = nextConfig 