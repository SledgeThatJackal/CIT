const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPethsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app/pages/app.js",
  output: {
    path: path.resolve(__dirname, "..", "resources", "static"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 10,
          enforce: true,
          maxSize: 244 * 1024,
        },
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          priority: 5,
          enforce: true,
          reuseExistingChunk: true,
          maxSize: 244 * 1024,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [
      new TsconfigPethsPlugin.TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
