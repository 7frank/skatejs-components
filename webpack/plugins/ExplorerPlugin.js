function ExplorerPlugin() {}

ExplorerPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {

        // Explore each chunk (build output):
        compilation.chunks.forEach(function(chunk) {
            // Explore each module within the chunk (built inputs):



            chunk.modules.forEach(function(module) {
                // Explore each source file path that was included into the module:

                //not set in dev-mode
                if (!module.rawRequest) return

                var matches=  module.rawRequest.match(new RegExp("font-awesome.css","g"))
                var isSearchedFile=matches!=null&& matches.length==1



                console.log( module.rawRequest)

                if (module.fileDependencies)
                module.fileDependencies.forEach(function(filepath) {

                    console.log("dependency:",filepath)
                    // we've learned a lot about the source structure now...
                });

                if (isSearchedFile)
                    console.log("found file")


            });


        });

        callback();
    });
};

module.exports = ExplorerPlugin;