/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cd-1253266055.cos.ap-guangzhou.myqcloud.com',
      },
    ],
  },
}

export default nextConfig
