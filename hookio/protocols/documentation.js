
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
  var parsedFiles = 0;
  var numFiles = 0;
  
  var results = [];
  
   fs.readdir(hookIO.PATH + '/docs', function(err,files) {
     readAllFiles(hookIO.PATH + '/docs/', files, 0, results, function(results){
       
       results.forEach(function(r){
         htmlBook+=r;  
       });
       htmlBook = hookIO.protocol.markdown.parse(htmlBook);
       fs.writeFile(hookIO.PATH + '/docs/html/' + 'theBook' + '.html' , htmlBook , function (err) {
         if (err) throw err;
         sys.puts('saved to : ' + hookIO.PATH + '/docs/html/' + 'theBook' + '.html');
       });
       
       
    });

     });
  
};


function readAllFiles(dir, files, index, results, complete) {
  if(index >= files.length) {
    complete(results);
    return;
  }
  sys.puts('reading file: ' + hookIO.PATH + '/docs/' + files[index]);
  fs.readFile(dir + files[index], 'binary', function(err, data) {
    //if ('.md' == files[index].slice(-3)) {
    //  results[index] = data;  
    //}
    results[index] = data;
    index++;
    readAllFiles(dir, files, index, results, complete);
    
  });
}


function dumpHtmlBook() {
  if(parsedFiles >= numFiles) {
    sys.puts(htmlBook.length);
  }
}
