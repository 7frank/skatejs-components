module.exports = ({ file, options, env }) => ({
  //  parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
       // 'postcss-import': {  root: file.dirname   },
      /*  "postcss-assets-rebase": {

            assetsPath: "assets/imported", // new path for all assets
            relative: true // is assetsPath relative to .css position.
                           //By default its relative to process.cwd()
        }*/
       // 'postcss-import': { root: file.dirname },
       // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
        //'autoprefixer': env == 'production' ? options.autoprefixer : false,
       // 'cssnano': env === 'production' ? options.cssnano : false

    }
})