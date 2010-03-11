
/*
 * hookio/site
 * All site request routed here, to be routed to specific site functions
 */

var hookIO = require('../../hookio').hookIO;

var views = require('./views');


hookIO.addListener('SiteRequest', function(request, response) {
  switch (request.url) {
    case '/queue':
      // TODO: Generate queue page
    break;

    // Home page
    case '/':
		break;
		
		case '/index.html':
      hookIO.emit('HttpResponse', response, {},
                  'Home Page!');
    break;

		case '/hooks':
	 	  hookIO.api.getAllHooks( function(e,i){hookIO.emit('HttpResponse', response, {},views.viewHooks(i));})
    break;

    default:
      hookIO.emit('Http404Response', response);
    break;
  }
});
