const withCSS = require('@zeit/next-css');
const Dotenv = require("dotenv-webpack");
const isProd = process.env.NODE_ENV === 'production';

module.exports = withCSS({
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  env: {
    HOST: isProd ? 'https://pair-up.now.sh' : 'http://localhost:3000',
  },
})
