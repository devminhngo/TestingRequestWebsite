// Initializes the `groups` service on path `/groups`
const createService = require('./groups.class.js');
const hooks = require('./groups.hooks');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/groups', createService());

  // Get our initialized service so that we can register hooks
  const service = app.service('groups');

  service.hooks(hooks);
};
