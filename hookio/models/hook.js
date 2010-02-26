
/*
 * hookio/models/hook
 * Represents a hook data object
 *
 * can be used client and server side
 */

/*
 * An example json hook object
 *{
 *  'type': 'http',
 *  'config': {
 *    'path': 'myhook'
 *  },
 *  'params': {
 *    'name': 'Recieved values'
 *  }
 *}
 *
 * Type: The type of hook, determined by the hook definition
 * Key: The hook identifier, validated by hook definition
 * Config: Additional hook configuration
 * Params: The passed data, used within actions
 */

// Accepts a object for options, otherwise a json string
var Hook = exports.Hook = function(options, jsonString) {
  if (true === jsonString)
    options = JSON.parse(options);

  if ('string' !== typeof options.type) {
    this.data = null;
    return;
  }

  this.data = {};
  this.data.type = options.type;
  this.data.config = options.config || {};
  this.data.params = options.params || {};

  this.id = '' + (new Date().getTime() + Math.random());
};

Hook.prototype.get = function(key) {
  return this.data[key];
};

Hook.prototype.set = function(key, value) {
  try {
    this.data[key] = value;
    return true;
  } catch (error) {
    return false;
  }
};

Hook.prototype.toObject = function() {
  return this.data;
};

Hook.prototype.toJson = function() {
  return JSON.stringify(this.toObject());
};
