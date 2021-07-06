const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [

  ]
};