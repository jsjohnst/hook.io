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
  process.mixin(httpParams, url.parse(request.url));
  request.params = httpParams;

  // TODO: Route incoming http requests
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
      // Assume we are serving the site
      hookIO.emit('SiteRequest', request, response);
      break;
  }
});
