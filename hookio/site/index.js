
/*
 * hookio/site
 * All site request routed here, to be routed to specific site functions
 */

var hookIO = require('../../hookio').hookIO;


hookIO.addListener('SiteRequest', function(request, response) {
  switch (request.url) {
    case '/queue':
      // TODO: Generate queue page
    break;

    // Home page
    case '/':
    case '/index.html':
      hookIO.emit('HttpResponse', response, {},
                  'Home Page!');
    break;

    default:
      hookIO.emit('Http404Response', response);
    break;
  }
});
