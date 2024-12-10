const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

let publicKey;
if (process.env.NODE_ENV === "production") {
  publicKey = process.env.PUBLIC_KEY;
} else {
  const path = path.resolve(__dirname, "public.key");
  publicKey = fs.readFileSync(path, "utf8");
}

module.exports = {
  entry: "./src/app/pages/app.js",
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
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin.TsconfigPathsPlugin({
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env.VERSION": JSON.stringify(
        require(path.resolve(__dirname, "package.json")).version,
      ),
    }),
    new webpack.DefinePlugin({
      "process.env.PUBLIC_KEY": JSON.stringify(publicKey),
    }),
  ],
};
