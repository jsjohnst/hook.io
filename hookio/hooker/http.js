
/*
 * hookio/hooker/http
 * Handles http protocol hooks
 */

var hookIO = require('../../hookio').hookIO;

process.mixin(global, require('sys'));

var keyExpression = /^\/(\w+)/;

hookIO.addListener('HttpHookRequest', function(request, response) {
  try {
    var hook = request.url.match(keyExpression);

    if (null !== hook) {
      hookIO.db.getHooks({
        protocol: 'http',
        key: hook[1]
      }, function(hooks) {
        hooks.forEach(function(hook) {
          if (null !== hook && 'object' === typeof hook) {
            var definition = hookIO.hooker.hooks[hook.get('type')];

            if ('http' === definition.protocol) {
              hook.set('params', definition.handle(request));

              hookIO.emit('ActionTrigger', hook, definition);
              hookIO.emit('JsonrpcResponse', response, { id: null }, 'success');
            } else {
              hookIO.emit('Http404Response', request, response);
            }
          } else {
            hookIO.emit('Http404Response', request, response);
          }
        });

        hookIO.emit('HookCompleted', hook);
      });
    } else
      hookIO.emit('Http404Response', request, response);
  } catch (error) {
    hookIO.emit('HttpResponse', response, {}, inspect(error.message));
  }
});
