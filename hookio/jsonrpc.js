// hook.io json-rpc
var hookIO = require('./index').hookIO;

hookIO.addListener('JsonrpcRequest', function(request, response) {
  response.sendHeader(200, {});
  response.write('JSONRPC');
  response.close();
});
