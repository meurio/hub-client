const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const inlinesvg = require('postcss-inline-svg')
const autoprefixer = require('autoprefixer')

const { CLIENT_ENTRY, CLIENT_OUTPUT } = CONFIG

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'aphrodite'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT
  },
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader?sourceMap',
          'postcss-loader?parser=postcss-scss',
          'sass-loader?sourceMap'
        ])
      },
      {
        test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
        loader: 'file?name=[path][sha512:hash:base64:7].[ext]'
      },
      { test: /\.svg/, loader: 'svg-url' }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  postcss: function () {
    return [autoprefixer, inlinesvg]
  },
  sassLoader: {
    includePaths: [path.join(__dirname, '.scss')]
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.NoErrorsPlugin()
  ]
}
