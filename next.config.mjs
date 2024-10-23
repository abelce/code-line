/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    output: "standalone",
    async redirects() {
        return [
          {
            source: '/embed',
            destination: '/en/embed',
            permanent: true,
          },
        ]
      },
};

export default withNextIntl(nextConfig);
