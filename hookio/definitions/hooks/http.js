
/*
 * A http hook for GET / POST requests
 */

var url = require('url');


var validateExpression = /^\w+$/;

exports.hook = {
  name: 'http',
  title: 'Hook.io Listener',
  protocol: 'http',
  config: {
    'path': {
      name: 'Listener Name',
      type: 'text',
      description: 'Create a unique url to listen for POST or GET hooks',
      validate: function(input) {
        return input.test(validateExpression);
      }
    }
  },
  handle: function(request) {
    return {
      'method': request.method,
      'url': request.url,
      'contentType': request.headers['content-type'],
      'body': request.body
    }
  }
};
