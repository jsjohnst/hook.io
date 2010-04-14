
/*
 * hookio/incoming.js
 *
 * Handles and routes incoming requests
 */

var hookIO = require('../hookio').hookIO;
var querystring = require('querystring');
var url = require('url');


var pathExpression = /^(\/[^\/]+)(.*)$/;

hookIO.addListener('HttpRequest', function(request, response) {
  var httpParams = querystring.parse(request.body);
  httpParams.mixin(url.parse(request.url));
  request.params = httpParams;

  if ('/' !== request.url)
    var path = request.url.match(pathExpression);
  else
    var path = ['/', '/', ''];

  switch (path[1]) {
    case '/jsonrpc':
      hookIO.emit('JsonrpcRequest', request, response);
      break;

    case '/hook':
      // HTTP Hooks
      request.url = path[2];
      hookIO.emit('HttpHookRequest', request, response);
      break;

    // Oauth
    case '/oauth/confirm':
      break;

    default:
    
      // two things could be happening here
      
      // 1. a request for custom hook.io url (defined as a hook listener of type http) came in
      //    if this is the case we should do a getHooks call with the url set as the hook path

        // check if custom hook.io url path exists in DB
        // add some validation / forbidden paths here
        var processedPath = request.url.slice(1, request.url.length);
        //hookIO.debug(processedPath);
        
        hookIO.api.getHooks({
            "path":processedPath
          },
          function(err,results){
            //hookIO.debug(results);
            if(results.length){
              response.results = results;
              //hookIO.debug('hook.io has found a listening url that has matched');
              //hookIO.debug(results);
              hookIO.emit('SiteRequest', request, response);
            }
            else{

              // 2. a request for the /site/ folder might have come in
              //    if this is the case we should emit the SiteRquest event 

                // since the custom path wasn't found, we will assume it a /site/ request
              // Assume we are serving the site
              hookIO.emit('SiteRequest', request, response);

              
            }

         });
      
      break;
  }
});