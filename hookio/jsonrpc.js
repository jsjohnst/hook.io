// hook.io json-rpc
hookIO.addListener('JsonrpcRequest', function(request, response) {
  response.writeHeaders(200, {});
  response.write('JSONRPC');
  response.close();
});
