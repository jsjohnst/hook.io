
/*
 * hookio/protocols/twitter
 * For communicating with twitter
 */

var hookIO = require('../../hookio').hookIO,
    TwitterNode = require('../lib/twitter-node/lib').TwitterNode;

exports.start = function() {
  delete exports.start;
};

exports.Client = function() {
  new hookIO.protocols.http.Client({
    
  }).close();
};
