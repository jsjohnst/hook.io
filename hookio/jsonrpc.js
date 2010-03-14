// hook.io json-rpc
var hookIO = require('../hookio').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  try {
    var jsonrpcRequest = JSON.parse(request.body),
      args = jsonrpcRequest.params;
		
				 // what if we have an api call with no parameters ?
					if(!(args instanceof Array)){
						args = new Array();
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
