// hook.io json-rpc
// this file exposes the hookIO API over JSON-RPC

var hookIO = require('../hookio').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  try {
    var jsonrpcRequest = JSON.parse(request.body),
        args = jsonrpcRequest.params;

    if (false === args instanceof Array) {
      args = [];
    }

    args.push(function(error, result) {
      if (error)
        hookIO.emit('Jsonrpc400Response', response, error, jsonrpcRequest);
      else
        hookIO.emit('JsonrpcResponse', response, jsonrpcRequest, result);
    });

    hookIO.api[jsonrpcRequest.method].apply(hookIO.api, args);
  } catch (error) {
    hookIO.emit('Jsonrpc400Response', response, error, jsonrpcRequest || {});
  }
});
