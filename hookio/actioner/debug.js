
/*
 * hookio/actioner/debug
 * a mock action for debugging
 */

var hookIO = require('../../hookio').hookIO, sys = require('sys');

hookIO.addListener('DebugActionTrigger', function(action, definition) {
  var params = action.get('params'), config = action.get('config');
		sys.puts(JSON.stringify(definition));
});
