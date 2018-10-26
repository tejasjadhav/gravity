const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function buildConfig(env, argv) {
  console.info(`Running webpack in ${argv.mode} mode...`);

  const config = {
    devtool: "source-map",
    entry: path.join(__dirname, "/src/index.ts"),
    output: {
      filename: "gravity.js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            { loader: "css-loader" }
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "gravity.css"
      }),
      new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, "dist/index.html"),
        template: path.resolve(__dirname, "public/index.html"),
        xhtml: true
      })
    ]
  };

  return config;
}

module.exports = buildConfig;
