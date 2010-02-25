/*
 * hookio/outgoing.js
 *
 * Handles and routes outgoing responses / requests
 */

var hookIO = require('./index').hookIO;


hookIO.addListener('Http404Response', function(response) {
  response.writeHeaders(404, {});
  response.write('Page not found.');
  response.close();
});
