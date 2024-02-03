/* eslint-disable */
const path = require('path');
const WorkerPlugin = require('worker-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  transpileDependencies: ['multi-download'],
  configureWebpack: {
    plugins: [
      new WorkerPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: true
          }
        }
      }),
    ],
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.ts'),
        modernizr$: path.resolve(__dirname, './.modernizrrc.js')
      }
    },
    module: {
      rules: [
        {
          loader: 'webpack-modernizr-loader',
          test: /\.modernizrrc\.js$/
        }
      ]
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 100000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
};
