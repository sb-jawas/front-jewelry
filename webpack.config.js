const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    lote: './src/lote/app.js',
    clasificador:'./src/lote-clasificador/app.js',
    mislotes: './src/mis-lotes/app.js',
    infolote: './src/info-lote/app.js'
 },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/dist'),
    // clean: true,
  },
  devServer: {
    static: path.resolve(__dirname,"./"),
    port: 5555,
    open: {
      target: "./src/"
    },
    headers:{
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }

};