var sys = require('sys'), hookIO = require('./hookIO');


var api = {};
api.VERSION = "0.0";
api.AUTHOR = "marak.squires@gmail.com";
api.WEBSITE = "http://hook.io/api.html";

api.createHooks = function(hooks){
	// for each hook in createHooks request
	for(hook in hooks){
		// create shorcut for hook
		var H = hooks[hook];
		if(typeof H.listener == 'undefined' || typeof H.action == 'undefined'){
			return 'fail fail fail, no hook.listener object or hook.action object!!!!!';
		}
		// hook action
			if(typeof H.action['httpRequest'] != 'undefined'){
				// create http request event (restler)
				H.action.events = hookIO.hookIO.createHttpClient(H);
			}
			if(typeof H.action['email'] != 'undefined'){
				// send email (node_mail)
				H.action.events = hookIO.hookIO.createEmailClient(H);
			}
			if(typeof H.action['twitterUpdate'] != 'undefined'){
				// update twitter status via twitter api
				H.action.events = hookIO.hookIO.createTwitterUpdate(H);
			}
		// end hook actions
		// hook listener
			if(typeof H.listener['twitter'] != 'undefined'){
				// do twitter poller action
				hookIO.hookIO.createTwitterPoller(H);
			}
			if(typeof H.listener['hookiolistener'] != 'undefined'){
				// create unique URL for hook.io listener
				hookIO.hookIO.createListeningRoute(H);
			}
			if(typeof H.listener['timer'] != 'undefined'){
				// create timerthat will fire on intervals
				hookIO.hookIO.scheduleHook(H);
			}
		// end hook listeners
		
	}
	return 'great success!!';
};


exports.api = api;