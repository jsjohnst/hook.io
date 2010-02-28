// hook.io json-rpc
var hookIO = require('./index').hookIO;
var sys = require('sys');

hookIO.addListener('JsonrpcRequest', function(request, response) {

  //var incoming_json = JSON.parse(request.body);
  //JSON.parse(request.body);
  response.sendHeader(200, {'Content-Type':'text/html'});	
  response.write(request.body);
  response.close();
});
