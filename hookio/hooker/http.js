
/*
 * hookio/hooker/http
 * Handles http protocol hooks
 */

var hookIO = require('../index').hookIO;


var keyExpression = /^\/(\w+)/;

hookIO.addListener('HttpHookRequest', function(request, response) {
  try {
    var hook = request.url.match(keyExpression);

    hook = hookIO.db.getHook('http', hook[1]);
  } catch (error) {}

  if ('object' === typeof hook) {
    var definition = hookIO.hooker.hooks[hook.type];

    if ('http' === definition.protocol) {
      var data = definition.handle(request);

      hookIO.emit('ActionTrigger', hook, data);
      hookIO.emit('JsonrpcResponse', 'success', null, null);
      return;
    }
  }

  hookIO.emit('Http404Response', response);
});
