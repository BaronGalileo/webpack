const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');


module.exports = (env) => {
  const isDev = env.mode === 'development';

  const config = webpack.Configuration = {
    entry: './src/index.js',
    mode: env.mode ?? 'development',
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? {
      static: './dist',
      open: true,
      hot: true,
      port:  3001,
     } :  {
      static: './dist',
      open: true,
      hot: false,
      port: 5001,
     },
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        isDev ? new HtmlWebpackPlugin({
            title: 'Webpack dev server'
        }) : new HtmlWebpackPlugin({
          title: 'Prodaction Webpack'
      }),
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin()
         ],
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
    module: {
    rules: [
      { test: /\.css$/,
       use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
     ],

     },
     ]
  }}
  return config
}
