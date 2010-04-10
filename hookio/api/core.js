/*
 * hookio/api/core
 * core API logic for working with the hook.io api
 */

var hookIO = require('../../hookio').hookIO;

exports.ping = function() {
  var callback = arguments[arguments.length - 1];

  try {
    callback(null, 'pong');
  } catch (error) {
    callback(error, null);
  }
};

exports.getDefinitions = function() {
  var callback = arguments[arguments.length - 1];

  try {
    callback(null, hookIO.actioner);
  } catch (error) {
    callback(error, null);
  }
};
