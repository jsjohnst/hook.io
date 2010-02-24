/*
 * hookio/hooker/index.js
 *
 * Index file for the package responsible for handling hooks
 */

var hookIO = require('../index').hookIO,
  fs = require('fs');


// TODO: Remove
process.mixin(global, require('sys'));

var hooks = {};

// Load hook definitions
fs.readdir(hookIO.PATH + '/definitions/hooks', function(error, files) {
  files.forEach(function(hook) {
    hook = hook.slice(0, -3);
    hook = require(hookIO.PATH + '/definitions/hooks/' + hook);

    try {
      
    } catch (error) {}
  });
});
