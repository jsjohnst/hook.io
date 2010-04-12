
/*
 * hookio/protocols/documentation
 * Implements a documentation protocol for generating various documentation for hook.io
 */

var hookIO = require('../../hookio').hookIO;

exports.start = function() {
  parseMarkDownDocs();
};

exports.parseMarkDownDocs = function(){
  hookIO.debug('parseMarkDownDocs');
};
