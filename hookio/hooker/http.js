
/*
 * hookio/hooker/http
 * Handles http protocol hooks
 */

var hookIO = require('../index').hookIO;


var keyExpression = /^\/(\w+)/;

hookIO.addListener('HttpHookRequest', function(request, response) {
  try {
    var hook = request.url.match(keyExpression);

    hookIO.db.getHook('http', hook[1], function(hook) {
      if ('object' === typeof hook) {
        var definition = hookIO.hooker.hooks[hook.type];

        if ('http' === definition.protocol) {
          hook.params = definition.handle(request);

          hookIO.emit('ActionTrigger', hook, definition);
          hookIO.emit('JsonrpcResponse', response, 'success', null, null);
          return;
        }
      }

      hookIO.emit('Http404Response', response);
    });
  } catch (error) {}

});
