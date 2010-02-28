// hook.io json-rpc
var hookIO = require('./index').hookIO;
var sys = require('sys');


hookIO.addListener('JsonrpcRequest', function(request, response) {

  // switch jsonrpc.request
  switch (request.httpParams.method){
    case 'createHook' :  
	  sys.puts('createHook')
	break;
	
	default :
	  sys.puts('method not found');
	break;

  }
  //var incoming_json = JSON.parse(request.body);
  //JSON.parse(request.body);
  response.sendHeader(200, {'Content-Type':'text/html'});	
  response.write(JSON.stringify(request.httpParams));
  response.close();
});
