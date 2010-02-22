var sys = require('sys'),http = require('http'),multipart = require( 'multipart' ),fs=require('fs'),mime=require('./mime'),api=require('./api'),querystring=require('querystring'),url=require('url'),hookIO=require('./hookIO');
// hook.IO web server - written by marak squires
// requests are briefly processed here and then passed along to the hookIO main application controller (hookIO.js)
http.createServer(function (req, resp) {
  req.body = '';
  req.addListener('data',function(chunk){
    req.body += chunk
  })
  req.addListener('end', function(){
    var httpParams = querystring.parse(req.body);							
    httpParams.pathname = url.parse(req.url).pathname;
    hookIO.hookIO.acceptRequest( req , resp , httpParams );
  })
}).listen(8000);
