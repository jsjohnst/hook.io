// hook.io json-rpc
var hookIO = require('../hookio').hookIO,
  api = require('./api');

var sys = require('sys');

hookIO.addListener('JsonrpcRequest', function(request, response) {
  sys.puts('JsonrpcRequest');
   try {
    api[request.httpParams.method](request.httpParams.params);
  } catch (error) {
    sys.puts(JSON.stringify(error) + ' Jsonrpc method not available');
  }
  response.sendHeader(200, {'Content-Type':'text/html'});	
  response.write(JSON.stringify(request.httpParams));
  response.close();
});
