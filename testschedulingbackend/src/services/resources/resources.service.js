// Initializes the `resources` service on path `/resources`
const createService = require('feathers-mongodb');
const hooks = require('./resources.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/resources', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('resources');

  mongoClient.then(db => {
    service.Model = db.collection('Resource');
  });

  service.hooks(hooks);
};
