/*
 * hookio/hooker/index.js
 *
 * Index file for the package responsible for handling hooks (listeners)
 */

var hookIO = require('../../hookio').hookIO,
    fs = require('fs');


var hooks = exports.hooks = {};

// Load hook definitions
var updateDefinitions = exports.update = function(callback) {
  var result = {};
  fs.readdir(hookIO.PATH + '/definitions/hooks/', function(error, files) {
    files.forEach(function(hook) {
      // don't try to require files that don't end in .js
						// if we add CoffeeScript support, we'll have to change this
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


exports.mixin(require('./http'));
exports.mixin(require('./timer'));

