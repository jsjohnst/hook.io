
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
      type: 'text',
      description: 'stub action will output the payload of the hook',
      validate: function(input) {
        // TODO: Validate debug info
        return input;
      }
    }
  },
  handle: function(action, hook, definition) {
    // Modify hook as needed etc
    var params = hook.get('params');
    params.contentType = 'text/html';

    action.set('params', {
      contentType: params.contentType,
      body: 'test body'
    });
  }
};
