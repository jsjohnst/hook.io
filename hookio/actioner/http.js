
/*
 * hookio/actioner/http
 * HTTP specific action handling
 */

var hookIO = require('../index').hookIO;


hookIO.addListener('HttpActionTrigger', function(hook) {
  hookIO.db.getActionsForHook(hook, function(actions) {
    
  });
});
