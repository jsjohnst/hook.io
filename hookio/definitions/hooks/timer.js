
/*
 * A hook for timer calls
 */

var validateExpression = /^\w+$/;

exports.hook = {
  name: 'timer',
  title: 'Hook.io Timer',
  protocol: 'timer',
  keyField: 'path',
  config: {
    'interval': {
      label: 'Listener Name',
      type: 'text',
      description: 'Create a unique url to listen for POST or GET hooks',
      validate: function(input) {
        if ('string' === typeof input)
          return validateExpression.test(input);
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
