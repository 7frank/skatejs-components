| |
| :---: |
| <h1>keyboard-interactions</h1> |
| Wrapper around keyboard inputs  |
| [![Build Status][ci-image]][ci-url] [![Project License][license-image]][license-url] |
| [![Grade Badge][codacy-grade-image]][codacy-grade-url] [![Coverage Badge][coverage-image]][coverage-url]   |
| [![Dependencies][dep-status-image]][dep-status-url] [![Dev Dependencies][devdep-status-image]][devdep-status-url] |


# Project Overview

This library contains a simple wrapper for *different* input methods. By introducing an 'action' to bind multiple input combos plus their handlers with it a better customisation by the user may be achieved. 

## Features
* Better Usability by customizing Keyboard Inputs


## TODO
* have a production built that optimises bundle size 
    * this is only for testing as the comonents should probably not be loaded statically
    * find out about redundant jquery and lodash imports for keyboard and core-components
    * what to do with the font awesome icon imports and fonts..
        * removing fonts statically might be bad for older browsers
        * loading fonts inline(one big chunk) might also be bad for mobile performance
        
* loaders
    * how to define multiple loaders for *.css with separate behaviour 
        * like node_modules/*.css and src/*.css 
        * global includes and local includes for shadow dom
    * the current implementation is working but rather less fancy 
    
    
    
    


<!-- ASSETS and LINKS -->
<!-- License -->
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: 



<!-- travis-ci -->
[ci-image]: https://travis-ci.org/frank1147/skatejs-components.svg?branch=master
[ci-url]: https://travis-ci.org/frank1147/skatejs-components

 [![Build Status](https://travis-ci.org/frank1147/skatejs-components.svg?branch=master)]()

<!-- Codacy Badge Grade -->
[codacy-grade-image]: https://api.codacy.com/project/badge/Grade/7a47a8ae8682467b9e33a3d47a6fbd54
[codacy-grade-url]: https://www.codacy.com/app/frank1147/skatejs-components?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=frank1147/skatejs-components&amp;utm_campaign=Badge_Grade

<!-- Codacy Badge Coverage -->
[coverage-image]: https://api.codacy.com/project/badge/Coverage/7a47a8ae8682467b9e33a3d47a6fbd54
[coverage-url]: https://www.codacy.com/app/frank1147/skatejs-components?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=frank1147/skatejs-components&amp;utm_campaign=Badge_Coverage

[dep-status-image]: https://david-dm.org/frank1147/skatejs-components/status.svg
[dep-status-url]: https://david-dm.org/frank1147/skatejs-components#info=dependencies
[devdep-status-image]: https://david-dm.org/frank1147/skatejs-components/dev-status.svg
[devdep-status-url]: https://david-dm.org/frank1147/skatejs-components#info=devDependencies

<!-- Screenshots -->
