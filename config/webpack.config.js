import webpack from 'webpack'
import Webpackbar from 'webpackbar'
// import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

const frontTheme = 'dopsFront'

process.noDeprecation = true

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    modules: [paths.rootBase(config.dir_src), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      TESTS: paths.rootBase(config.dir_test),
      ACTIONS: paths.rootBase(config.dir_src) + '/redux/modules',
      MIDDLEWARE: paths.rootBase(config.dir_src) + '/redux/middleware',
      COMPONENTS: paths.rootBase(config.dir_src) + '/components',
      CONTAINERS: paths.rootBase(config.dir_src) + '/containers',
      STYLES: paths.rootBase(config.dir_src) + '/styles',
      INTL: paths.rootBase('intl'),
      SRC: paths.rootBase(config.dir_src),
      UTILS: paths.rootBase(config.dir_src) + '/utils',
      FRONT_THEME: paths.rootBase(config.dir_src) + '/semantic/themes/' + frontTheme,
      '../../theme.config$': paths.rootBase(config.dir_src) + '/semantic/themes/' + frontTheme + '/theme.config',
    },
  },
  module: {},
}
const APP_ENTRY_PATH = paths.rootBase(config.dir_src) + '/client.js'
const includePaths = [paths.rootBase()]
const excludePaths = [paths.rootBase('node_modules')]
webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${ config.compiler_public_path }__webpack_hmr`]
    : [APP_ENTRY_PATH],
  vendor: config.compiler_vendor,
}

webpackConfig.output = {
  filename: `[name].[${ config.compiler_hash_type }].js`,
  path: paths.rootBase(config.dir_dist),
  publicPath: config.compiler_public_path,
}

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new Webpackbar({
    profile: true,
  }),
  new HtmlWebpackPlugin({
    template: paths.rootBase('src/index.html'),
    hash: false,
    favicon: paths.rootBase('src/static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoEmitOnErrorsPlugin).')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else if (__PROD__) {
  debug('Enable plugins for production (UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { dead_code: true, unused: true },
      minimize: true,
      sourceMap: true,
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    })
  )
}

const extractCSS = new ExtractTextPlugin({
  allChunks: true,
  filename: 'css/[name].[contenthash].css',
  disable: __DEV__,
})
webpackConfig.plugins.push(extractCSS)

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    use: 'eslint-loader',
    include: includePaths,
    exclude: excludePaths,
    enforce: 'pre',
  },
  {
    test: /\.(js|jsx)$/,
    include: includePaths,
    exclude: excludePaths,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime', 'react-intl'],
      presets: ['es2015', 'react', 'stage-0'],
    },
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.less$/,
    include: includePaths,
    exclude: excludePaths,
    use: extractCSS.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[local]',
            modules: true,
            sourceMap: true,
          },
        },
        {
          loader: 'less-loader',
        },
      ],
    }),
  },
  // {
  //   test: /\.css$/,
  //   use: extractCSS.extract({
  //     fallback: 'style-loader',
  //     use: [
  //       {
  //         loader: 'css-loader',
  //         options: {
  //           sourceMap: true,
  //         },
  //       },
  //       'postcss-loader',
  //     ],
  //   }),
  // },
  {
    test: /\.woff|woff2(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.txt(\?.*)?$/,
    loader: 'raw-loader',
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.(png|jpg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
]

export default webpackConfig
