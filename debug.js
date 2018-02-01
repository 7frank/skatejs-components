/**
 *
 * script that allows for debugging plugings/loaders via webstorm
 *
 * How-To: right click in webstorm project-tab and select debug ..
 *
 * @see http://blog.assaf.co/debugging-a-webpack-plugin-loader/
 *
 */



var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

// Set environment variables here...

var webpackConfig = require('./webpack.config.js');

webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(webpackConfig); // load webpack
// run dev-server

var server = new WebpackDevServer(compiler, {
    //devtool: "source-map",
    contentBase: "/",
    publicPath: "/",
    hot: true,
    inline: true,
    progress: true
});
server.listen(8000);