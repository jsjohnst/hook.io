
/*
 * hookio/db/actions
 * For working with actions in the db
 */

var hookIO = require('../../hookio').hookIO,
  Action = require('../models/action').Action,
  store = hookIO.db.db.get_store('actions', {
    protocol: String,
    type: String,
    key: String,
    config: Object,
    lastUpdated: Number
  });


exports.getActions = function(idArray, callback) {
  var condition = [];
  idArray.forEach(function(id) {
    condition.push({
      _id: id
    });
  });

  store.find(condition, function(results) {
    if (1 !== results.length) {
      callback(null)
      return;
    }

    callback(new Action({
      id: results[0]._id,
      type: results[0].type,
      config: results[0].config
    }));
  });
};


exports.storeAction = function(action, key, callback) {
  action = actions.toObject();
  var data = {
    protocol: action.protocol,
    type: action.type,
    key: key,
    config: action.config,
    lastUpdated: new Date().getTime()
  };

  store.save(data, callback);
};
