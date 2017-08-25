const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env, __dirname) {
  return webpackMerge(commonConfig(env, __dirname), {
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: {
          except: ['exports', 'require']
        }
      })
    ]
  })
};
