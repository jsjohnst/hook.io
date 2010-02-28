// hook.io api
// the api exposes methods to the public for interacting with the hook.io platform
var api = {};
api.VERSION = "0.0";
api.WEBSITE = "http://hook.io/api.html";

var hookIO = require('../index').hookIO,
	sys = require('sys');

exports.createHook = function(hook){
  sys.puts('api.createHook');
};

exports.viewHooks = function(options){
  return hooksTable.build({});
}

exports.viewQueue = function(options){
	return queueTable.build({});
};

exports.viewListeners = function(options){
	return routesTable.build({});
};

exports.viewSchedule = function(options){
	return jobsTable.build({});
};


// scaffolding playgound

		var queueTable = {};
		queueTable.css = {"text-align":"left"};
		queueTable.build = function(data){
			var html = '<table border = "1">';
			html += '<tr><th>queue position</th><th>action</th></tr>';
			var cheatCount = 0;
			for( record in data ){cheatCount++;
			  var row = data[record];
			  html += '<tr><td>'+cheatCount+'</td><td>' + JSON.stringify(row.action) + '</td></tr>';
			}
			html += '';
			html += '</table>';
			return html;
		};

		var routesTable = {};
		routesTable.css = {"text-align":"left"};
		routesTable.build = function(data){
			var html = '<table border = "1">';
			html += '<tr><th>hook.io URL</th><th>action</th></tr>';
			for( record in data ){
			  var row = data[record];
			  html += '<tr><td><a href = "http://hook.io' + row.listener.hookiolistener.uri + '">'+row.listener.hookiolistener.uri+'</a></td><td>' + JSON.stringify(row.action) + '</td></tr>';
			}
			html += '';
			html += '</table>';
			return html;
		};

		var jobsTable = {};
		jobsTable.css = {"text-align":"left"};
		jobsTable.build = function(data){
			var html = '<table border = "1">';
			html += '<tr><th>time</th><th>action</th></tr>';
			for( record in data ){
			  var row = data[record];
			  html += '<tr><td>' + JSON.stringify(row.listener.timer) + '</td><td>' + JSON.stringify(row.action) + '</td></tr>';
			}
			html += '';
			html += '</table>';
			return html;
		};
		
		var hooksTable = {};
		hooksTable.css = {"text-align":"left"};
		hooksTable.build = function(data){
			var html = '<table border = "1">';
			html += '<tr><th>time</th><th>action</th></tr>';
			for( record in data ){
			  var row = data[record];
			  html += '<tr><td>' + JSON.stringify(row.listener.timer) + '</td><td>' + JSON.stringify(row.action) + '</td></tr>';
			}
			html += '';
			html += '</table>';
			return html;
		};
		
		/*
		// apply javascript behaviors to scaffold
		routesTable.behave = function(behaviors){
			for ( behavior in behaviors ){
			  behaviors[behavior]($(this));
			}
		};
		*/

		var table = {};
		table.css = {};
		table.build = function(data){
			var html = '';
			html += '<table border = "0" align = "left">';
			for( record in data ){
			  var row = data[record];
			  html += '<tr>';	  
			  for( prop in row ){
				html +='<th align = "left">'+prop+'</th>';
			  }
			  html += '</tr>';	  
			  // for each record in collection
			  html += '<tr>';	  
			  for( prop in row ){
				if(typeof row[prop] == 'object'){
				  html+= '<td align = "left">'+table.build(row[prop])+'</td>';
				}
				else{
				  html +='<td align = "left">'+row[prop]+'</td>';
				}
				
			  }
			  html += '</tr>';
			}
			html += '</table>';	
			return html;
		};
		
		
		
// end scaffolding playground