// module.exports = async (phase, { defaultConfig }) => {
//     /**
//      * @type {import('next').NextConfig}
//      */

//     // const lang = prisma.setting.findUnique({
//     //     where: { name: 'revalidate' },
//     // })

//     const nextConfig = {
//         reactStrictMode: true,
//         // env: {
//         //     SITE_URL: 'http://localhost:8080',
//         //     // i18n: {
//         //     //     locales: ['en', 'fr', 'es', 'zh'],
//         //     //     defaultLocale: 'en',
//         //     // },
//         // },
//     }
//     return nextConfig
// }

const defaultConfig = {
    reactStrictMode: true,
    output: 'standalone',
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(defaultConfig)
