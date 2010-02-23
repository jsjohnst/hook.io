var sys = require('sys'), fs = require('fs'), http = require('http'), api = require('./api'),mime = require('./mime'), email = require('./node_mailer'), rest = require('./restler');

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
	this.action = hook.action;
	this.listener = hook.listener;
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
		sys.puts('hookIO.createTwitterUpdate');

		// create a service constructor for very easy API wrappers a la HTTParty...
		var Twitter = rest.service(function(u, p) {
		  this.defaults.username = u;
		  this.defaults.password = p;
		}, {
		  baseURL: 'http://twitter.com'
		}, {
		  update: function(message) {
			return this.post('/statuses/update.json', { data: { status: message } });
		  }
		});
		
		var client = new Twitter('maraksquires', 'bigroundtits');
		client.update('hook.io twitter update').addListener('complete', function(data) {
		  sys.p(data);
		});

	};
	hookIO.createHttpClient = function(options){
	  sys.puts('i should be an event that does an http request for ' + JSON.stringify(options));			
		var google = http.createClient(80, options.host);
		var request = google.request("GET", options.path, {"host": options.host});
		request.addListener('response', function (response) {
		  //sys.puts("HTTP REQUEST STATUS CODE: " + response.statusCode);
		  //sys.puts("HEADERS: " + JSON.stringify(response.headers));
		  response.setBodyEncoding("utf8");
		  response.addListener("data", function (chunk) {
			// ignore response for now												 
			//sys.puts("BODY: " + chunk);
		  });
		});
		request.close();
	};
	hookIO.createEmailClient = function(options){
		email.send({
		  to : "marak.squires@gmail.com",
		  from : "obama@whitehouse.gov",
		  subject : "hook.io test emails",
		  body : "hello this is a test email from hook.io"
		});
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
	sys.puts('action triggered : ' + JSON.stringify(hook));
	api.api.runHook(hook);;
};
exports.hookIO = hookIO;