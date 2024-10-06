const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const fs = require('fs');

const BASE_HREF = 'angular-in-90ish';

// Function to generate HtmlWebpackPlugin instances for each HTML file
function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles
    .filter((fileName) => fileName.endsWith('html'))
    .map((item) => {
      const parts = item.split('.');
      const name = parts[0];
      const extension = parts[1];
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(
          __dirname,
          `${templateDir}/${name}.${extension}`
        ),
        base: process.env.NODE_ENV !== 'production' ? '/' : `/${BASE_HREF}/`,
        inject: true,
        minify: false,
      });
    });
}

const htmlPlugins = generateHtmlPlugins('./content');

module.exports = {
  entry: './js/slides.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(
      __dirname,
      process.env.NODE_ENV === 'production' ? `dist/${BASE_HREF}` : 'dist'
    ),
  },
  mode: 'development', // Change to 'production' when ready to deploy
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false,
      minify: false,
    }),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'content', to: 'content' },
        { from: 'data', to: 'data' },
        { from: 'main.js', to: 'main.js' },
        { from: 'profiles', to: 'profiles' },
        { from: 'assets', to: 'assets' },
      ],
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    watchFiles: ['content/**/*', 'css/**/*', 'profiles/*'],
    open: true,
    port: 8000,
    hot: true,
  },
};
