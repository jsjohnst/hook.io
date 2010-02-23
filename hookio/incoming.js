/*
 * hookio/incoming.js
 *
 * Handles and routes incoming requests
 */

var hookIO = require('./index').hookIO,
  actioner = require('./actioner');


HookIO.addListener('HttpRequest', function(request, response) {
  // TODO: Route incoming http requests
});


