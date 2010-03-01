// hook.io json-rpc
var hookIO = require('../hookio').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  try {
    var jsonrpcRequest = JSON.parse(request.body),
      result = hookIO.api[jsonrpcRequest.method].apply(hookIO.api, jsonrpcRequest.params);

    hookIO.emit('JsonrpcResponse', response, jsonrpcRequest, result);
  } catch (error) {
    hookIO.emit('Jsonrpc404Response', response, error, jsonrpcRequest || null);
  }
});
