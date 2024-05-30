import { withPayload } from '@payloadcms/next/withPayload'

/** @type{import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
  experimental: {
    reactCompiler: true,
  },
}

export default withPayload(nextConfig)
