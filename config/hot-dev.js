const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env, __dirname) {
  return webpackMerge(commonConfig(env, __dirname), {
    // entry: [
    //   'react-hot-loader/patch',
    //   'webpack/hot/only-dev-server',
    //   // only- means to only hot reload for successful updates
    //   // vendor: ['react']
    // ],
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      hot: true,
      host: '127.0.0.1',
      port: 8080,
      stats: {
        children: false
      }
    }
  })
};
