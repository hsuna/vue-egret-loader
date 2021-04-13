const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    stats: "minimal",
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-egret-loader'
      },
      // example to apply loader to a custom block without lang="xxx"
      // this rule applies to <foo> blocks
      {
        resourceQuery: /blockType=foo/,
        loader: 'babel-loader'
      },
    ]
  },
  resolveLoader: {
    alias: {
      'vue-egret-loader': require.resolve('../lib')
    }
  }
}
