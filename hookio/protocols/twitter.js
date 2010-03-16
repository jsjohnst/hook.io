
/*
 * hookio/protocols/twitter
 * For communicating with twitter
 */

var hookIO = require('../../hookio').hookIO,
    TwitterNode = require('../lib/twitter-node/lib').TwitterNode;

var API_HOST = 'api.twitter.com',
    API_URL = 'http://api.twitter.com/1/';

var twit = new TwitterNode({
  user: 'hookIO',
  password: 'h00k10'
});

exports.start = function() {
  hookIO.db.getHooks({
    protocol: 'twitter'
  }, function(hooks) {
    if (0 >= hooks.length) {
      return twit.stream();
    }

    var count = 0;
    hooks.forEach(function(hook) {
      var name;
      if (name = hook.get('name')) {
        count++;
        exports.apiRequest('users', 'show', name,
                           function(response) {
          count--;
          try {
            twit.follow(response.id);
          } catch (error) {}

          if (0 >= count) {
            twit.stream();
          }
        });
      } else if (name = hook.get('keyword')) {
        twit.track(name);
      }
    });

    if (0 === count) {
      twit.stream();
    }
  });
  delete exports.start;
};

exports.trackUser = function(user, callback) {
  if ('number' === typeof user) {
    twit.follow(user);
    twit.stream();
    callback(null);
  } else {
    exports.apiRequest('users', 'show', user, function(response) {
      try {
        twit.follow(response.id);
        twit.stream();
        callback(null);
      } catch (error) {
        callback(error);
      }
    });
  }
};

exports.trackKeyword = function(word) {
  twit.track(word);
  twit.stream();
};

exports.apiRequest = function() {
  var args = Array.prototype.slice.call(arguments, 0, -1),
      callback = arguments[arguments.length - 1];

  args = args.join('/') + '.json';

  new hookIO.protocols.http.Client({
    host: API_HOST,
    url: API_URL + args,
    headers: hookIO.HTTP.clientHeaders,
    success: function(response) {
      try {
        response = JSON.parse(response);
        callback(null, response);
      } catch (err) {
        callback(err, null);
      }
    }
  });
};
