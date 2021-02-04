var OfflinePlugin = require("offline-plugin");
module.exports = {
  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "postcss-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader", "astroturf/loader"],
      },
    ],
  },
};
