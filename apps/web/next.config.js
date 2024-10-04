/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  rewrites: () => [
    {
      source: '/sitemap.xml',
      destination: '/sitemap',
    },
  ]
};

module.exports = nextConfig;
