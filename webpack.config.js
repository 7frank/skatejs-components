const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



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
            /**
             * Include vendor css files globally without parsing them.
             */
            {
                test: /\.css$/,
                include: path.join(__dirname, 'node_modules'),
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
                include: path.join(__dirname, 'src/components'),
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            //insertInto: '#host>#root'
                        }
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            },
            { test: /\.svg$/, loader: 'url-loader?limit=2000000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader?limit=2000000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=2000000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=2000000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader?limit=2000000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
            /*{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }*/
        ]
    },
    plugins: [
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


    ],
    devtool: "inline-source-map",
}