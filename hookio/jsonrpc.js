// hook.io json-rpc

var hookIO = require('./index').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  response.writeHeaders(200, {});
  response.write('JSONRPC');
  response.close();
});
