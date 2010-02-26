
/*
 * A http hook for GET / POST requests
 */

var validateExpression = /^\w+$/;

exports.hook = {
  name: 'http',
  title: 'Hook.io Listener',
  protocol: 'http',
  config: {
    'path': {
      label: 'Listener Name',
      type: 'text',
      description: 'Create a unique url to listen for POST or GET hooks',
      validate: function(input) {
        return input.test(validateExpression);
      }
    }
  },
  params: ['method', 'contentType', 'body'],
  handle: function(request) {
    return {
      'method': request.method,
      'contentType': request.headers['content-type'],
      'body': request.body
    }
  }
};
