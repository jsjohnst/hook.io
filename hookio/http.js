
/*
 * hookio/http.js
 *
 * The http stuff for hook.io
 * Initializes and sets up http related logic
 */

var http = require('http'),
  hookIO = require('./index').hookIO;

var httpServer = http.createServer(function(request, response) {
  request.body = '';
  request.addListener('data', function(chunk) {
    request.body = request.body + chunk;
  });

  request.addListener('end', function() {
    hookIO.emit('HttpRequest', request, response);
  });
});

exports.start = function() {
  httpServer.listen(hookIO.HTTP_PORT);
};
