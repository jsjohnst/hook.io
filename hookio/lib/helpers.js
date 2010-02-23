
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
