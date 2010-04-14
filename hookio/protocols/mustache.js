
/*
 * hookio/protocols/mustache
 * Implements a mustache protocol for parsing mustache tags out of text
 */

var hookIO = require('../../hookio').hookIO,
mu = require('../lib/mu/lib/mu');

exports.start = function() {
  // little test case
  var renderedText = parse('hello this is a template named {tName}',{"tName":"updog"});
  hookIO.debug(renderedText);
};

// parse() will perform a sync render with no stream. it is not advised to use this for large blocks of text
// or operations that run outside of startup
var parse = exports.parse = function(textWithMustaches, dataToMerge){
  return mu.compileText(textWithMustaches, dataToMerge);
};
