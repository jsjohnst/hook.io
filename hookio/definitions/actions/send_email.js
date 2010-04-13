
/*
 * A action for sending e-mails
 */

exports.action = {
  name: 'send_email',
  title: 'Send an e-mail message',
  protocol: 'email',
  keyField: 'to',
  config: {
    'to': {
      label: 'To',
      type: 'text',
      description: 'The destination e-mail address',
      validate: function(input) {
        // TODO: Validate e-mail address
        return input;
      }
    },
    'body': {
      label: 'Message',
      type: 'textarea',
      template: true, // Mustache me!
      description: 'The e-mail message body',
      validate: function(input) {
        return input;
      }
    }
  },
  handle: function(action, hook, definition) {
  }
};
