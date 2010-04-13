/*
 * hookio/api/core
 * core API logic for working with the hook.io api
 */

var hookIO = require('../../hookio').hookIO,
debug = require('../lib/node_debug/node_debug/debug');

exports.ping = function() {
  var callback = arguments[arguments.length - 1];

  try {
    callback(null, 'pong');
  } catch (error) {
    callback(error, null);
  }
};

exports.getProtocols = function() {
  var callback = arguments[arguments.length - 1];

  try {
    callback(null, JSON.stringify(hookIO.protocol));
  } catch (error) {
    callback(error, null);
  }
};


exports.getEvents = function() {
  var callback = arguments[arguments.length - 1];

	 debug.log(hookIO.hooker);

  try {
			 //debug.log(hookIO);
    callback(null, hookIO);
  } catch (error) {
    callback(error, null);
  }
};

exports.getDefinitions = function() {
  var callback = arguments[arguments.length - 1];

  try {
    callback(null, JSON.stringify(hookIO.protocol));
  } catch (error) {
    callback(error, null);
  }
};