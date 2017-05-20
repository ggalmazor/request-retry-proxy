const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/client.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'client-build'),
    filename: 'client.[hash].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, query: {presets: ['es2015']}}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'client/index.ejs')}),
  ]
};