
/*
 * hookio/db
 * Where the magical data persistence happens
 */

var hookIO = require('../../hookio').hookIO,
  db = require('../lib/node-persistence/lib/persistence/memory');
		;

exports.init = function(callback) {
  var connection = db.new_connection(hookIO.DB.path);
  connection.addListener('connection', function() {
    exports.db = connection;

    // Load submodules
    process.mixin(exports, require('./hooks'));
    process.mixin(exports, require('./actions'));

    callback(true);
  });

  delete exports.init;
};

exports.db = db;

