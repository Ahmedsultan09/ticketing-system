// webpack.config.js
const path = require("path");

module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        test: /\.mjs$/,
        enforce: "pre",
        use: ["source-map-loader"],
        resolve: {
          fullySpecified: false,
        },
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
        exclude:
          /node_modules\/@react-aria\/utils|node_modules\/@react-stately\/utils/, // exclude the problematic modules
      },
    ],
  },
};
