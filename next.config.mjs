/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/studio-rental',
        destination: 'https://docs.google.com/forms/d/e/1FAIpQLSdFVekBip6p7HdiK35M40K5HvmVRpPcg16VYJgitrgMOXGzng/viewform',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
