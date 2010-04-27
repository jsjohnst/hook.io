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
  
  hookIO.debug('incoming site request ' + request.url);
  
  switch (request.url) {
    case '/queue':
      // TODO: Generate queue page
    break;

    // Home page
    case '/':
	  break;

    case '/favicon.ico':
      hookIO.emit('HttpResponse', response, {}, '');
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
    
        //   an unknown route was sent to the /site/
        //   this probaly means a request for a custom hook.io route (defined as a hook listener of type http) came in
        //   we need to check the database to see if this route exists, if not its a 404
        
          // add some validation / forbidden paths here
          var processedPath = request.url.slice(1, request.url.length);
          //hookIO.debug(processedPath);

          hookIO.debug('ehh');

          hookIO.api.getHooks({
              "path":processedPath
            },
            function(err,hooks){
              hookIO.debug('getHooks callback');
              //hookIO.debug(results);
              if(hooks.length){
                hookIO.debug('hook.io has found a listening url that matches: ' + request.url);
                hookIO.debug(hooks[0]);
                hookIO.api.getActions({"id":hooks[0].actions},
                  function(err, actions){
                  hookIO.debug('hook.io has found the following actions' + JSON.stringify(actions));
                  // now that we have found the actions attached to our hook we are going to execute those actions
                  // we shouldn't be delegating this event like this, it should be done through the eventemitters
                  hookIO.emit('HttpResponse', response, {}, views.viewUrlHook({"hooks":hooks}));
                });
                //hookIO.debug(results);
              }
              else{
                hookIO.emit('Http404Response', request, response);
              }
           });
    
    break;
  }
});
