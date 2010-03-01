
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
    lastUpdated: Date
  });


exports.getActions = function(idArray, callback) {
  // TODO: Get actions by _id
};


exports.storeAction = function(action, callback) {
  // TODO: Store action
};
