// Initializes the `tools` service on path `/tools`
const createService = require('feathers-mongodb');
const hooks = require('./tools.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/tools', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tools');

  mongoClient.then(db => {
    service.Model = db.collection('Tool');
  });

  service.hooks(hooks);
};
