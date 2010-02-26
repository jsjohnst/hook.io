
/*
 * A action for sending http requests to things
 */

exports.action = {
  name: 'http',
  title: 'Send HTTP Request',
  protocol: 'http',
  config: {
    'method': {
      label: 'HTTP Method',
      type: 'list',
      description: 'HTTP Method to use',
      values: {
        'GET': 'GET Request',
        'POST': 'POST Request',
        'PUT': 'PUT Request',
        'DELETE': 'DELETE Request'
      }
    },
    'url': {
      label: 'Destination URI',
      type: 'text',
      description: 'Where to send the HTTP request',
      validate: function() {
        // TODO: Validate URL
        return true;
      }
    }
  },
  handle: function(action) {
    // Modify hook as needed etc
    return action;
  }
};
