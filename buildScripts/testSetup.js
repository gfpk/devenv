// This file isn't transpiled so must use  CommonJS and ES5

//Register babel to transpile tests before they run.
require('babel-register')();

//Disable webpack features that Mocha doesn't undersytand. If sees .css treat it as emty function
require.extensions['.css'] = function(){};
