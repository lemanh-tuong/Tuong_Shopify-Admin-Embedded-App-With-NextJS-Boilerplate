require('dotenv').config();
const webpack = require('webpack');
const withTM = require('next-transpile-modules')(['wiloke-react-core']);
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = withPlugins([withTM, withImages], {
  typescript: {
    // Lỗi type: "Type error: 'PersistGate' cannot be used as a JSX component." không thể sửa -> ignore
    ignoreBuildErrors: true,
  },
  eslint: {
    dir: ['.'],
  },
  images: {
    disableStaticImages: true,
  },
  // Rewrite như vậy để khi ở 1 route != '/' và F5 không bị lỗi
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
  webpack: config => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
});
