const sass = require('sass')

mix
  .sass('', '', {
    functions: {
      'path($path)': (imgPath) => {
        return new sass.types.String(`${imgPath.getValue()}?id=${Date.now()}`)
      }
    }
  })
  .options({
    processCssUrls: false,
    postCss: [
      require('autoprefixer')({
        grid: true
      })
    ]
  })
  .webpackConfig({
    module: {
      rules: [
        // {
        //   test: /\.jsx?$/,
        //   loader: 'prettier-loader',
        //   exclude: /node_modules/,
        //   options: { parser: 'babel' }
        // },
        // {
        //   test: /\.(scss|css)?$/,
        //   loader: 'prettier-loader',
        //   exclude: /node_modules/,
        //   options: { parser: 'scss' }
        // },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(vanix)\/).*/,
          loader: 'babel-loader'
        }
      ]
    }
  })
