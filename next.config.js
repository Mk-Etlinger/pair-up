const withCSS = require('@zeit/next-css')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withCSS({
  env: {
    HOST: isProd ? 'https://pair-up.now.sh' : 'http://localhost:3000',
    API_URL: '/api',
  },
})