'use strict';

var path = require('path');
var webpack = require('webpack');

//for cordova the http://webpack.github.io/docs/configuration.html#output-publicpath may interesting

module.exports = {
  cache: true,
  entry: ['./app/js/app.js'],
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // css, less, sass loaders
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(sass|scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/png'
      },
      // required for react jsx
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /libs/]
      }, {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel'],
        exclude: [/node_modules/, /libs/]
      },

      // font-awesome
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    alias: {
      'ratchet.css': path.join(__dirname, 'vendor/ratchet/css/ratchet.min.css'),
      'ratchet': path.join(__dirname, 'vendor/ratchet/js/ratchet.min.js'),
      'leaflet.css': path.join(__dirname, 'node_modules/leaflet/dist/leaflet.css'),
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ]
};
