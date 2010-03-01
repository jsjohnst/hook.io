
/*
 * hookio/api/hooks
 * API logic for working with hooks
 */

var hookIO = require('../../hookio').hookIO,
  Hook = require('../models/hook').Hook;


exports.createHook = function() {
  var hook = arguments[0],
    callback = arguments[arguments.length - 1];

  try {
    // Validation
    if ('string' !== typeof hook.protocol &&
        'string' !== typeof hook.type) {
      throw new Error('createHook: Badly formed hook object');
    }

    hook.actions = Array instanceof hook.actions || [];

    hook = new Hook(hook);
    var definition = hookIO.hooker.hooks[hook.get('type')];

    if (false === validateHookConfig(hook, definition))
      throw new Error('createHook: Badly formed user config');

    hookIO.db.storeHook(hook, function(id) {
      callback(null, id);
    });
  } catch (error) {
    callback(error, null);
  }
};

function validateHookConfig(hook, definition) {
  // Make sure our user config is well formed
}

exports.attachActionToHook = function(hook, actionID, callback) {

};
