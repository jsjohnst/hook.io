/*
 * hookio/api/core
 * core API logic for working with the hook.io api
 */

var hookIO = require('../../hookio').hookIO;

exports.ping = function() {
  callback = arguments[arguments.length - 1];
  try {
   callback(null, 'pong');		
  } catch (error) {
    callback(error, null);
  }
};
