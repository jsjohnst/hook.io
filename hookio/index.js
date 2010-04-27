/*
 * hookio/index.js
 *
 * The Index for the hookio module
 * Initializes and sets up a hook.io server session
 */

var events = require('events'),	
  multipart = require('./lib/multipart'),
  debug = require('./lib/node_debug/node_debug/debug'),
  fs = require('fs'),
  http_port = null,
  tcp_port = null;

  require('./lib/proto/lib/proto');
// In case we want to run multiple instances at once
if (process.argv[2])
  http_port = parseInt(process.argv[2]);

// In case we want to run multiple instances at once
if (process.argv[3])
  tcp_port = parseInt(process.argv[3]);

var hookIO = {};


// The HookIO object
hookIO.config = {
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
  DEBUGGER : {
    'webconsole':true, // should we output to the node_debug web console at http://hook.io/debug/
    'console':true, // should we output to the terminal console
    'emittedEvents':true  // should we output emittedEvents
  }
};

// check if node_debug should be turned on

if(hookIO.config.DEBUGGER.webconsole){
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
  fn.prototype.mixin(hookIO);
  return new fn();
})();

exports.hookIO = hookIO;

// Debugger
var sys = require('sys');
hookIO._emit = hookIO.emit;
hookIO.emit = function() {
  arguments = Array.prototype.slice.call(arguments, 0);
  
  if(hookIO.config.DEBUGGER.emittedEvents){
    debug.log(arguments);
  }
  
  hookIO._emit.apply(hookIO, arguments);
};

// first level hookIO helpers

// hookIO.step - an easy way to step through multiple async events
hookIO.Step = require('./lib/step/lib/step');

// underscore.js is a kick ass library for doing some of the good parts of javascript
// this allow for syntax such as : _.each([1,2,3],function(e){hookIO.debug(e);});
// see more @ : http://documentcloud.github.com/underscore/
require('./lib/underscore/underscore');

// hookIO.debug - 
hookIO.debug = function(args){
  
  if(hookIO.config.DEBUGGER.console){
    sys.puts(JSON.stringify(args));
  }
  
  if(hookIO.config.DEBUGGER.webconsole){
    debug.log(args);
  }
  
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
// look into commented out code below for dynamically loading protocols from /protocols/ folder
hookIO.protocol.http = require('./protocols/http');
hookIO.protocol.twitter = require('./protocols/twitter');
hookIO.protocol.timer = require('./protocols/timer');
hookIO.protocol.debug = require('./protocols/debug');
hookIO.protocol.email = require('./protocols/email');
hookIO.protocol.markdown = require('./protocols/markdown');
hookIO.protocol.haml = require('./protocols/haml');
hookIO.protocol.documentation = require('./protocols/documentation');
hookIO.protocol.mustache = require('./protocols/mustache');

exports.init = function(callback) {


// this is where protocols get imported into hookIO
/*
  var result = {};
   fs.readdir(hookIO.config.PATH + '/protocols', function(error, files) {
     files.forEach(function(protocol) {
       if ('.js' !== protocol.slice(-3))
         return;
         protocol = protocol.slice(0, -3);
         sys.puts(hookIO.config.PATH + '/protocols/' + protocol);
         hookIO.protocol[protocol] = require(hookIO.config.PATH + '/protocols/' + protocol);
         // currently protocols have an optional method "start"
         // if the start method is exported in a protocol it will be called when hook.io first starts (here)
         if(typeof hookIO.protocol[protocol].start === 'function'){
           hookIO.protocol[protocol].start();  
         }
         
     });
*/

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
           hookIO.protocol.mustache.start();
           hookIO.protocol.documentation.start();

           hookIO.debug('hook.io v0.1.0 is now running on port: ' + hookIO.config.HTTP.port);
           hookIO.debug('thanks for watching the console!');
           hookIO.debug('if you run into any issues please log them @ http://github.com/marak/hook.io/');

           // hook.io has started and is ready to roll
           if ('function' === typeof callback)
             callback.call(hookIO);
         });
       });

     // Make sure we aren't called again
     delete exports.init;

    });


};
