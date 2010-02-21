
var hookIO = {};
hookIO.VERSION = "0.0";
hookIO.AUTHOR = "marak.squires@gmail.com";
hookIO.WEBSITE = "http://hook.io";

// hookIO.queue represents all outgoing http actions
// hook actions / events will constantly be pushed to the queue from various sources
hookIO.queue = new Array();
hookIO.routes = {};
// simple route object for dynamic hook.io listening URLS
function Route(options){
	this.uri = options.uri;
	return this;
}
hookIO.acceptRequest = function( req , resp , httpParams ){
	// check if route exists 
	if(typeof hookIO.routes[req.uri.path] != 'undefined'){
		// a route exists for this url which means a hook.io hook was just triggered, push its action to the queue
		hookIO.queue.push(hookIO.routes[req.uri.path].events);
	}
	var path;
	if(req.uri.path == '/'){
		path = "../index.html";
		sys.puts(path);
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
	else if(req.uri.path == '/api'){
		resp.sendHeader(200,{'Content-Type':'text/html'});														
		resp.write(api.api.createHooks(httpParams));
		resp.close();
	}
	else{
		path = '..' + req.uri.path;
		sys.puts(path);
		
		
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
		return function(){debug.log('hookIO.createTwitterUpdate');};	
	};
	hookIO.createHttpClient = function(options){
		debug.log('hookIO.createHttpClient');
		return function(){debug.log('i should be an event that does an http request for ', options);};	
	};
	hookIO.createEmailClient = function(options){
		return function(){debug.log('hookIO.createEmailClient');};		
	};
// end hookIO actions
// hookIO listeners
	hookIO.createListeningRoute = function(options){
		// create new route
		hookIO.routes[options.uri] = new Route(options);
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
		return false;	
	}
	// take action off queue
	var H = hookIO.queue.pop();
	H.action.events();
};
// iterate through each item of the array with a delay
setTimeout ( hookIO.popQueue, 5000 );

exports.hookIO = hookIO;