/*
 * A hook for timer calls
 */
exports.hook = {
  name: 'timer',
  title: 'Hook.io Timer',
  protocol: 'timer',
  keyField: 'interval',
  config: {
    'interval': {
      label: 'Interval duration',
      type: 'text',
      description: 'Time in seconds between each trigger',
      validate: function(input) {
        input = parseInt(input, 10);
        if (5 < input)
          return input;
        return false;
      }
    }
  },
  params: [],
  handle: function(request) {
    return {};
  }
};
