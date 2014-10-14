var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var babelConfig = require('../package.json').babel;

var rootPath = path.resolve(__dirname, '..');

module.exports = {
  entry: getEntries(),
  output: {
    path: rootPath + '/public/js',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      jquery: rootPath + '/src/scripts/lib/jquery.js'
    },
    extensions: [ '', '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {comments: false},
      compressor: {warnings: false}
    })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: babelConfig
      },
      {
        test: /pickadate/,
        loader: 'imports?define=>false'
      }
    ],
    postLoaders: [
      {
        // remove newline and surplus white space from template strings
        test: /.js$/,
        loader: 'string-replace',
        query: {
          search: '\\\\n\\s+',
          replace: '',
          flags: 'g'
        }
      }
    ]
  }
};

function getEntries () {
  var files = glob.sync('./src/scripts/{*,bundles/*,apps/*/index}.js');

  return files.reduce(function (entries, file) {
    var dir = path.dirname(file).split('/').slice(2);
    var name = (dir[1] === 'apps')
      ? `app_${dir[2]}`
      : name = path.basename(file, '.js');

    entries[name] = file;
    return entries;
  }, {});
}
