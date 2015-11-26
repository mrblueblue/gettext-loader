module.exports = {

  devtool: 'eval',
  debug: true,

  output: {
    filename: './.tmp/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jst/, loaders: ['dot-loader'] },
      { test: /\.jsx?$/, loaders: [`gettext-loader?__,translate`]},
      { test: /\.coffee/, loaders: ['coffee-loader'] }
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
