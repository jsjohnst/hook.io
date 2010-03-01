
/*
 * hookio/models/action
 * Represents a action data object
 *
 * can be used client and server side
 */

var Action = exports.Action = function(options) {
  if (true === jsonString)
    options = JSON.parse(options);

  if ('string' !== typeof options.type) {
    this.data = null;
    return;
  }

  this.data = {};
  this.data.id = options.id || null;
  this.data.type = options.type;
  this.data.config = options.config || {};
  this.data.params = options.params || {};

  this.id = '' + (new Date().getTime() + Math.random());
};

Action.prototype.get = function(key) {
  return this.data[key];
};

Action.prototype.set = function(key, value) {
  try {
    this.data[key] = value;
    return true;
  } catch (error) {
    return false;
  }
};

Action.prototype.toObject = function() {
  return this.data;
};

Action.prototype.toJson = function() {
  return JSON.stringify(this.toObject());
};
