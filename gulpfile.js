'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack-build');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var webpackConfig = require('./webpack.config.js');
var _ = require('lodash');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'Icons';

gulp.task('iconFont', function() {
  gulp.src(['app/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'scss',
      targetPath: '../../../sass/_icons.scss',
      fontPath: '../assets/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      normalize: true
    }))
    .pipe(gulp.dest('app/assets/fonts/icons/'));
});

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

gulp.task('run',  ['build'], shell.task('cordova run'));
gulp.task('run-dev',  ['build-dev'], shell.task('cordova run'));

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['webpack:build-dev'], function() {
  gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

gulp.task('copyIndex', function() {
  return gulp.src('app/index.html')
      .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('copyImg', function() {
  return gulp.src('app/assets/images/*')
      .pipe(gulp.dest(path.join(webpackConfig.output.path, '/images')));
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', ['copyIndex', 'copyImg'], function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
          'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'eval';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', ['copyIndex', 'copyImg'], function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', ['copyIndex', 'copyImg', 'webpack:build-dev'], function(callback) {
  // modify some webpack config options
  var devServerWebpackConfig = require('./webpack.hot.config.js');

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devServerWebpackConfig), {
    publicPath: devServerWebpackConfig.output.publicPath,
    contentBase: devServerWebpackConfig.output.path,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(3000, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
  });
});
