/*
 * hookio/outgoing.js
 *
 * Handles and routes outgoing responses / requests
 */

var hookIO = require('../hookio').hookIO;
var sys = require('sys');

hookIO.addListener('Http404Response', function(response) {
  response.writeHeader(404, hookIO.HTTP.defaultHeaders);
  response.write('Page not found.');
  response.close();
});

hookIO.addListener('JsonrpcResponse', function(response, jsonrpcData, result) {
  var data = {
    id: jsonrpcData.id,
    result: result,
    error: null
  };

  hookIO.emit('HttpResponse', response, {
    'Content-Type': 'application/json'
  }, data);
});

hookIO.addListener('Jsonrpc400Response', function(response, error, jsonrpcData) {
  var data = {
    id: jsonrpcData.id || new Date().getTime(),
    result: null,
    error: {
      code: 400,
      message: error.message || 'API method not found'
    }
  };

  hookIO.emit('HttpResponse', response, {
    'Content-Type': 'application/json'
  }, data);
});

hookIO.addListener('HttpResponse', function(response, headers, body) {
  var responseHeaders = {};
  process.mixin(responseHeaders, hookIO.HTTP.defaultHeaders);
  process.mixin(responseHeaders, headers);

  // TODO: Parse XML automagically
  if ('string' !== typeof body) {
    if ('application/json' === responseHeaders['Content-Type'])
      body = JSON.stringify(body);
  }

  response.writeHeader(200, responseHeaders);
  response.write(body);
  response.close();
});

hookIO.addListener('HttpClientRequest', function(options) {
  new hookIO.http.Client(options).close();
});

