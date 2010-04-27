/*
 * A action for sending e-mails
 */

exports.action = {
  name: 'twitter-update-status',
  title: 'Updates a user\'s twitter status',
  protocol: 'twitter',
  keyField: 'username',
  config: {
    'username': {
      label: 'Username',
      type: 'text',
      description: 'The username of the twitter account that will login and update status',
      validate: function(input) {
        // TODO: Validate e-mail address
        return input;
      }
    },
    'password': {
      label: 'Password',
      type: 'text',
      description: 'The password of the twitter account that will be logging in',
      validate: function(input) {
        // TODO: Validate e-mail address
        return input;
      }
    },
    'status': {
      label: 'Status',
      type: 'text',
      description: 'The twitter status update',
      validate: function(input) {
        // TODO: Validate e-mail address
        return input;
      }
    }
  },
  handle: function(action, hook, definition) {
  }
};
