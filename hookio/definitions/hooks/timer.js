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
        if (5 < parseInt(input, 10))
          return true;
        return false;
      }
    }
  },
  params: [],
  handle: function(request) {
    return {};
  }
};
