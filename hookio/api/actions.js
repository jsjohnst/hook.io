
/*
 * hookio/api/actions
 * API for dealing with actions
 */

var hookIO = require('../../hookio').hookIO,
  Action = require('../models/action').Action,
  validateConfig = require('../lib/helpers').validateConfig;


function actionCheck(action) {
  // Validation
  if ('object' !== typeof action ||
      'string' !== typeof action.type) {
    throw new Error('Badly formed action object');
  }
}

exports.createAction = function() {
  var action = arguments[0],
    callback = arguments[arguments.length - 1];

  try {
    actionCheck(action);

    action = new Action({
      type: action.type,
      config: action.config
    });
    var definition = hookIO.actioner.actions[action.get('type')];
    if ('object' !== typeof definition) {
      throw new Error('action definition type ' + action.get('type') + ' doesn\'t exist!');
    }
    action.set('protocol', definition.protocol);

    if (false === validateConfig(action, definition))
      throw new Error('Error: invalid configuration for hook action');

    var key = action.get('config')[definition.keyField];
    hookIO.db.checkAction({
      protocol: action.get('protocol'),
      key: key,
      config: action.get('config')
    }, function(exists) {
      if (exists) {
        callback(null, exists);
        return;
      }

      hookIO.db.storeAction(action, key, function(id) {
        callback(null, id);
      });
    });

  } catch (error) {
    hookIO.debug(error);
    callback(error, null);
  }
};

exports.getActions = function(conditions, callback) {
  hookIO.debug('api.getActions');
  hookIO.debug(conditions);
  
  callback = arguments[arguments.length - 1];

  try {
    hookIO.db.getActions(conditions, function(actions) {
      var ret = [];

      actions.forEach(function(action) {
        ret.push(action.toJson());
      });

      callback(null, ret);
    });
  } catch (error) {
    callback(error, null);
  }
};


exports.getAllActions = function() {
	
  callback = arguments[arguments.length - 1];

  try {
    hookIO.db.getAllActions(function(actions) {
      var ret = [];

      actions.forEach(function(action) {
        ret.push(action.toJson());
      });

      callback(null, ret);
    });
  } catch (error) {
    callback(error, null);
  }
};

