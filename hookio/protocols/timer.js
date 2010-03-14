
/*
 * hookio/protocols/timer
 * Implements the timer protocol for hooks
 */



/*
 * hookio/http.js
 *
 * The http stuff for hook.io
 * Initializes and sets up http related logic
 */

var http = require('http'),
  hookIO = require('../../hookio').hookIO,
  helper = require('../lib/helpers'),
  httpServer;


// HTTP client stuffz
var HttpClient = function(options) {
  var urlDetails = helper.parseURL(options.url);
  options.port = 'number' === typeof options.port ? options.port : 80;

  this._client = http.createClient(options.port,
                   urlDetails.host);

  this._path = urlDetails.path;
  this.method = options.method.toUpperCase() || 'GET';
  this.data = options.data || '';

  this.headers = {
    'host': urlDetails.host
  };

  if ('object' === typeof options.headers)
    process.mixin(this.headers, options.headers);

  this._callback = options.success || function() {};
  this._errback = options.error || function() {};

  return this._request();
};

HttpClient.prototype._request = function() {
  var self = this;

  var request = this._client.request(this.method, this._path, this.headers);

  request.addListener('response', function(response) {
    response.body = '';
    response.addListener('data', function(chunk) {
      response.body = response.body + chunk;
    });

    response.addListener('end', function() {
      self._callback.call(self, response);
    });
  });

  if ('POST' === this.method || 'PUT' === this.method ||
      'DELETE' === this.method)
    request.write(this.data);

  return request;
};

exports.Client = HttpClient;
