
/*
 * hookio/protocols/timer
 * Implements the timer protocol for hooks
 */

var hookIO = require('../../hookio').hookIO;

var timers = exports.timers = {};
var hooks = exports.hooks = {};

exports.init = function(callback) {
  hookIO.db.getHooks({
    protocol: 'timer'
  }, function(hooks) {
    hooks.forEach(function(hook) {
      var duration = 1000 * parseInt(hook.get('interval'), 10);
      hooks[duration] = hook;
    });

    callback();
  });
};

exports.start = function() {
  hookIO.db.getHooks({
    protocol: 'timer'
  }, function(hooks) {
    hooks.forEach(function(hook) {
      var duration = 1000 * parseInt(hook.get('interval'), 10);
      if (!hooks[duration] instanceof Array) {
        hooks[duration] = []
      }
      hooks[duration].push(hook);
    });

    var duration;
    for (duration in hooks) {
      timers[duration] = setTimeout(callback, duration, duration);
    }
  });
};

exports.addHook = function(hook) {
  var duration = 1000 * parseInt(hook.get('interval'), 10);

  if (hooks[duration]) {
    if (hooks[duration] instanceof Array) {
      hooks[duration].push(hook);
    } else {
      hooks[duration] = [];
      hooks[duration].push(hook);

      if (timers[duration]) {
        clearTimeout(timers[duration]);
      }
      timers[duration] = setTimeout(callback, duration, duration);
    }
  }
};

var callback = function(duration) {
  var hook;
  hooks[duration].forEach(function(hook) {
    hookIO.emit('TimerHookRequest', hook);
  });
};
