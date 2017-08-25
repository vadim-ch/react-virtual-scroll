'use strict';
const path = require('path');
const packageJson = require('../package.json');
const webpack = require('webpack');

module.exports = function(env, __dirname) {
  console.info('Build React Virtual Scroll,', env, 'version', packageJson.version);
  return {
    entry: {
      // vendor: [
      //   'react',
      //   'react-dom'
      // ],
      index: path.resolve('src', 'index.tsx')
    },
    output: {
      filename: './build/index.js'
    },
    // externals: {
    //   react: 'react',
    //   'react-dom': 'react-dom'
    // },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css'],
      modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    stats: {
      children: false
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          include: path.resolve(__dirname, 'src'),
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            emitErrors: true,
            fix: true
          }
        },
        {
          test: /\.ts(x?)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, 'src'),
          use: [
            'ts-loader'
          ]
        }
      ]
    },
    // plugins: [
    //   new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'vendors.js?v=' + packageJson.version
    //   })
    // ]
  };
};
