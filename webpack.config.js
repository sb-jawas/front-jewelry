const path = require('path');

module.exports = {
  entry: {
    lote: './src/lote/app.js',
    clasificador:'./src/lote-clasificador/app.js',
    mislotes: './src/mis-lotes/app.js'
 },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};