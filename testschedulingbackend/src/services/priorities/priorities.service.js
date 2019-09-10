// Initializes the `priorities` service on path `/priorities`
const createService = require('feathers-mongodb');
const hooks = require('./priorities.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/priorities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('priorities');

  mongoClient.then(db => {
    service.Model = db.collection('Priority');
  });

  service.hooks(hooks);
};
