
/*
 * hookio/actioner
 * Handles all actions. 'Sink' for actions.
 */

var hookIO = require('../../hookio').hookIO,
  fs = require('fs'),
  MuCompiler = require('../lib/mu/lib/mu/compiler');
  MuParser = require('../lib/mu/lib/mu/parser');


var actions = exports.actions = {};

var updateDefinitions = exports.update = function(callback) {
  var result = {};
  fs.readdir(hookIO.PATH + '/definitions/actions', function(error, files) {
    files.forEach(function(action) {
      if ('.js' !== action.slice(-3))
        return;

      action = action.slice(0, -3);
      action = require(hookIO.PATH + '/definitions/actions/' + action);

      try {
        action = action.action;

        result[action.name] = action;
      } catch (error) {}
    });

    actions = exports.actions = result;

    if ('function' === typeof callback)
      callback(actions);

    hookIO.emit('ActionDefinitionsUpdated', actions);
  });
};

hookIO.addListener('ActionTrigger', function(hook, definition) {
  var protocol = definition.protocol[0].toUpperCase() + definition.protocol.slice(1);

  hookIO.db.getActions(hook.get('actions'), function(actions) {
    actions.forEach(function(action) {
      var actionDefinition = exports.actions[action.get('type')];

      actionDefinition.handle(action, hook, definition);

      var key,
        compiled,
        count = 0,
        config = action.get('config'),
        params = hook.get('params');
      for (key in actionDefinition.config) {
        if (actionDefinition[key].template && config[key]) {
          count++;
          compiled = Mu.compile(config[key])(params, {});

          (function(key) {
            var text = '';
            compiled.addListener('data', function(chunk) {
              text += chunk;
            });
            compiled.addListener('end', function() {
              config[key] = text;
              count--;
              if (0 === count)
                done();
            });
          })(key);
        }
      }

      if (0 === count)
        done();

      function done() {
        actions.set('config', config);
        hookIO.emit(protocol + 'ActionTrigger', action, actionDefinition);
        hookIO.emit('HookCompleted', hook);
      }
    });
  });
});


// Protocol specific stuff
require('./http');
