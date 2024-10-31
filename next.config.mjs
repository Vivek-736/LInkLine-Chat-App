/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
          },
          {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
          },
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
          }
      ],
  },
  headers: async () => {
      return [
          {
              source: '/(.*)',
              headers: [
                  {
                      key: 'Set-Cookie',
                      value: '',
                  },
                  {
                      key: 'Cache-Control',
                      value: 'no-store, must-revalidate',
                  },
              ],
          },
      ];
  },
};

export default nextConfig;
