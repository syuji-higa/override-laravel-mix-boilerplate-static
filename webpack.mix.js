mix.options({
  postCss: [
    require('autoprefixer')({
      grid: true
    })
  ]
})

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(vanix)\/).*/,
        loader: 'babel-loader'
      }
    ]
  }
})
