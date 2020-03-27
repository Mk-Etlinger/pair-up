const withCSS = require('@zeit/next-css')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withCSS({
  env: {
    HOST: isProd ? '' : 'http://localhost:3000',
    API_URL: isProd ? '' : '/api',
  },
})