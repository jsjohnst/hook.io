
// The email protocol

var hookIO = require('../../hookio').hookIO,
    mailer = require('../lib/mailer');

exports.send = function send() {
  mailer.send.apply(mailer, arguments);
};
