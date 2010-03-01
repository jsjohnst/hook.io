
/*
 * Small helper functions for hook.io
 */

var parseURLExpression = /^(?:(.+):\/\/)?([^\/]*)(.*)$/;

exports.parseURL = function(str) {
  str = str.match(parseURLExpression);

  try {
    return {
      protocol: str[1],
      host: str[2],
      path: str[3]
    };
  } catch (error) {
    return null;
  }
};

// For validating config for the API
exports.validateConfig = function(item, definition) {
  var param,
    valid = false;

  try {
    var config = item.get('config');
  } catch (error) {
    return false;
  }

  for (param in definition.config) {
    if (config[param]) {
      valid = false;

      switch (definition.config[param].type) {
        case 'text':
          valid = definition.config[param].validate(config[param]);
          break;
        case 'list':
          if (definition.config[param].values[config[param]]);
            valid = true;
          break;
      }

      if (false === valid)
        return false;
    }
  }

  return true;
};
