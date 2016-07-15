var path = require('path');
var webpack = require('webpack');

module.exports.getConfig = function(environment) {
  var isProduction = environment === 'production';

  var config = {
    entry: './app/scripts/main',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug: !isProduction,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }]
    }
  };

  var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify(environment)
      }
    })];
  if (isProduction) {
    plugins.push(new webpack.NoErrorsPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    config.devtool = 'eval';
  }
  config.plugins = plugins;

  return config;
};