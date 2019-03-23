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

if (process.env.NODE_ENV !== 'development') {
  mix.then(async () => {
    // In production, delete chunk file for SVG sprite
    fs.removeSync(`${publicDirName}/${svgDummyModuleName}.js`)
    const pathToManifest = `${publicDirName}/mix-manifest.json`
    const manifest = require(`./${pathToManifest}`)
    delete manifest[`/${svgDummyModuleName}.js`]
    fs.writeFileSync(path.resolve(pathToManifest), JSON.stringify(manifest), 'utf-8')
  })
}