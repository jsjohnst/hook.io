
// hook.io api
// the api exposes methods to the public for interacting with the hook.io platform


var hookIO = require('../../hookio').hookIO;

exports.VERSION = '0.0';
exports.WEBSITE = 'http://hook.io/';

process.mixin(global, require('./hooks'));

exports.validateConfig = function(item, definition) {
  var param,
    valid = false;

  try {
    var config = item.get('config');
  } catch (error) {
    return false;
  }

  for (param in definition.config) {
    if (item.config[params]) {
      valid = false;

      switch (definition.config[params].type) {
        case 'text':
          valid = definition.config[params].validate(config[param]);
          break;
        case 'list':
          if (definition.config[params].values[config[params]]);
            valid = true;
          break;
      }

      if (false === valid)
        return false;
    }
  }

  return true;
};
