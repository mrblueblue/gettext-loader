module.exports = {

  devtool: 'eval',
  debug: true,

  output: {
    filename: './.tmp/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jst/, loaders: ['gettext-loader','dot-loader'] },
      { test: /\.jsx?$/, loaders: ['babel-loader', 'gettext-loader'] },
      { test: /\.js?$/, loaders: ['gettext-loader'] },
      { test: /\.coffee/, loaders: ['gettext-loader', 'coffee-loader'] }
    ]
  },

  externals: {
    'react': 'React',
    'i18n': 'i18n'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}
