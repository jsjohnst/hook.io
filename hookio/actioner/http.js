
/*
 * hookio/actioner/http
 * HTTP specific action handling
 */

var hookIO = require('../index').hookIO;


hookIO.addListener('HttpActionTrigger', function(action, definition) {
  definition.handle(action);

  var params = action.get('params'),
    config = action.get('config');

  // TODO: Further parse URL for port numbers and such

  hookIO.emit('HttpClientRequest', {
    url: config.url,
    method: config.method,
    data: params.body,
    headers: {
      'Content-Type': params.contentType
    },
    success: function() {
      hookIO.emit('ActionCompleted', action);
    }
  });
});
