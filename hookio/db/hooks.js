
/*
 * hookio/db/hooks
 * The DB for handling hooks
 */

var hookIO = require('../../hookio').hookIO,
  Hook = require('../models/hook').Hook,
  store = hookIO.db.db.get_store('hooks', {
    protocol: String,
    type: String,
    config: Object,
    lastUpdated: Date,
    owner: Number
  });

exports.getHook = function(protocol, key, callback) {
  store.find({
    protocol: protocol,
    key: key
  }, function(results) {
    if (1 !== results.length) {
      callback(null)
      return;
    }

    callback(new Hook({
      type: results[0].type,
      config: results[0].config
    }));
  });
};

exports.storeHook = function(hook, callback) {
  // TODO: Store hook logic
};
