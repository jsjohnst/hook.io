
/*
 * hookio/protocols/haml
 * Implements a haml protocol for parsing haml text into HTML
 */

var hookIO = require('../../hookio').hookIO,
sys = require('sys'),
haml = require('../lib/haml/lib/haml');

exports.start = function() {
};

var parse = exports.parse = function(hamlText,optionsToMerge){
  return haml.render(hamlText,optionsToMerge);
};
