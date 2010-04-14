/*
 * the hook.io /site/ folder is a mini dynamic html server
 * any incoming http requests that are not sent to the API are routed here
 * technically, you could build an entire web application in this folder
 * i would recommend only using the /site/ folder for minimalistic reports
 * you can also include hook.io as a CommonJS module inside of another node.js web app framework
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
      hookIO.emit('HttpResponse', response, {}, 'Home Page!');
    break;

	  case '/hooks':
      hookIO.api.getAllHooks( function(e,i){hookIO.emit('HttpResponse', response, {},views.viewHooks(i));})
    break;

	  	case '/actions':
      hookIO.api.getAllActions( function(e,i){hookIO.emit('HttpResponse', response, {},views.viewActions(i));})
    break;

    case '/definitions':
      hookIO.api.getDefinitions( function(e,i){hookIO.emit('HttpResponse', response, {},views.viewDefinitions(i));})				  
  	break;

    default:
      // did we 404 or find a custom hook.io listening URL ?
      if(typeof response.results != 'undefined'){
        hookIO.emit('HttpResponse', response, {},'we found a hook.io webhook listening on this URL : ' + request.url);
        //hookIO.debug(response.results);
        //hookIO.debug(response.results.length);
      }
      else{
        hookIO.emit('Http404Response', request, response);
      }
  
    break;
  }
});
