var sys = require('sys'), hookIO = require('./hookIO');
var api = {};
api.VERSION = "0.0";
api.AUTHOR = "marak.squires@gmail.com";
api.WEBSITE = "http://hook.io/api.html";
api.createHooks = function(hook){
	// for each hook in createHooks request
	if(typeof hook.listener == 'undefined'){
		return 'no hook.listener object';
	}
	if(typeof hook.action == 'undefined'){
		return ' no hook.action object';
	}
	// hook listener
		if(typeof hook.listener['twitter'] != 'undefined'){
			// do twitter poller action
			hookIO.hookIO.createTwitterPoller(hook);
		}
		if(typeof hook.listener['hookiolistener'] != 'undefined'){
			// create unique URL for hook.io listener
			hookIO.hookIO.createListeningRoute(hook);
		}
		if(typeof hook.listener['timer'] != 'undefined'){
			// create timerthat will fire on intervals
			hookIO.hookIO.scheduleHook(hook);
		}
	// end hook listeners
	// push hook into queue
	//hookIO.hookIO.queue.push(hook);
	return 'hook created : ' + JSON.stringify(hook);
};

api.runHook = function(hook){
	// hook action
	//sys.puts('action triggered : ' + JSON.stringify(hook['action']));

		if(typeof hook.action['httpRequest'] != 'undefined'){
			// create http request event
			sys.puts('creating httpClient event');
			hookIO.hookIO.createHttpClient(hook.action.httpRequest);
		}
		if(typeof hook.action['email'] != 'undefined'){
			// send email (node_mail)
			sys.puts('creating email event');			
			hookIO.hookIO.createEmailClient(hook);
		}
		if(typeof hook.action['twitterUpdate'] != 'undefined'){
			// update twitter status via twitter api
			sys.puts('creating twitter event');			
			hookIO.hookIO.createTwitterUpdate(hook);
		}
	// end hook actions
	return true;		
};

api.viewQueue = function(options){

	return JSON.stringify(hookIO.hookIO.queue,0);

};

api.viewListeners = function(options){

	return JSON.stringify(hookIO.hookIO.routes,0);

};


exports.api = api;