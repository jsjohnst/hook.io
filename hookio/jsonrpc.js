// hook.io json-rpc
var hookIO = require('../hookio').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  try {
    var jsonrpcRequest = JSON.parse(request.body),
      args = jsonrpcRequest.params;

    args.params.push(function(error, result) {
      if (error)
        hookIO.emit('Jsonrpc400Response', response, error, jsonrpcRequest);
      else
        hookIO.emit('JsonrpcResponse', response, jsonrpcRequest, result);
    });

    hookIO.api[jsonrpcRequest.method].apply(hookIO.api, args);
  } catch (error) {
    hookIO.emit('Jsonrpc400Response', response, error, jsonrpcRequest || null);
  }
});
