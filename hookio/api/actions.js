
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
      'string' !== typeof action.protocol ||
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
      protocol: action.protocol,
      type: action.type,
      config: action.config
    });
    var definition = hookIO.actioner.actions[action.get('type')];

    if (false === validateConfig(action, definition))
      throw new Error('Badly formed user config');

    var key = action.get('config')[definition.keyField];

    hookIO.db.storeAction(action, key, function(id) {
      callback(null, id);
    });
  } catch (error) {
    callback(error, null);
  }
};
