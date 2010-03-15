
/*
 * hookio/hooker/timer
 * Handles timer protocol hooks
 */

var hookIO = require('../../hookio').hookIO;

hookIO.addListener('TimerHookRequest', function(hook) {
  var definition = hookIO.hooker.hooks['timer'];

  hookIO.emit('ActionTrigger', hook, definition);
});
