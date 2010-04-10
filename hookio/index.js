/*
 * hookio/index.js
 *
 * The Index for the hookio module
 * Initializes and sets up a hook.io server session
 */

var events = require('events'),	
  multipart = require('./lib/multipart'),
  debug = require("./lib/node_debug/node_debug/debug"),
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
    path: __dirname + '/db/data.db'
  },
  HTTP: {
    defaultHeaders: {
      'Content-Type': 'text/html'
    },
    clientHeaders: {
      'User-Agent': 'hook.io Web Hooker'
    },
    port: http_port || 8000
  },
  DEBUGGER : false
};

// check if node_debug should be turned on

if(hookIO.DEBUGGER){
  /* this will start node_debug on port 8080
   be aware that running node_debug on a public IP address will result in your box getting rooted (or worse)
  */
  debug.listen(8080);
}


// Inherit from EventEmitter
/* tim - not sure why the new line was choking but there was an issue with the above hookIO options hash not being defined */
//hookIO = Object.create(events.EventEmitter.prototype);
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

// TODO : add better way to load protocols
// Maybe force each protocol to have a start method?
// UPDATE : according to api docs protocols have optional start() method which is called on app init
hookIO.protocol.http = require('./protocols/http');
hookIO.protocol.twitter = require('./protocols/twitter');
hookIO.protocol.timer = require('./protocols/timer');
hookIO.protocol.debug = require('./protocols/debug');
hookIO.protocol.email = require('./protocols/email');

exports.init = function(callback) {
  // Set-up the server bits and pieces

  // hooker.update() will load all hook listener definitions
  hookIO.hooker.update(function() {
    // actioner.update() will load all hook action definitions																																
    hookIO.actioner.update(function() {
      // Other services
      hookIO.db.init(function() {
        // Start http and tcp services
        hookIO.protocol.http.start();
        hookIO.protocol.twitter.start();
        // Start timer
        hookIO.protocol.timer.start();
        // We are inited
        if ('function' === typeof callback)
          callback.call(hookIO);
      });
    });
  });

  // Make sure we aren't called again
  delete exports.init;
};
