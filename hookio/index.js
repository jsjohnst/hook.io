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
    path: __dirname + '/db/data.db'
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


hookIO.scheduleRunning = false;

hookIO.checkScheduler = function(){
	
		if(hookIO.scheduleRunning){
			return;
		}
	
 	hookIO.scheduleRunning = true;
		
	 sys.puts('check sched');	

  hookIO.db.getAllHooks(function(hooks) {
				var ret = [];
				hooks.forEach(function(hook) {
				  if(hook.data.type == "timer"){
						  //sys.puts(JSON.stringify(hook));
				    // check if timer should be run based on interval
						  var now = Number(new Date().getTime());
						  var interval = Number(hook.data.config.interval);
					  	var lastTimeTriggered = Number(hook.data.config.startTime);
								
								sys.puts((lastTimeTriggered + interval) - now);
								
								if((lastTimeTriggered + interval) < now){
									 sys.puts('trigger hook now');
								}
								else{
									sys.puts('lastTime : ' + lastTimeTriggered);
									sys.puts('now : ' + now);
								}
								
															
			  	}
				});
		});
		
		hookIO.scheduleRunning = false;					
};

// iterate through each item of the queue array with a delay
setInterval ( hookIO.checkScheduler, 5000 );
