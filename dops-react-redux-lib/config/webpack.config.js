import webpack from 'webpack'
// import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const { __TEST__, __DEV__ } = config.globals

process.noDeprecation = true

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    modules: [
      paths.rootBase(config.dir_src),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      SHARED_COMPONENTS: paths.rootBase(config.dir_src) + '/components',
      SHARED_CONTAINERS: paths.rootBase(config.dir_src) + '/containers',
      SHARED_REDUX: paths.rootBase(config.dir_src) + '/redux',
      SHARED_STYLES: paths.rootBase(config.dir_src) + '/styles',
      SHARED_TESTS: paths.rootBase(config.dir_test),
      SHARED_UTILS: paths.rootBase(config.dir_src) + '/utils',
      SHARED_INTL: paths.rootBase('intl'),
    },
  },
  module: {},
}
const includePaths = [
  paths.rootBase(),
  paths.rootBase('tests'),
]
const excludePaths = [
  paths.rootBase('node_modules'),
]

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.rootBase('src/index.html'),
    hash: false,
    favicon: undefined,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
]

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
  }))
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
            localIdentName: '[name]__[local]___[hash:base64:5]',
            modules: true,
            sourceMap: true,
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    }),
  },
  {
    test: /\.css$/,
    use: extractCSS.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        'postcss-loader',
      ],
    }),
  },
  {
    test: /\.woff(\?.*)?$/,
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
    loader: 'url-loader',
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
