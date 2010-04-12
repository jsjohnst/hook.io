
/*
 * hookio/protocols/documentation
 * Implements a documentation protocol for generating various documentation for hook.io
 */

var hookIO = require('../../hookio').hookIO,
sys = require('sys'),
fs = require('fs');

exports.start = function() {
  parseMarkDownDocs();
};

var parseMarkDownDocs = exports.parseMarkDownDocs = function(){
  sys.puts('parseMarkDownDocs');
  var result = {};
   fs.readdir(hookIO.PATH + '/docs', function(error, files) {
     files.forEach(function(doc) {
       if ('.md' !== doc.slice(-3))
         return;
         doc = doc.slice(0, -3);
         sys.puts(hookIO.PATH + '/docs/' + doc);
     });
   });
};
