const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {
  DefinePlugin,
} = require('webpack');
const {
  ModuleConcatenationPlugin,
} = require('webpack').optimize;
const packageFile = require('./package.json');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const configOptions = {
  buildFolder: './build',
  appVersion: packageFile.version,
  extractCssFile: true,
  clientId: process.env.CLIENT_ID,
  apiKey: process.env.API_KEY,
  isProduction,
};

module.exports = () => {
  return {
    entry: path.join(__dirname, 'source', 'index.tsx'),
    output: {
      path: `${process.cwd()}/${configOptions.buildFolder}`,
      filename: configOptions.isProduction ?
        './js/[name]-[chunkhash].js' :
        './js/[name].js',
      chunkFilename: configOptions.isProduction ?
        './js/[id].chunk-[chunkhash].js' :
        './js/[id].chunk.js',
      publicPath: '/',
    },
    devServer: {
      host: 'personal.finance',
      port: 8080,
      contentBase: `${configOptions.buildFolder}/`,
      historyApiFallback: true,
      hot: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.([tj])sx?$/,
          include: path.resolve(__dirname, 'source'),
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {},
          }],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'source'),
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
          ]
        },
      ]
    },
    plugins: [
      // Defining global ENV variable
      // Useful for some age cases, when you need explicitly know whether you're in development or not
      // For example, when you want to log out something only in development mode
      // and don't want to delete this code in production, just want to deactivate it then.
      new DefinePlugin({
        ENV: {
          production: configOptions.isProduction,
          clientId: JSON.stringify(configOptions.clientId),
          apiKey: JSON.stringify(configOptions.apiKey),
        },
      }),

      // ModuleConcatenationPlugin
      // * faster build
      // * faster execution time in the browser
      // @link https://webpack.js.org/plugins/module-concatenation-plugin/
      // new ModuleConcatenationPlugin(),

      new HtmlWebpackPlugin({
        template: './source/index.ejs',
        filename: './index.html',
        appVersion: configOptions.appVersion,
      }),

      new CleanWebpackPlugin({
        verbose: true,
        dry: false,
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          '!.gitignore',
        ],
      }),
    ],
  }
}
