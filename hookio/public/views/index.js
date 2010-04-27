exports.createHook = function(hook){
  sys.puts('api.createHook');
};

exports.viewHooks = function(options){
  return hooksTable.build(options);
}

exports.viewUrlHook = function(options){
  return 'we found a hook.io webhook listening on this URL! : ' + JSON.stringify(options);
}

exports.viewActions = function(options){
  return actionsTable.build(options);
}

exports.viewQueue = function(options){
	return queueTable.build({});
};

exports.viewDefinitions = function(options){
	// perhaps we could dump hookIO.actioner and hookIO.hooker? if that doesn't work we can copy pasta the code to fs.open definitions and parse them for output
	return JSON.stringify(options);
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
			html += '<tr><th>hooks</th></tr>';
			for( record in data ){
			  var row = data[record];
			  html += '<tr><td>' + JSON.stringify(row) + '</td></tr>';
			}
			html += '';
			html += '</table>';
			return html;
		};
		
		var actionsTable = {};
		actionsTable.css = {"text-align":"left"};
		actionsTable.build = function(data){
			var html = '<table border = "1">';
			html += '<tr><th>actions</th></tr>';
			for( record in data ){
			  var row = data[record];
			  html += '<tr><td>' + JSON.stringify(row) + '</td></tr>';
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