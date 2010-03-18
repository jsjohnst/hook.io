
/*
 * hookio/hooker/twitter
 * Handles twitter protocol hooks
 */

var hookIO = require('../../hookio').hookIO;

hookIO.addListener('TweetTwitterRequest', function(tweet) {
  hookIO.db.getHooks({
    protocol: 'twitter',
    key: tweet.screen_name
  }, function(hooks) {
    if (0 >= hooks.length) {
      return;
    }

    hook.set('params', definition.handle(tweet));

    hookIO.emit('ActionTrigger', hook, definition);
    hookIO.emit('HookCompleted', hook);
  });
});

