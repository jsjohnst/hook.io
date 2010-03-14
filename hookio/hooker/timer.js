
/*
 * hookio/hooker/timer
 * Handles timer protocol hooks
 */

var hookIO = require('../../hookio').hookIO;

process.mixin(global, require('sys'));

var keyExpression = /^\/(\w+)/;

hookIO.addListener('HttpHookRequest', function(request, response) {
  try {
    var hook = request.url.match(keyExpression);

    if (null !== hook) {
      hookIO.db.getHook('http', hook[1], function(hook) {
        if (null !== hook && 'object' === typeof hook) {
          var definition = hookIO.hooker.hooks[hook.get('type')];

          if ('http' === definition.protocol) {
            hook.set('params', definition.handle(request));

            hookIO.emit('ActionTrigger', hook, definition);
            hookIO.emit('JsonrpcResponse', response, { id: null }, 'success');
            return;
          }
        }
        hookIO.emit('Http404Response', response);
      });
    } else
      hookIO.emit('Http404Response', response);
  } catch (error) {
    hookIO.emit('HttpResponse', response, {}, inspect(error.stack));
  }

});
