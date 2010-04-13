
/*
 * hookio/actioner/email
 * quick e-mails using node_mailer
 */

var hookIO = require('../../hookio').hookIO;

hookIO.addListener('EmailActionTrigger', function(action, definition) {
  var params = action.get('params'),
      config = action.get('config');

  // TODO: Send the email
  // W/e the parameters are, hookIO.EMAIL_DEFAULTS contains email settings, config['to'] contains
  // the email address to send to.
  hookIO.protocol.email.send();

  hookIO.emit('ActionCompleted', action);
});
