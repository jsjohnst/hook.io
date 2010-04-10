/* hook.io api v0.1 - created by Marak Squires
   the hook.io API is exposed in its most basic form as a CommonJS module
			it exposes methods for interacting with the hook.io platform			
			
   using the default module namespace of "hookIO" you can enumerate the available API calls by dumping "hookIO.api"	
			
			the hook.io API can be exposed over the wire in any communication protocol you want, if you create the gateway
			
			currently the hookIO API is publically exposed as JSON-RPC via the jsonrpc.js file located hookIO's root
			
*/

var hookIO = require('../../hookio').hookIO;

exports.VERSION = '0.1';
exports.WEBSITE = 'http://hook.io/';

process.mixin(exports, require('./core'));
process.mixin(exports, require('./hooks'));
process.mixin(exports, require('./actions'));