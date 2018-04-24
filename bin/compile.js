import fs from 'fs-extra'
import _debug from 'debug'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import config from '../config'

const debug = _debug('app:bin:compile')
const paths = config.utils_paths

debug('Create webpack compiler')
const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed')
  console.log(stats.toString(config.compiler_stats))

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings')
    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  } else {
    debug('No errors or warnings encountered')
  }

  debug('Copy static assets to dist folder')
  fs.copySync(paths.rootBase('src/static'), paths.rootBase('dist'))
  if (fs.existsSync(paths.rootBase('src/static'))) {
    fs.copySync(paths.rootBase('src/static'), paths.rootBase('dist'))
  }

  debug('Create manifest.yml for Cloudfoundry')
  let templateCFManifestFile = paths.rootBase('cloudfoundry/manifest.template.yml')
  let cfManifestContent = fs.readFileSync(templateCFManifestFile, 'utf8')
  let cfManifestNewContent = cfManifestContent.replace(/\$APP_NAME/g, process.env.MODULE)
  let cfManifestFinalContent = cfManifestNewContent.replace(/\$APPDOMAIN/g, process.env.APPDOMAIN)
  let targetcfManifestFile = paths.rootBase('dist/manifest.yml')
  fs.writeFileSync(targetcfManifestFile, cfManifestFinalContent)
})
