var path = require('path');

module.exports = {
  context: path.resolve('./src'),
  entry: './addtopage.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'addtopage.bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve('./dist')
  }
};
