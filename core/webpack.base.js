require('dotenv').config()

const path = require('path')
const { htmlPage } = require('./tools')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')

let resolve = dir => path.join(__dirname, '..', 'src', dir)
module.exports = {
  entry: {
    background: resolve('./backend/background'),
    content: resolve('./client/view/contentScript'),
    popup: resolve('./client/view/popup'),
    myTab: resolve('./client/view/tabs/myTab'),
  },
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules', 'src']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:  [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({}),
    new VueLoaderPlugin(),
    htmlPage('My Tab', 'myTab', ['vendor', 'myTab']),
    htmlPage('background', 'background', ['vendor', 'background']),
    htmlPage('popup', 'popup', ['vendor', 'popup']),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '..', 'static') }]),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '..', 'src', 'manifest.json') }])
  ],
  performance: { hints: false },
  optimization: {
    splitChunks: {
      name: 'vendor'
    }
  }
}