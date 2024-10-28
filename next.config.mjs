/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // output: "standalone",
    // async rewrites() {
    //     return [
    //       {
    //         source: '/',
    //         destination: '/en',
    //       },
    //       {
    //         source: '/embed',
    //         destination: '/en/embed',
    //       },
    //     ]
    //   },
};

export default withNextIntl(nextConfig);
