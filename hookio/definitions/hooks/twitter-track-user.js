
/*
 * A twitter hook for tracking a user
 */

var validateExpression = /^\w+$/;

exports.hook = {
  name: 'twitter-track-user',
  title: 'Track a Twitter User',
  protocol: 'twitter',
  keyField: 'name',
  config: {
    'name': {
      label: 'Twitter Username',
      type: 'text',
      description: 'The username of the Twitter user you want to track',
      validate: function(input) {
        if ('string' === typeof input && validateExpression.test(input))
          return input;
        return false;
      }
    }
  },
  params: ['tweet'],
  handle: function(request) {
    return {
      'tweet': request
    };
  }
};

