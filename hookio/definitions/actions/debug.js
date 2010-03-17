
/*
 * A action for doing debuggings
 */

exports.action = {
  name: 'debug',
  title: 'Stub debug action',
  protocol: 'debug',
  config: {
			  'payload': {
      label: 'dump of triggered hook',
      type: 'object',
      description: 'stub action will output the payload of the hook',
      validate: function() {
        // TODO: Validate URL
        return true;
      }
    }
  },
  handle: function(action, hook, definition) {
    // Modify hook as needed etc
    var params = hook.get('params');

    if ('string' !== typeof params.contentType)
      params.contentType = 'application/json';

    if ('http' !== definition.protocol) {
      // We didn't come from a HTTP hook
      // Convert time
      var ret = {
        'hook': hook.toObject(),
        'id': action.id
      };

      // The way this action deals with protocols
      switch (definition.protocol) {
        default:
          ret.result = '';
          break;
      }

      params.body = JSON.stringify(ret);
      ret = null;
    }

    action.set('params', {
      contentType: params.contentType,
      body: params.body
    });
  }
};
