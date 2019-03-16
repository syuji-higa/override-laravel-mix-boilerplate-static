mix.sass().options({
  processCssUrls: false,
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
