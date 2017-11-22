const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.[s]?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ]
  }
}
