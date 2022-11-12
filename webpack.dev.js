/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./dist",
    port: 9000,
  },
});
