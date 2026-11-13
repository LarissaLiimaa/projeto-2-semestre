/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ifro.edu.br*',
      },
    ];
  },
};

export default nextConfig;
