var config = {

  devtool: 'eval',
  debug: true,

  output: {
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, loaders: ['babel'] },
      { test: /\.coffee/, exclude: /(node_modules)/, loaders: ['gettext-loader', 'coffee-loader'] }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}

module.exports = config;
