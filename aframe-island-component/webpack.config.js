//const path = require('path');
//const webpack = require('webpack');

//const PLUGINS = [];

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  entry: './index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    globalObject: 'this',
    path: __dirname + '/dist',
    filename: process.env.NODE_ENV === 'production' ? 'aframe-island-component.min.js' : 'aframe-island-component.js',
    libraryTarget: 'umd'
  },
  plugins: PLUGINS,
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
      }
      

    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')]
  }
};
