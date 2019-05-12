const sass = require('sass')

mix
  .sass('', '', {
    functions: {
      'path($path)': (imgPath) => {
        return new sass.types.String(`${imgPath.getValue()}?id=${Date.now()}`)
      },
      'svg-sprite-data()': () => {
        const paths = globby.sync(
          `${resourcesThemeDirName}/assets/svg/sprite/*.svg`,
          { onlyFiles: true }
        )
        const data = new sass.types.List(paths.length)
        for (const [i, path] of Object.entries(paths)) {
          const pathStrs = path.match(/\/assets\/svg\/sprite\/(.+)\.svg$/)
          if (!pathStrs[1]) return
          const name = pathStrs[1]
          const svg = fs.readFileSync(path)
          const viewBoxStrs = svg.toString().match(/viewBox="([^"]*)"/)
          if (!viewBoxStrs[1]) return
          const viewBox = viewBoxStrs[1]
          const size = viewBox.split(' ')
          const d = new sass.types.Map(3)
          d.setKey(0, new sass.types.String('name'))
          d.setValue(0, new sass.types.String(name))
          d.setKey(1, new sass.types.String('width'))
          d.setValue(1, new sass.types.Number(size[2] - size[0]))
          d.setKey(2, new sass.types.String('height'))
          d.setValue(2, new sass.types.Number(size[3] - size[1]))
          data.setValue(i, d)
        }
        return data
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
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(vanix|bowser)\/).*/,
          loader: 'babel-loader'
        }
      ]
    }
  })

if (process.env.NODE_ENV === 'production') {
  mix.then(async () => {
    const targets = globby.sync(
      'public/assets/images/**/*.{jpg,jpeg,png,gif.ico}'
    )
  })
}
