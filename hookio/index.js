/*
 * hookio/index.js
 *
 * The Index for the hookio module
 * Initializes and sets up a hook.io server session
 */

var events = require('events'),
  http_port = null,
  tcp_port = null;

// In case we want to run multiple instances at once
if (process.argv[2])
  http_port = parseInt(process.argv[2]);

// In case we want to run multiple instances at once
if (process.argv[3])
  tcp_port = parseInt(process.argv[3]);

// The HookIO object
var hookIO = {
  // Constants
  PATH: __dirname,
  EMAIL_DEFAULTS: {
    'from': 'noreply@hook.io'
  },
  DB: {
    path: this.PATH + '/db/data.db'
  },
  HTTP: {
    defaultHeaders: {
      'Content-Type': 'text/html'
    },
    port: http_port || 8000
  }
};


// Inherit from EventEmitter
hookIO = (function() {
  var fn;
  (fn = new Function()).prototype = new events.EventEmitter();
  process.mixin(fn.prototype, hookIO);
  return new fn();
})();

exports.hookIO = hookIO;

// Debugger
var sys = require('sys');
hookIO._emit = hookIO.emit;
hookIO.emit = function() {
  arguments = Array.prototype.slice.call(arguments, 0);
  var eventName = arguments[0];
  var args = sys.inspect(arguments.slice(1));

  sys.puts(eventName + ': ' + args);

  hookIO._emit.apply(hookIO, arguments);
};

hookIO.outgoing = require('./outgoing');
hookIO.incoming = require('./incoming');

hookIO.api = require('./api');
hookIO.jsonrpc = require('./jsonrpc');
hookIO.site = require('./site');

hookIO.hooker = require('./hooker');
hookIO.actioner = require('./actioner');

hookIO.db = require('./db');

hookIO.protocol = {};
hookIO.protocol.http = require('./protocols/http');
hookIO.protocol.twitter = require('./protocols/twitter');

exports.init = function(callback) {
  // Set-up the server bits and pieces
  hookIO.hooker.update(function() {
    hookIO.actioner.update(function() {
      // Other services
      hookIO.db.init(function() {
        // Start http and tcp services
        hookIO.protocol.http.start();
        hookIO.protocol.twitter.start();

        // We are inited
        if ('function' === typeof callback)
          callback.call(hookIO);
      });
    });
  });

  // Make sure we aren't called again
  delete exports.init;
};
