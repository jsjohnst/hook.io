
/*
 * hookio/db/hooks
 * The DB for handling hooks
 */

var hookIO = require('../../hookio').hookIO,
  Hook = require('../models/hook').Hook,
  store = hookIO.db.db.get_store('hooks', {
    protocol: String,
    type: String,
    key: String,
    config: Object,
    lastUpdated: Number,
    actions: Array,
    owner: Number
  });



exports.getHookD = function(){};

exports.getHook = function(condition, callback) {
  store.find(condition, function(results) {
    if (1 !== results.length) {
      callback(null)
      return;
    }

    callback(new Hook({
      id: results[0]._id,
      type: results[0].type,
      config: results[0].config,
      actions: results[0].actions
    }));
  });
};

exports.getHooks = function(condition, callback) {
  store.find(condition, function(hooks) {
    if (0 >= hooks.length) {
      callback([]);
      return;
    }

    var ret = [];

    hooks.forEach(function(hook) {
      ret.push(new Hook({
        id: hook._id,
        type: hook.type,
        config: hook.config,
        actions: hook.actions
      }));
    });

    callback(ret);
  });
};

exports.getAllHooks = function(callback) {
  store.all(function(hooks) {
    if (0 >= hooks.length) {
      callback([]);
      return;
    }

    var ret = [];

    hooks.forEach(function(hook) {
      ret.push(new Hook({
        id: hook._id,
        type: hook.type,
        config: hook.config,
        actions: hook.actions
      }));
    });

    callback(ret);
  });
};

exports.checkHook = function(condition, callback) {
  store.find(condition, function(results) {
    if (0 >= results.length) {
      callback(false);
      return;
    }

    callback(result[0]._id);
  });
};

exports.storeHook = function(hook, key, callback) {
  hook = hook.toObject();
  var data = {
    protocol: hook.protocol,
    type: hook.type,
    key: key,
    config: hook.config,
    lastUpdated: new Date().getTime(),
    actions: [],
    // TODO: When session stuff is sorted, insert userID
    owner: null
  };

  store.save(data, callback);
};

exports.updateHook = function(hook, key, callback) {
  hook = hook.toObject();
  var data = {
    _id: hook.id,
    protocol: hook.protocol,
    type: hook.type,
    key: key,
    config: hook.config,
    lastUpdated: new Date().getTime(),
    actions: hook.actions,
    // TODO: When session stuff is sorted, insert userID
    owner: null
  };

  store.save(data, callback);
};
