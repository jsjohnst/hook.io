/*
 * hookio/incoming.js
 *
 * Handles and routes incoming requests
 */

var hookIO = require('./index').hookIO,
  actioner = require('./actioner');


hookIO.addListener('HttpRequest', function(request, response) {
  // TODO: Route incoming http requests
});

hookIO.addListener('Tcp');
