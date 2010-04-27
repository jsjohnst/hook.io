
/*
 * hookio/protocols/markdown
 * Implements a markdown protocol for parsing Markdown text into HTML
 */

var hookIO = require('../../hookio').hookIO,
sys = require('sys'),
md = require('../lib/markdown/lib/markdown');

exports.start = function() {
};

var parse = exports.parse = function(markdownText){
  return md.makeHtml(markdownText);
};
