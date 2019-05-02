const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
  })],
  devServer: {
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:4000',
    }),
  },
};

// const HtmlWebPackPlugin = require("html-webpack-plugin");
// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader"
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./src/index.html",
//       filename: "./index.html"
//     })
//   ],
//   externals: {
//     config: JSON.stringify({
//       apiUrl: 'http://localhost:4000',
//     }),
//   },
// };