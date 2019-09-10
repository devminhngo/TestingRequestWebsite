// Initializes the `test-locations` service on path `/test-locations`
const createService = require('feathers-mongodb');
const hooks = require('./test-locations.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/test-locations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('test-locations');

  mongoClient.then(db => {
    service.Model = db.collection('TestLocation');
  });

  service.hooks(hooks);
};
