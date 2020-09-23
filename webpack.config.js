const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

module.exports = (env) => {
  // Use the `env` argument to create some helpful constants.
  const environment = env.environment;
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    // Our Webpack config object.
    // We now have access to the constants `environment`,
    // `isProduction` and `isDevelopment`.
    mode: environment,
    devServer: {
      // The dev server will serve content from this directory.
      contentBase: PATH_DIST,

      // Specify a host. (Defaults to 'localhost'.)
      host: 'localhost',

      // Specify a port number on which to listen for requests.
      port: 8081,

      // When using the HTML5 History API (you'll probably do this with React
      // later), index.html should be served in place of 404 responses.
      historyApiFallback: true,

      // Show a full-screen overlay in the browser when there are compiler
      // errors or warnings.
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    // The point or points to enter the application. This is where Webpack will
    // start. We generally have one entry point per HTML page. For single-page
    // applications, this means one entry point. For traditional multi-page apps,
    // we may have multiple entry points.
    // https://webpack.js.org/concepts#entry
    entry: [path.join(PATH_SOURCE, './index.jsx')],

    // Tell Webpack where to emit the bundles it creates and how to name them.
    // https://webpack.js.org/concepts#output
    // https://webpack.js.org/configuration/output#outputFilename
    output: {
      path: PATH_DIST,
      filename: 'js/[name].[hash].js',
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Apply this rule to files ending in .js
          exclude: /node_modules/, // Don't apply to files residing in node_modules
          use: {
            // Use the following loader and options
            loader: 'babel-loader',
            // We can pass options to both babel-loader and Babel. This option object
            // will replace babel.config.js
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true, // Output the targets/plugins used when compiling
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: 'file-loader',
        },
      ],
    },
    resolve: {
      // We can now require('file') instead of require('file.jsx')
      extensions: ['', '.js', '.jsx', '.scss'],
      alias: {
        src: path.resolve(__dirname, '../src'),
      },
    },
    plugins: [
      // This plugin will generate an HTML5 file that imports all our Webpack
      // bundles using <script> tags. The file will be placed in `output.path`.
      // https://github.com/jantimon/html-webpack-plugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, './index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      }),
    ],
  };
};
