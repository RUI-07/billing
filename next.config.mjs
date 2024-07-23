import withImages from 'next-images'
import withTM from 'next-transpile-modules'
import withPlugins from 'next-compose-plugins'

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins(
  [
    withTM(['react-vant']),
    withImages({
      webpack(config, options) {
        return config
      },
    }),
  ],
  {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/bookkeeping',
          permanent: true,
        },
      ]
    },
  },
)
export default nextConfig
