/*
 * hookio/outgoing.js
 *
 * Handles and routes outgoing responses / requests
 */

var hookIO = require('../hookio').hookIO;
var sys = require('sys');

hookIO.addListener('Http404Response', function(request, response) {
  response.writeHeaders(404, {});
  response.write('Page not found.');
  response.close();
});

hookIO.addListener('JsonrpcResponse', function(response, jsonrpcData, result) {
  
});

hookIO.addListener('HttpResponse', function(response, headers, body) {
  var responseHeaders = {
  };

  process.mixin(responseHeaders, headers);

  // TODO: Parse XML automagically
  if ('application/json' === headers['Content-Type'] &&
      'string' !== typeof body)
    body = JSON.stringify(body);

  response.writeHeaders(200, headers);
  response.write(body);
  response.close();
});

hookIO.addListener('HttpClientRequest', function(options) {
  new hookIO.http.Client(options).close();
});

