const HtmlWebpackPlugin = require("html-webpack-plugin");
const scriptWebpack = require('script-ext-html-webpack-plugin')
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const modeConfig = (env) => require(`./webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  console.log(mode);
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jpe?g/,
            use: ["url-loader"],
          },
        ],
      },
      module: {
        rules: [
          {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      output: {
        filename: "bundle.js",
      },
      plugins: [new HtmlWebpackPlugin(),new scriptWebpack({
        defaultAttribute:'defer'
      }), new webpack.ProgressPlugin()],
    },
    modeConfig(mode),
  );
};
