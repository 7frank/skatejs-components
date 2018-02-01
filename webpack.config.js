const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WpPluginWatchOffset = require('wp-plugin-watch-offset');

const StatsDump = require('./webpack/plugins/StatsPlugin');
const FileList = require('./webpack/plugins/FileListPlugin');
const ExplorerPlugin = require('./webpack/plugins/ExplorerPlugin');


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
       // publicPath: 'api/node_modules/@nk/core-components/dist/',
        //publicPath: './',
        library: "NKCore",
        libraryTarget: 'umd',

        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {

            'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
           /*{

                test: /font-awesome\.css$/,
                include: [
                       path.resolve(__dirname, 'node_modules/font-awesome')
                ],
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                        options: {
                            //insertInto: '#host>#root'
                        }
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase:true
                        }
                    }
                   // "style-loader",//'to-string-loader',
                   // { loader: 'css-loader', options: { importLoaders: 1 } },
                   // 'postcss-loader'
                ]


            },*/


           /**
             * Include vendor css files globally without parsing them.
             */
            {
                test: /\.css$/,
                include: path.join(__dirname, 'node_modules'),
               // exclude: path.join(__dirname, 'node_modules/font-awesome'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                           //import: false,
                           // url: false
                        }

                    }
                    //,'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [path.join(__dirname, 'src/components')],
                //exclude: path.join(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                        options: {
                            //insertInto: '#host>#root'
                        }
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase:true
                        }
                    }
                ]
            },

            { test: /\.svg$/, loader: 'url-loader?limit=2000000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader?limit=2000000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=2000000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=2000000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader?limit=2000000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        // prevents generated files from triggering watch cycle
        //
        new WpPluginWatchOffset(),
        new Webpack.ProvidePlugin({

            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode:"static",
            openAnalyzer:false
        }),
        //TODO use below or check out HtmlWebpackPlugin options minify
     /*   new Webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })*/

     new FileList(),
        new ExplorerPlugin(),
      new StatsDump()


    ],
    devtool: "inline-source-map",
}