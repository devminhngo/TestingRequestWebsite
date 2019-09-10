// Initializes the `ldap` service on path `/user`
const createService = require('./ldap.class.js');
const hooks = require('./ldap.hooks');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/user', createService());

  // Get our initialized service so that we can register hooks
  const service = app.service('user');

  service.hooks(hooks);
};
