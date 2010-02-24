
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
 *  'key': 'myhook',
 *  'config': {},
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

  this.data = {};
  process.mixin(this.data, options);
};

Hook.prototype.toObject = function() {
  return this.data;
};

Hook.prototype.toJson = function() {
  return JSON.stringify(this.toObject());
};
