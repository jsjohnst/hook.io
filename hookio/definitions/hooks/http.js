
/*
 * A http hook for GET / POST requests
 */

var validateExpression = /^\w+$/;

exports.hook = {
  name: 'http',
  title: 'Hook.io Listener',
  protocol: 'http',
  keyField: 'path',
  config: {
    'path': {
      label: 'Listener Name',
      type: 'text',
      description: 'Create a unique url to listen for POST or GET hooks',
      validate: function(input) {
        if ('string' === typeof input && validateExpression.test(input))
          return input;
        return false;
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
