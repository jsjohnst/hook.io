
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
  
  var htmlBook = '';
   fs.readdir(hookIO.PATH + '/docs', function(error, files) {
     files.forEach(function(doc) {
       if ('.md' !== doc.slice(-3))
         return;
         sys.puts(hookIO.PATH + '/docs/' + doc);
  
         fs.readFile(hookIO.PATH + '/docs/' + doc , 'binary', function(err, data){
           htmlBook+=hookIO.protocol.markdown.parse(data);
         })
         
  
      
         
         
         
     });
     /*
     fs.writeFile(hookIO.PATH + '/docs/html/' + 'theBook' + '.html' , htmlBook , function (err) {
       if (err) throw err;
       sys.puts('saved to : ' + hookIO.PATH + '/docs/html/' + 'theBook' + '.html');
     });
     */
   });
};
