
/*
 * hookio/api/hooks
 * API logic for working with hooks
 */

var hookIO = require('../../hookio').hookIO,
  Hook = require('../models/hook').Hook,
  validateConfig = require('../lib/helpers').validateConfig,
  sys = require('sys')
  ;


function hookCheck(hook) {
  // Validation
  if ('object' !== typeof hook ||
      'string' !== typeof hook.type) {
    throw new Error('Badly formed hook object');
  }
}

exports.getHooks = function() {
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

exports.createHook = function() {
  var hook = arguments[0],
    callback = arguments[arguments.length - 1];

  try {
    hookCheck(hook);
    // attempt to process and store actions
    if(typeof hook.actions != 'undefined'){
      if(hook.actions.length){
        // we could iterate over this array and create many actions for one hook
        hookIO.api.createAction(hook.actions[0], function(hrmm, id){
          // create Hook
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
            hook.data.actions=[id];
            //hookIO.debug(hook);
            hookIO.db.storeHook(hook, key, function(id) {
              callback(null, id);
            });

          });
        });
      }
    }
    else{
      // create Hook
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
    }
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
								//hook.params.result = JSON.parse(hook.result);
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

    hookIO.debug(hook);
    if ('number' !== typeof hook.config.hookID)
      throw new Error('Badly formed hook ID');

    if ('number' !== typeof hook.config.actionID)
      throw new Error('Badly formed action ID');

    hook = new Hook({
      id: hook.id
    });

    hookIO.debug('attachingAction');
    hookIO.debug(hook);
    
    /*
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
    */
    callback(null,1);
  } catch (error) {
    callback(error, null);
  }
};
