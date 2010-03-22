
/*
 * hookio/actioner/send_email
 * quick send_mail using node_mailer
 */

var hookIO = require('../../hookio').hookIO;
var sys = require('sys');

hookIO.addListener('SendEmailActionTrigger', function(action, definition) {
  var params = action.get('params'),
  config = action.get('config');
  sys.puts('SendEmailActionTrigger');


});
