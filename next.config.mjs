/** @type {import('next').NextConfig} */

import withImages from 'next-images'
import withTM from 'next-transpile-modules'
import withPlugins from 'next-compose-plugins'

const nextConfig = withPlugins([
  withTM(['react-vant']),
  withImages({
    webpack(config, options) {
      return config
    },
  }),
])
export default nextConfig
