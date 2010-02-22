var sys = require('sys'), fs = require('fs'), api = require('./api'),mime = require('./mime');

var hookIO = {};
hookIO.VERSION = "0.0";
hookIO.AUTHOR = "marak.squires@gmail.com";
hookIO.WEBSITE = "http://hook.io";

// hookIO.queue represents all outgoing http actions
// hook actions / events will constantly be pushed to the queue from various sources
hookIO.queue = new Array();
hookIO.routes = {};
// simple route object for dynamic hook.io listening URLS
function Route(hook){
	this.hook = hook;
	return this;
}
hookIO.acceptRequest = function( req , resp , httpParams ){
	// check if route exists 
	sys.puts('checking for dynamic path...' + httpParams.pathname);
	if(typeof hookIO.routes[httpParams.pathname] != 'undefined'){
		// a route exists for this url which means a hook.io hook was just triggered, push its action to the queue
		hookIO.queue.push(hookIO.routes[httpParams.pathname]);
		resp.sendHeader(200,{'Content-Type':'text/html'});														
		resp.write('hook.io listener found, executing actions for this hook : ' + JSON.stringify(hookIO.routes[httpParams.pathname]));
		resp.close();
		
	}
	var path;
	if(httpParams.pathname == '/'){
		path = "../index.html";
		fs.readFile(path, 'binary', function (error, content) 
			{
				if (error) {
				} 
				else {
					resp.sendHeader(200,{'Content-Type':mime.mime(path)});											
					resp.write(content, 'binary');
					resp.close();
				}
			});
	}
	else if(httpParams.pathname == '/queue'){
		resp.sendHeader(200,{'Content-Type':'text/html'});														
		resp.write(api.api.viewQueue(httpParams));
		resp.close();
	}
	else if(httpParams.pathname == '/listeners'){
		resp.sendHeader(200,{'Content-Type':'text/html'});														
		resp.write(api.api.viewListeners(httpParams));
		resp.close();
	}
	else if(httpParams.pathname == '/api'){
		resp.sendHeader(200,{'Content-Type':'text/html'});														
		resp.write(api.api.createHooks(httpParams));
		resp.close();
	}
	else{
		path = '..' + httpParams.pathname;
		fs.readFile(path, 'binary', function (error, content) 
			{
				if (error) {
					resp.sendHeader(200,{'Content-Type':'text/html'});												
					resp.write('404 file not found');
					resp.close(); 
				} 
				else {
					resp.sendHeader(200,{'Content-Type':mime.mime(path)});											
					resp.write(content, 'binary');
					resp.close();
				}
			});
	}
};
// hookIO actions
	hookIO.createTwitterUpdate = function(options){
		return function(){sys.puts('hookIO.createTwitterUpdate');};	
	};
	hookIO.createHttpClient = function(options){
		sys.puts('hookIO.createHttpClient');
		return function(){sys.puts('i should be an event that does an http request for ' + JSON.stringify(options));};	
	};
	hookIO.createEmailClient = function(options){
		return function(){sys.puts('hookIO.createEmailClient');};		
	};
// end hookIO actions
// hookIO listeners
	hookIO.createListeningRoute = function(hook){
		// create new route
		sys.puts('hookIO.createListeningRoute');
//		sys.puts(JSON.stringify(hook));
		hookIO.routes[hook.listener.hookiolistener.uri] = new Route(hook);
	};
	hookIO.scheduleHook = function(options){
		return true;	
	};
	hookIO.createTwitterPoller = function(options){
		return true;
	};
// end hookIO listeners
hookIO.popQueue = function(){

	if(hookIO.queue.length == 0){
		sys.puts('hookIO.queue is empty!!');
		return false;	
	}
	sys.puts('hookIO.popQueue');
	// take action off queue
	var hook = hookIO.queue.pop();
	api.api.runHook(hook);;
	sys.puts('action triggered : ' + JSON.stringify(hook));
	//H.action.events();
};


exports.hookIO = hookIO;