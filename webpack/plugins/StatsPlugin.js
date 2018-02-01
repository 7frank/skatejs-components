module.exports = function () {
    return {
        apply: function (compiler) {

            const fs = require('fs');


            compiler.plugin('after-emit', function (compilation, done) {

                console.log('--------------------------------------------')
                console.log('----------writing stats---------------------')
                console.log('--------------------------------------------')

                var stats = compilation.getStats().toJson({
                    // node_modules/webpack/lib/Stats.js
                    hash: true,
                    version: true,
                    timings: false,
                    assets: true,
                    chunks: false,
                    chunkModules: false,
                    chunkOrigins: false,
                    modules: false,
                    cached: false,
                    reasons: true,
                    children: false,
                    source: false,
                    errors: false,
                    errorDetails: false,
                    warnings: false,
                    publicPath: true,
                });
                delete stats.assets;
                fs.writeFile('webpack.stats-dump.json', JSON.stringify(stats), done);
            });
        }
    }

}