// hook.io json-rpc
var hookIO = require('./index').hookIO;
var sys = require('sys');

hookIO.addListener('JsonrpcRequest', function(request, response) {
  sys.puts('JsonrpcRequest');
   try {
    //hookIO.api[request.httpParams.method].apply(hookIO.api, request.httpParams.params);
	hookIO.api.createHook(request.httpParams);
  } catch (error) {
    sys.puts(JSON.stringify(error) + ' Jsonrpc method not available');
  }
  response.sendHeader(200, {'Content-Type':'text/html'});	
  response.write(JSON.stringify(request.httpParams));
  response.close();
});