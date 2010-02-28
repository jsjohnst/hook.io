/*
 * hookio/outgoing.js
 *
 * Handles and routes outgoing responses / requests
 */

var hookIO = require('../hookio').hookIO;
var sys = require('sys');

hookIO.addListener('Http404Response', function(request, response) {
  response.writeHeaders(404, {});
  response.write('Page not found.');
  response.close();
});

hookIO.addListener('SiteRequest', function(request, response) {
  sys.puts(JSON.stringify(response));
  response.sendHeader(200,{'Content-Type':'text/html'});	
  response.write('This be the default page');
  response.close();
});

hookIO.addListener('HttpClientRequest', function(options) {
  new hookIO.http.Client(options).close();
});

