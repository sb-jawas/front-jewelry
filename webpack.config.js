const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    users: './src/admin-users/app.js',
    crearComponentes: './src/crear-componente/app.js',
    forgetPass: './src/forget-pass/app.js',
    homeAdmin: './src/home-admin/app.js',
    homeDesigner: './src/home-designer/app.js',
    homeLote: './src/home-lote/app.js',
    users: './src/admin-users/app.js',
    infoLote: './src/info-lote/app.js',
    lote: './src/lote/app.js',
    loteClasificador:'./src/lote-clasificador/app.js',
    loteHistorial: './src/lote-historial/app.js',
    misComponentes: './src/mis-componentes/app.js',
    misLotes: './src/mis-lotes/app.js',
    profile: './src/my-profile/app.js',
    signup: './src/signup/app.js',
    login: './src/app.js',
  
 },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    // clean: true,
  },
  devServer: {
    static: path.resolve(__dirname,"./"),
    port: 3000,
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