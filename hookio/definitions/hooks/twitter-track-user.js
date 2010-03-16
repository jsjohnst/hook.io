
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
      description: 'The user ID or the username of the Twitter user you want to track',
      validate: function(input) {
        if ('string' === typeof input)
          return validateExpression.test(input);
        return false;
      }
    }
  },
  params: ['tweet'],
  handle: function(request) {
    return {
      'tweet': ''
    }
  }
};

