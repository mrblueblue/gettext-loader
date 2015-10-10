var config = {

  devtool: 'eval',
  debug: true,

  output: {
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jst/, loaders: ['dot-loader'] },
      { test: /\.jsx?$/, loaders: ['babel'] },
      { test: /\.coffee/, loaders: ['coffee-loader'] }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}

module.exports = config;
