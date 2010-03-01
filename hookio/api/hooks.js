
/*
 * hookio/api/hooks
 * API logic for working with hooks
 */

var hookIO = require('../../hookio').hookIO,
  Hook = require('../models/hook').Hook,
  validateConfig = require('../lib/helpers').validateConfig;


function hookCheck(hook) {
  // Validation
  if ('object' !== typeof hook ||
      'string' !== typeof hook.protocol ||
      'string' !== typeof hook.type) {
    throw new Error('Badly formed hook object');
  }
}

exports.createHook = function() {
  var hook = arguments[0],
    callback = arguments[arguments.length - 1];

  try {
    hookCheck(hook);

    hook = new Hook({
      protocol: hook.protocol,
      type: hook.type,
      config: hook.config
    });
    var definition = hookIO.hooker.hooks[hook.get('type')];

    if (false === validateConfig(hook, definition))
      throw new Error('Badly formed user config');

    hookIO.db.storeHook(hook, function(id) {
      callback(null, id);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.attachActionToHook = function() {
  var hook = arguments[0],
    actionID = arguments[1],
    callback = arguments[arguments.length - 1];

  try {
    hookCheck(hook);

    if ('number' !== hook.id)
      throw new Error('Badly formed hook ID');

    if ('number' !== actionID)
      throw new Error('Badly formed action ID');

    hook = new Hook({
      id: hook.id,
      protocol: hook.protocol,
      type: hook.type,
      config: hook.config,
      actions: hook.actions instanceof Array ? hook.actions : []
    });

    var actions = hook.get('actions');
    actions.push(actionID);
    hook.set('actions', actions);

    var definition = hookIO.hooker.hooks[hook.get('type')];

    if (false === validateConfig(hook, definition))
      throw new Error('Badly formed user config');

    hookIO.db.updateHook(hook, function(id) {
      callback(null, id);
    });
  } catch (error) {
    callback(error, null);
  }
};
