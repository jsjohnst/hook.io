
/*
 * hookio/protocols/mustache
 * Implements a mustache protocol for parsing mustache tags out of text
 */

var hookIO = require('../../hookio').hookIO,
sys = require('sys'),
mu = require('../lib/mu/lib/mu');

exports.start = function() {
  //hookIO.debug(parse());
};

// parse() will perform a sync render with no stream. it is not advised to use this for large blocks of text
// or operations that run outside of startup
var parse = exports.parse = function(textWithMustaches, dataToMerge){
  return mu.render(textWithMustaches, dataToMerge);
};

// parseAsync() will perform an asycrounous render to a stream. you must supply a callback to execute when the
// parse completes.
var parseAsync = exports.parseAsync = function(textWithMustaches, dataToMerge, callback){
  return mu.render(textWithMustaches, dataToMerge, callback);
};
