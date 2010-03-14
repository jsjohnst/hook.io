/*
 * hookio/hooker/index.js
 *
 * Index file for the package responsible for handling hooks
 */

var hookIO = require('../../hookio').hookIO,
  fs = require('fs');


var hooks = exports.hooks = {};

// Load hook definitions
var updateDefinitions = exports.update = function(callback) {
  var result = {};
  fs.readdir(hookIO.PATH + '/definitions/hooks', function(error, files) {
    files.forEach(function(hook) {
      if ('.js' !== hook.slice(-3))
        return;

      hook = hook.slice(0, -3);
      hook = require(hookIO.PATH + '/definitions/hooks/' + hook);

      try {
        hook = hook.hook;

        result[hook.name] = hook;
      } catch (error) {}
    });

    hooks = exports.hooks = result;

    if ('function' === typeof callback)
      callback(hooks);

    hookIO.emit('HookDefinitionsUpdated', hooks);
  });
};

process.mixin(exports, require('./http'));
process.mixin(exports, require('./timer'));

