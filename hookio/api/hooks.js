
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
      type: hook.type,
      config: hook.config
    });
    var definition = hookIO.hooker.hooks[hook.get('type')];
    hook.set('protocol', definition.protocol);

    if (false === validateConfig(hook, definition))
      throw new Error('Badly formed user config');

    var key = hook.get('config')[definition.keyField];

    hookIO.db.checkHook({
      protocol: hook.get('protocol'),
      key: key,
      config: hook.get('config')
    }, function(exists) {
      if (exists) {
        if (true !== definition.unique) {
          callback(null, exists);
        } else {
          callback(new Error('Duplicate'), null);
        }
        return;
      }

      hookIO.db.storeHook(hook, key, function(id) {
        callback(null, id);
      });
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.getAllHooks = function() {
  callback = arguments[arguments.length - 1];

  try {
    hookIO.db.getAllHooks(function(hooks) {
      var ret = [];

      hooks.forEach(function(hook) {
        ret.push(hook.toJson());
      });

      callback(null, ret);
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

    if ('number' !== typeof hook.id)
      throw new Error('Badly formed hook ID');

    if ('number' !== typeof actionID)
      throw new Error('Badly formed action ID');

    hook = new Hook({
      id: hook.id,
      type: hook.type,
      config: hook.config,
      actions: hook.actions instanceof Array ? hook.actions : []
    });

    var actions = hook.get('actions');
    actions.push(actionID);
    hook.set('actions', actions);

    var definition = hookIO.hooker.hooks[hook.get('type')];
    hook.set('protocol', definition.protocol);

    if (false === validateConfig(hook, definition))
      throw new Error('Badly formed user config');

    var key = hook.get('config')[definition.keyField];

    hookIO.db.updateHook(hook, key, function(id) {
      callback(null, id);
    });
  } catch (error) {
    callback(error, null);
  }
};
